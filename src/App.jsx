import { useState, useEffect, useRef, useCallback } from "react";
import { auth, loginWithGoogle, logout, saveUserData, loadUserData, onAuth } from "./firebase";

// ============================================================================
// 0. localStorage Helpers
// ============================================================================
const LS_STATS = "shadow_stats";
const LS_CTX = "shadow_ctx";
const LS_HISTORY = "shadow_history";
const LS_LAST_PLAN = "shadow_last_plan";

function loadLS(key, fallback) {
 try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveLS(key, val) {
 try { localStorage.setItem(key, JSON.stringify(val)); } catch { }
}

// คำนวณแคลอรี่โดยประมาณ (MET x weight x time)
function estimateCalories(exercise, totalReps, totalSec, weightKg) {
 const met = { pushup: 3.8, squat: 5.0, plank: 3.0, lunge: 4.0, situp: 3.5, jumpingjack: 7.0 };
 const m = met[exercise] || 4.0;
 return Math.round(m * weightKg * (totalSec / 3600));
}

// บันทึกประวัติการออกกำลังลง localStorage
function saveWorkoutSession(session) {
 const history = loadLS(LS_HISTORY, []);
 history.unshift({ ...session, id: Date.now() });
 if (history.length > 50) history.length = 50; // เก็บไว้ 50 sessions
 saveLS(LS_HISTORY, history);
}

// ============================================================================
// 0.5 Sound System (Web Audio API)
// ============================================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let _audioCtx = null;
let _soundEnabled = true;
function getAudioCtx() { if (!_audioCtx) _audioCtx = new AudioCtx(); return _audioCtx; }
function playBeep(freq = 880, duration = 0.1, type = "sine", vol = 0.3) {
 if (!_soundEnabled) return;
 try {
 const ctx = getAudioCtx();
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.type = type;
 osc.frequency.setValueAtTime(freq, ctx.currentTime);
 gain.gain.setValueAtTime(vol, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
 osc.connect(gain); gain.connect(ctx.destination);
 osc.start(ctx.currentTime); osc.stop(ctx.currentTime + duration);
 } catch (_) { }
}
const Sound = {
 rep: () => playBeep(880, 0.12, "sine", 0.35),
 error: () => { playBeep(220, 0.15, "square", 0.2); setTimeout(() => playBeep(180, 0.15, "square", 0.2), 160); },
 tick: () => playBeep(660, 0.06, "sine", 0.15),
 complete: () => { playBeep(523, 0.15, "sine", 0.3); setTimeout(() => playBeep(659, 0.15, "sine", 0.3), 150); setTimeout(() => playBeep(784, 0.2, "sine", 0.3), 300); setTimeout(() => playBeep(1047, 0.3, "sine", 0.35), 450); },
};

// ============================================================================
// 1. ระบบคณิตศาสตร์และตัวช่วย AI (Math & AI Helpers)
// ============================================================================

// คำนวณมุม(องศา) ระหว่างรอยต่อ 3 จุด (เช่น ไหล่-ศอก-ข้อมือ)
function calcAngle(a, b, c) {
 const ba = [a[0] - b[0], a[1] - b[1]];
 const bc = [c[0] - b[0], c[1] - b[1]];
 const dot = ba[0] * bc[0] + ba[1] * bc[1];
 const mag = Math.sqrt(ba[0] ** 2 + ba[1] ** 2) * Math.sqrt(bc[0] ** 2 + bc[1] ** 2);
 return (Math.acos(Math.max(-1, Math.min(1, dot / (mag + 1e-9)))) * 180) / Math.PI;
}
const LM = {
 L_SHOULDER: 11, R_SHOULDER: 12, L_ELBOW: 13, R_ELBOW: 14,
 L_WRIST: 15, R_WRIST: 16, L_HIP: 23, R_HIP: 24, L_KNEE: 25, R_KNEE: 26, L_ANKLE: 27, R_ANKLE: 28,
};
function lm(landmarks, idx) { return [landmarks[idx].x, landmarks[idx].y]; }

// ============================================================================
// 1.5 ตาราง Fatigue Levels (ใช้ร่วมกันทั้ง UI และ API)
// ============================================================================
const FATIGUE_LEVELS = [
 { level: 1, label: "พลังเต็ม", sets: 3, reps: 12, color: "#00ff88" },
 { level: 2, label: "สดใส", sets: 3, reps: 10, color: "#00ff88" },
 { level: 3, label: "พร้อม", sets: 3, reps: 8, color: "#66ff99" },
 { level: 4, label: "ปกติ", sets: 2, reps: 10, color: "#ffd700" },
 { level: 5, label: "เริ่มเหนื่อย", sets: 2, reps: 8, color: "#ffd700" },
 { level: 6, label: "เหนื่อย", sets: 2, reps: 6, color: "#ff9800" },
 { level: 7, label: "เหนื่อยมาก", sets: 1, reps: 10, color: "#ff6633" },
 { level: 8, label: "หมดแรง", sets: 1, reps: 8, color: "#ff4444" },
 { level: 9, label: "หมดสภาพ", sets: 1, reps: 6, color: "#ff3366" },
];

// ฟังก์ชันเรียกขอแผนออกกำลังกายจาก Gemini ผ่าน Backend (server.js / Vercel API Route)
async function fetchAIPlan(stats, ctx) {
 console.log("Fetching AI plan from Backend...");

 // หาค่า sets/reps ตามระดับความเหนื่อยล้าที่ user เลือก
 const fatigueLevel = FATIGUE_LEVELS.find(f => f.level === ctx.fatigue) || FATIGUE_LEVELS[4];
 const targetSets = fatigueLevel.sets;
 const targetReps = fatigueLevel.reps;

 const res = await fetch('/api/generate-plan', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ stats, ctx, targetSets, targetReps })
 });

 if (!res.ok) {
 const errorData = await res.json().catch(() => ({}));
 console.error("Backend/Gemini Error:", res.status, errorData);
 throw new Error(errorData.message || `Backend Error (${res.status})`);
 }

 const plan = await res.json();

 // ใส่ค่า default ถ้า Gemini ตอบไม่ครบ (ใช้ค่าจาก fatigue level)
 if (!plan.pushup) plan.pushup = { sets: targetSets, reps: targetReps, rest_sec: 45 };
 if (!plan.squat) plan.squat = { sets: targetSets, reps: targetReps, rest_sec: 45 };
 if (!plan.plank) plan.plank = { sets: targetSets, hold_sec: 30, rest_sec: 30 };
 if (!plan.lunge) plan.lunge = { sets: targetSets, reps: targetReps, rest_sec: 45 };
 if (!plan.situp) plan.situp = { sets: targetSets, reps: targetReps, rest_sec: 45 };
 if (!plan.jumpingjack) plan.jumpingjack = { sets: targetSets, reps: targetReps, rest_sec: 30 };
 if (!plan.mode) plan.mode = "moderate";
 if (!plan.estimated_duration_min) plan.estimated_duration_min = 10;
 return plan;
}

// ============================================================================
// 2. คอมโพเนนต์ตกแต่ง UI (UI Components)
// ============================================================================

// เอฟเฟกต์ตกแต่งสไตล์ Cyberpunk (เส้นสแกนจอ)
function Scanline() {
 return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,136,0.012) 2px,rgba(0,255,136,0.012) 4px)" }} />;
}

// [หน้า Login] หน้าจอล็อกอินเต็มหน้าจอ — ต้องล็อกอินก่อนใช้งาน
// [หน้า Login] Hero Landing Page — อ้างอิง FitGenius AI
function PageLogin({ onLogin, loading }) {
 return (
 <div style={{ minHeight: "100vh", background: "#0a0a12", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
 {/* Background glow */}
 <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.08), transparent 70%)", pointerEvents: "none" }} />
 <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,255,0.06), transparent 70%)", pointerEvents: "none" }} />

 {/* Badge */}
 <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50px", padding: "8px 16px", marginBottom: "32px", zIndex: 1 }}>
 <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff8888" }} />
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff88" }}>AI Personal Trainer V2.0</span>
 </div>

 {/* Hero Text */}
 <div style={{ textAlign: "center", zIndex: 1, maxWidth: "560px", marginBottom: "40px" }}>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(32px,7vw,56px)", fontWeight: 700, lineHeight: 1.1, margin: 0, color: "#ffffff" }}>
 ปั้นหุ่นในฝันด้วย<br />
 <span style={{ background: "linear-gradient(135deg, #00ff88, #00bfff, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>เทรนเนอร์ AI ส่วนตัว</span>
 </h1>
 <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", color: "#ffffff55", marginTop: "20px", lineHeight: 1.8 }}>
 AI วิเคราะห์ร่างกาย ตรวจท่า real-time และสร้างแผนที่ปรับเปลี่ยนตามคุณ
 </p>
 </div>

 {/* Login Button */}
 <button
 onClick={onLogin}
 disabled={loading}
 style={{
 padding: "16px 40px", background: "#00ff88", border: "none", borderRadius: "50px",
 cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "12px",
 fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: 700, color: "#0a0a12",
 transition: "all 0.3s", boxShadow: "0 0 30px rgba(0,255,136,0.3)", opacity: loading ? 0.6 : 1,
 minHeight: "56px", zIndex: 1, letterSpacing: "0.5px",
 }}
 onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,136,0.5)'; } }}
 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.3)'; }}
 >
 <svg width="20" height="20" viewBox="0 0 24 24">
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
 </svg>
 {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วย Google"}
 </button>

 {/* Feature Cards */}
 <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", maxWidth: "560px", width: "100%", marginTop: "48px", zIndex: 1 }}>
 {[
 { icon: "", title: "แผนฝึกอัจฉริยะ", desc: "AI ปรับตามร่างกายคุณ" },
 { icon: "", title: "ตรวจท่า Real-time", desc: "แจ้งเตือนทันทีทำผิด" },
 { icon: "", title: "Cloud Sync", desc: "ข้อมูลปลอดภัยทุกอุปกรณ์" },
 ].map(f => (
 <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px 16px", textAlign: "center", transition: "all 0.3s" }}
 onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
 >
 <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>{f.title}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", lineHeight: 1.5 }}>{f.desc}</div>
 </div>
 ))}
 </div>

 {/* Footer */}
 <div style={{ marginTop: "48px", fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff15", letterSpacing: "2px", zIndex: 1 }}>THE ADAPTABLE SHADOW — POWERED BY AI + MEDIAPIPE</div>
 </div>
 );
}

function GlowButton({ children, onClick, variant = "primary", disabled, style }) {
 const colors = {
 primary: { bg: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#060810", shadow: "0 0 30px #00ff8888, 0 0 60px #00ff8833" },
 ghost: { bg: "transparent", color: "#00ff88", shadow: "0 0 15px #00ff8844", border: "2px solid #00ff8866" },
 danger: { bg: "linear-gradient(135deg, #ff3366, #cc2255)", color: "#fff", shadow: "0 0 30px #ff336688, 0 0 60px #ff336633" },
 };
 const c = colors[variant];
 return (
 <>
 <style>{`@keyframes btnPulse{0%,100%{box-shadow:${c.shadow}}50%{box-shadow:${c.shadow.replace(/\d+px/g, m => (parseInt(m) * 1.5) + 'px')}}}`}</style>
 <button onClick={onClick} disabled={disabled} style={{ padding: "16px 36px", fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", border: c.border || "none", borderRadius: "8px", background: c.bg, color: c.color, boxShadow: c.shadow, opacity: disabled ? 0.4 : 1, transition: "all 0.25s", animation: disabled ? "none" : "btnPulse 2s ease-in-out infinite", ...style }}
 onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; } }}
 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
 >
 {children}
 </button>
 </>
 );
}

function StatInput({ label, value, onChange, min, max, step = 1, unit }) {
 return (
 <div style={{ marginBottom: "20px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
 <input
 type="number"
 min={min} max={max} step={step}
 value={value}
 onChange={e => {
 const v = Number(e.target.value);
 if (!isNaN(v)) onChange(v);
 }}
 onBlur={e => {
 let v = Number(e.target.value);
 if (v < min) v = min;
 if (v > max) v = max;
 onChange(v);
 }}
 style={{ flex: 1, background: "#060810", border: "1px solid #00ff8833", borderRadius: "4px", padding: "12px 14px", color: "#00ff88", fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, outline: "none", boxSizing: "border-box", textAlign: "center", appearance: "textfield", MozAppearance: "textfield", WebkitAppearance: "none" }}
 />
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", color: "#ffffff66", minWidth: "30px" }}>{unit}</span>
 </div>
 <style>{`input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}`}</style>
 </div>
 );
}

function ModeChip({ mode }) {
 const cfg = { micro: { color: "#ff9800", bg: "#ff980022", label: "MICRO" }, moderate: { color: "#00bfff", bg: "#00bfff22", label: "MODERATE" }, full: { color: "#00ff88", bg: "#00ff8822", label: "FULL POWER" } };
 const c = cfg[mode] || cfg.moderate;
 return <span style={{ padding: "4px 12px", borderRadius: "2px", border: `1px solid ${c.color}`, background: c.bg, color: c.color, fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", fontWeight: 700 }}>{c.label}</span>;
}

// ============================================================================
// 3. หน้าจอการทำงานต่างๆ (Pages)
// ============================================================================

// [หน้า 1] รับข้อมูลร่างกายเบื้องต้นเพื่อส่งให้ AI ประเมิน
function PageProfile({ stats, setStats, onNext, onQuickStart, hasLastPlan }) {
 const estimateBodyFat = () => {
 const bmi = stats.weight / (stats.height / 100) ** 2;
 const estimated = Math.round((1.2 * bmi + 0.23 * 25 - 5.4) * 10) / 10;
 setStats(s => ({ ...s, bodyFat: Math.max(5, Math.min(50, estimated)) }));
 };

 return (
 <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>
 <div style={{ marginBottom: "32px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "4px", color: "#00ff8855", marginBottom: "10px" }}>ขั้นตอน 1/2</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>ข้อมูล<span style={{ color: "#00ff88" }}>ของคุณ</span></h1>
 <p style={{ color: "#ffffff44", fontFamily: "'Space Mono',monospace", fontSize: "11px", marginTop: "12px", lineHeight: 1.8 }}>AI จะใช้ข้อมูลนี้ออกแบบโปรแกรมเฉพาะตัว</p>
 </div>

 {/* ชื่อเล่น */}
 <div style={{ marginBottom: "16px", background: "#12141d", border: "1px solid #ffffff11", borderRadius: "12px", padding: "20px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: "#00ff8877", textTransform: "uppercase", marginBottom: "10px" }}> ชื่อเล่น</div>
 <input
 value={stats.nickname || ""}
 onChange={e => setStats(s => ({ ...s, nickname: e.target.value }))}
 placeholder="เช่น: เบสท์, พี่มาร์ค, เบนซ์"
 style={{ width: "100%", background: "#0d0f18", border: "1px solid #ffffff15", borderRadius: "8px", padding: "12px 14px", color: "#00ff88", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: 700, outline: "none", boxSizing: "border-box" }}
 />
 </div>

 {/* Body Stats */}
 <div style={{ background: "#12141d", border: "1px solid #ffffff11", borderRadius: "12px", padding: "24px" }}>
 <StatInput label="น้ำหนัก" value={stats.weight} onChange={v => setStats(s => ({ ...s, weight: v }))} min={40} max={150} step={0.5} unit="kg" />
 <StatInput label="ส่วนสูง" value={stats.height} onChange={v => setStats(s => ({ ...s, height: v }))} min={140} max={220} unit="cm" />
 <StatInput label="ไขมันในร่างกาย" value={stats.bodyFat} onChange={v => setStats(s => ({ ...s, bodyFat: v }))} min={5} max={50} step={0.5} unit="%" />
 <button
 onClick={estimateBodyFat}
 style={{ width: "100%", marginTop: "8px", padding: "12px 16px", background: "#ffd70011", border: "1px solid #ffd70033", borderRadius: "8px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, color: "#ffd700", transition: "all 0.2s", minHeight: "48px" }}
 onMouseEnter={e => { e.currentTarget.style.background = '#ffd70022'; }}
 onMouseLeave={e => { e.currentTarget.style.background = '#ffd70011'; }}
 >
 ประมาณค่าไขมันให้
 </button>
 {/* BMI Summary */}
 <div style={{ marginTop: "16px", padding: "14px", background: "#0d0f18", borderRadius: "8px", border: "1px solid #ffffff08" }}>
 <div style={{ display: "flex", justifyContent: "space-around" }}>
 {[["BMI", (stats.weight / (stats.height / 100) ** 2).toFixed(1)], ["ไขมัน", (stats.weight * stats.bodyFat / 100).toFixed(1) + "kg"], ["กล้าม", (stats.weight * (1 - stats.bodyFat / 100)).toFixed(1) + "kg"]].map(([k, v]) => (
 <div key={k} style={{ textAlign: "center" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, color: "#ffd700" }}>{v}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff33", letterSpacing: "1px", marginTop: "4px" }}>{k}</div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* เป้าหมายวันนี้ */}
 <div style={{ marginTop: "16px", background: "#12141d", border: "1px solid #ffffff11", borderRadius: "12px", padding: "20px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: "#ffd70088", marginBottom: "10px" }}> เป้าหมายวันนี้</div>
 <textarea
 value={stats.goal || ""}
 onChange={e => setStats(s => ({ ...s, goal: e.target.value }))}
 rows={2}
 placeholder="เช่น: อยากลดพุง, เสริมแขน, ฝึกความอดทน"
 style={{ width: "100%", background: "#0d0f18", border: "1px solid #ffffff15", borderRadius: "8px", padding: "12px 14px", color: "#ffd700", fontFamily: "'Space Mono',monospace", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.7 }}
 />
 </div>

 <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "28px" }}>
 <GlowButton onClick={onNext} style={{ width: "100%", minHeight: "52px" }}>วิเคราะห์ร่างกาย →</GlowButton>
 {hasLastPlan && (
 <GlowButton variant="ghost" onClick={onQuickStart} style={{ width: "100%", borderColor: "#ffd70044", color: "#ffd700", minHeight: "52px" }}> เริ่มออกกำลังเลย (แผนเดิม)</GlowButton>
 )}
 </div>
 </div>
 );
}

// [หน้า 2] สอบถามบริบทย่อยของวันนี้ (ตารางงาน ความเหนื่อยล้า สถานที่)
function PageContext({ ctx, setCtx, onBack, onAnalyze, loading, error }) {
 const fatigueLevels = FATIGUE_LEVELS;
 const current = fatigueLevels.find(f => f.level === ctx.fatigue) || fatigueLevels[4];
 return (
 <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>
 <div style={{ marginBottom: "28px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "4px", color: "#00ff8855", marginBottom: "10px" }}>ขั้นตอน 2/2</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>วันนี้<span style={{ color: "#00ff88" }}>เป็นยังไง?</span></h1>
 </div>
 <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
 {/* ความเหนื่อยล้า — Slider */}
 <div style={{ background: "#12141d", border: "1px solid #ffffff11", borderRadius: "12px", padding: "24px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: "#00ff8877", textTransform: "uppercase", marginBottom: "16px" }}> ระดับพลังงานวันนี้</div>
 {/* Live display */}
 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", padding: "16px", background: `${current.color}08`, border: `1px solid ${current.color}22`, borderRadius: "10px" }}>
 <div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "20px", fontWeight: 700, color: current.color }}>{current.label}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", marginTop: "4px" }}>ระดับ {current.level}/9</div>
 </div>
 <div style={{ textAlign: "right" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "28px", fontWeight: 700, color: current.color }}>{current.sets}×{current.reps}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff33", marginTop: "2px" }}>SET × REP</div>
 </div>
 </div>
 {/* Slider */}
 <input
 type="range" min="1" max="9" step="1" value={ctx.fatigue}
 onChange={e => setCtx(c => ({ ...c, fatigue: Number(e.target.value) }))}
 style={{ width: "100%", height: "8px", borderRadius: "4px", background: `linear-gradient(to right, #00ff88, #ffd700, #ff4444)`, cursor: "pointer", outline: "none", WebkitAppearance: "none", appearance: "none" }}
 />
 <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#00ff8877" }}>พลังเต็ม</span>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ff444477" }}>หมดสภาพ</span>
 </div>
 </div>
 {/* Context inputs */}
 {[{ key: "calendar", label: " ตารางงาน", placeholder: "เช่น: ประชุม 3 ชม., ว่าง..." },
 { key: "location", label: " สถานที่", placeholder: "เช่น: บ้าน, ออฟฟิศ, ยิม..." },
 { key: "weather", label: " อากาศ", placeholder: "เช่น: ร้อน, ฝนตก, แดดจ้า..." }
 ].map(({ key, label, placeholder }) => (
 <div key={key} style={{ background: "#12141d", border: "1px solid #ffffff11", borderRadius: "12px", padding: "18px 20px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: "#00ff8877", marginBottom: "10px" }}>{label}</div>
 <input value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} placeholder={placeholder}
 style={{ width: "100%", background: "#0d0f18", border: "1px solid #ffffff15", borderRadius: "8px", padding: "12px 14px", color: "#ffffff", fontFamily: "'Space Mono',monospace", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
 </div>
 ))}
 </div>
 {error && <div style={{ marginTop: "16px", padding: "12px", background: "#ff336615", border: "1px solid #ff336644", borderRadius: "8px", color: "#ff6688", fontFamily: "'Space Mono',monospace", fontSize: "12px" }}>{error}</div>}
 <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px", gap: "12px" }}>
 <button onClick={onBack} style={{ padding: "14px 24px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffff55", transition: "all 0.2s", minHeight: "52px" }}>← กลับ</button>
 <button onClick={onAnalyze} disabled={loading}
 style={{ flex: 1, padding: "14px 24px", background: "#00ff88", border: "none", borderRadius: "50px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: 700, color: "#0a0a12", transition: "all 0.3s", boxShadow: "0 0 30px rgba(0,255,136,0.3)", opacity: loading ? 0.6 : 1, minHeight: "52px" }}
 >{loading ? "กำลังวิเคราะห์..." : "สร้างแผน AI "}</button>
 </div>
 </div>
 );
}

// [หน้าคั่น] หน้าต่างโหลดระหว่ารอ AI กำลังจัดตาราง
function PagePlanning() {
 const [dots, setDots] = useState(0);
 useEffect(() => { const t = setInterval(() => setDots(d => (d + 1) % 4), 400); return () => clearInterval(t); }, []);
 return (
 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", textAlign: "center", padding: "40px" }}>
 <div style={{ width: "60px", height: "60px", border: "3px solid rgba(255,255,255,0.06)", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "40px" }} />
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "4px", color: "#ffffff33" }}>AI กำลังวิเคราะห์</div>
 <h2 style={{ fontFamily: "'Space Mono',monospace", color: "#ffffff", fontSize: "24px", margin: "16px 0" }}>กำลังคิด{".".repeat(dots)}</h2>
 <p style={{ color: "#ffffff44", fontFamily: "'Space Mono',monospace", fontSize: "12px", maxWidth: "300px", lineHeight: 1.8 }}>กำลังวิเคราะห์ข้อมูลร่างกายและบริบทชีวิตของคุณ</p>
 </div>
 );
}

// [หน้า 3] Plan — สไตล์ FitGenius workout cards
function PagePlan({ plan, onStart, onStartGuided, onBack, onHistory, onDashboard }) {
 const modeColors = { micro: "#ff9800", moderate: "#00bfff", full: "#00ff88" };
 const color = modeColors[plan.mode] || "#00ff88";

 const getCalendarUrl = () => {
 const title = encodeURIComponent(`The Adaptable Shadow: ${plan.mode.toUpperCase()} WORKOUT`);
 const details = encodeURIComponent(`ตารางวันนี้:\n${plan.message}\nPush-up: ${plan.pushup.sets}x${plan.pushup.reps}\nSquat: ${plan.squat.sets}x${plan.squat.reps}`);
 const now = new Date();
 const startObj = new Date(now.getTime() + 10 * 60000);
 const endObj = new Date(startObj.getTime() + (plan.estimated_duration_min * 60000));
 const start = startObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
 const end = endObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
 return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
 };

 const exercises = [
 { key: "pushup", label: "Push-up", img: "/exercises/pushup.png", stat: `${plan.pushup.sets}×${plan.pushup.reps}`, sub: `พัก ${plan.pushup.rest_sec}วิ`, accent: "#00ff88" },
 { key: "squat", label: "Squat", img: "/exercises/squat.png", stat: `${plan.squat.sets}×${plan.squat.reps}`, sub: `พัก ${plan.squat.rest_sec}วิ`, accent: "#00bfff" },
 { key: "plank", label: "Plank", img: "/exercises/plank.png", stat: `${plan.plank.sets}×${plan.plank.hold_sec}s`, sub: `พัก ${plan.plank.rest_sec}วิ`, accent: "#ffd700" },
 { key: "lunge", label: "Lunge", img: "/exercises/lunge.png", stat: `${plan.lunge.sets}×${plan.lunge.reps}`, sub: `พัก ${plan.lunge.rest_sec}วิ`, accent: "#ff6633" },
 { key: "situp", label: "Sit-up", img: "/exercises/situp.png", stat: `${plan.situp.sets}×${plan.situp.reps}`, sub: `พัก ${plan.situp.rest_sec}วิ`, accent: "#a855f7" },
 { key: "jumpingjack", label: "Jumping Jack", img: "/exercises/jumpingjack.png", stat: `${plan.jumpingjack.sets}×${plan.jumpingjack.reps}`, sub: `พัก ${plan.jumpingjack.rest_sec}วิ`, accent: "#ff3366" },
 ];

 return (
 <div style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 20px" }}>
 <div style={{ marginBottom: "28px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
 <ModeChip mode={plan.mode} />
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44" }}>{plan.estimated_duration_min} นาที</span>
 </div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>แผนของคุณ <span style={{ background: "linear-gradient(135deg, #00ff88, #00bfff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>พร้อมแล้ว!</span></h1>
 </div>

 {/* AI Message Card */}
 <div style={{ background: "#111318", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "20px", marginBottom: "24px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
 <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}></div>
 <div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>AI Coach</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: color }}>สร้างเมื่อสักครู่</div>
 </div>
 </div>
 <p style={{ color: "#ffffffcc", fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 1.8, margin: 0 }}>{plan.message}</p>
 <p style={{ color: color, fontFamily: "'Space Mono',monospace", fontSize: "12px", margin: "10px 0 0", fontStyle: "italic" }}> {plan.motivation}</p>
 </div>

 {/* Workout Cards */}
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff44", letterSpacing: "2px", marginBottom: "12px" }}>แผนประจำวัน</div>
 <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
 {exercises.map(({ key, label, img, stat, sub, accent }) => (
 <button key={key} onClick={() => onStart(key)}
 style={{ background: "#111318", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s", textAlign: "left" }}
 onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.transform = 'translateX(4px)'; }}
 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)'; }}
 >
 <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
 <img src={img} alt={label} style={{ width: "44px", height: "44px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
 <div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>{label}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff44", marginTop: "2px" }}>{sub}</div>
 </div>
 </div>
 <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "16px", fontWeight: 700, color: accent }}>{stat}</div>
 <div style={{ color: "#ffffff33", fontSize: "16px" }}>›</div>
 </div>
 </button>
 ))}
 </div>

 {/* Form Tip */}
 <div style={{ background: "#111318", border: "1px solid #ffd70022", borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
 <span style={{ fontSize: "16px" }}></span>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffd700cc" }}>{plan.form_tip}</span>
 </div>

 {/* CTA */}
 <button onClick={onStartGuided}
 style={{ width: "100%", padding: "18px", background: "#00ff88", border: "none", borderRadius: "50px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: 700, color: "#0a0a12", transition: "all 0.3s", boxShadow: "0 0 30px rgba(0,255,136,0.3)", minHeight: "56px", marginBottom: "16px" }}
 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,255,136,0.5)'; }}
 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.3)'; }}
 > เริ่มออกกำลังกายอัตโนมัติ (ทำทุกท่า)</button>

 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
 {[
 { label: " Calendar", onClick: () => window.open(getCalendarUrl(), '_blank'), accent: "#00ff88" },
 { label: " History", onClick: onHistory, accent: "#00bfff" },
 { label: " Stats", onClick: onDashboard, accent: "#a855f7" },
 ].map(b => (
 <button key={b.label} onClick={b.onClick}
 style={{ padding: "12px", background: "#111318", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "10px", fontWeight: 700, color: b.accent, transition: "all 0.2s" }}
 onMouseEnter={e => e.currentTarget.style.borderColor = `${b.accent}44`}
 onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
 >{b.label}</button>
 ))}
 </div>

 <button onClick={onBack} style={{ width: "100%", padding: "14px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffff44", transition: "all 0.2s" }}>← วางแผนใหม่</button>
 </div>
 );
}


// [หน้า 4] หน้าแสดงภาพตัวอย่างท่าที่ถูกต้องให้ผู้ใช้ดูก่อน
function PageVideoTutorial({ exercise, onNext, onBack }) {
  const exerciseImages = {
    pushup: "/exercises/pushup.png",
    squat: "/exercises/squat.png",
    plank: "/exercises/plank.png",
    lunge: "/exercises/lunge.png",
    situp: "/exercises/situp.png",
    jumpingjack: "/exercises/jumpingjack.png",
  };
  const tips = {
    pushup: ["หลังและลำตัวต้องตรงเป็นแผ่นกระดาน", "ลงให้ลึกจนข้อศอกทำมุม 90 องศา", "มือต้องวางบนพื้น ไม่ใช่ยืนกางแขน", "ตาควรมองตรงไปข้างหน้าเล็กน้อย"],
    squat: ["ทิ้งน้ำหนักลงที่ส้นเท้า", "ย่อลงจนสะโพกใกล้ระดับเข่า", "ห้ามให้เข่าหุบเข้าหากัน", "ลำตัวตั้งตรง ห้ามเอนไปข้างหน้า"],
    plank: ["ลำตัวตรงเส้นเดียวตั้งแต่หัวถึงส้นเท้า", "ยกตัวขึ้นจากพื้น ห้ามนอนราบ", "ข้อศอกอยู่ใต้ไหล่พอดี", "หายใจตามปกติ อย่ากลั้นหายใจ"],
    lunge: ["ก้าวขาไปข้างหน้า 1 ก้าวยาว", "สะโพกลงใกล้ระดับเข่า", "เข่าหน้าทำมุม 90° เข่าหลังเกือบถึงพื้น", "ลำตัวตั้งตรง ไม่เอนไปข้างหน้า"],
    situp: ["นอนหงาย งอเข่าให้มากพอ", "ใช้กล้ามเนื้อหน้าท้องยกตัวขึ้น ห้ามดึงคอ", "ข้อศอกไม่ยื่นหน้าหัว", "หายใจออกตอนขึ้น"],
    jumpingjack: ["กระโดดกางทั้งแขนและขาพร้อมกัน", "ขาต้องกางออก ไม่ใช่แค่ยกแขน", "แขน 2 ข้างกางออกเท่าๆ กัน", "รักษาจังหวะสม่ำเสมอ"],
  };
  const cameraPos = {
    pushup: { pos: "ด้านข้าง", detail: "วางกล้องด้านข้างลำตัว เห็นทั้งหัว-เท้า" },
    squat: { pos: "เฉียง 45°", detail: "วางกล้องเฉียง 45° ด้านหน้า" },
    plank: { pos: "ด้านข้าง", detail: "วางกล้องด้านข้าง ให้เห็นว่ายกตัวขึ้น" },
    lunge: { pos: "เฉียง 45°", detail: "วางกล้องเฉียงด้านหน้า" },
    situp: { pos: "ด้านข้าง", detail: "วางกล้องด้านข้าง เห็นลำตัวขึ้น-ลง" },
    jumpingjack: { pos: "ด้านหน้า", detail: "วางกล้องตรงด้านหน้า ให้เห็นขากาง" },
  };
  const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };
  const accentColors = { pushup: "#00ff88", squat: "#00bfff", plank: "#ffd700", lunge: "#ff6633", situp: "#a855f7", jumpingjack: "#ff3366" };
  const cam = cameraPos[exercise] || cameraPos.pushup;
  const accent = accentColors[exercise] || "#00ff88";

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "4px", color: `${accent}88`, marginBottom: "8px" }}>FORM CHECK</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>{names[exercise] || exercise.toUpperCase()}</h1>
      </div>

      {/* Exercise Image */}
      <div style={{ background: "#111318", border: `1px solid ${accent}22`, borderRadius: "20px", overflow: "hidden", marginBottom: "20px" }}>
        <img
          src={exerciseImages[exercise] || exerciseImages.pushup}
          alt={`${names[exercise]} demonstration`}
          style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: "20px" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: accent, letterSpacing: "2px", marginBottom: "14px" }}>วิธีทำท่าที่ถูกต้อง</div>
          <ul style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffffbb", lineHeight: 2, paddingLeft: "18px", margin: 0 }}>
            {(tips[exercise] || []).map((t, i) => <li key={i} style={{ marginBottom: "4px" }}>{t}</li>)}
          </ul>
        </div>
      </div>

      {/* Camera Setup */}
      <div style={{ background: "#111318", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "18px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: "#ffd70088", marginBottom: "12px" }}>CAMERA SETUP</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "15px", fontWeight: 700, color: "#ffd700", marginBottom: "6px" }}>{cam.pos}</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff66" }}>{cam.detail}</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
          {["ห่าง 1.5-2 เมตร", "ระดับเอว", "เห็นทั้งตัว"].map(t => (
            <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", padding: "4px 10px", background: "#ffd70008", border: "1px solid #ffd70022", borderRadius: "20px", color: "#ffd70088" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <button onClick={onNext}
        style={{ width: "100%", padding: "18px", background: accent, border: "none", borderRadius: "50px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: 700, color: "#0a0a12", transition: "all 0.3s", boxShadow: `0 0 30px ${accent}44`, minHeight: "56px", marginBottom: "12px" }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >พร้อมออกกำลังกาย</button>
      <button onClick={onBack} style={{ width: "100%", padding: "14px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffff44", transition: "all 0.2s" }}>← กลับ</button>
    </div>
  );
}


// [หน้า Camera Guide] หน้าแนะนำการตั้งกล้องให้ user ก่อนเริ่มออกกำลัง
function PageCameraGuide({ exercise, onNext, onBack }) {
  const guides = {
    pushup: {
      position: "ด้านข้าง (Side View)",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (40-60 cm)",
      reason: "AI ต้องเห็นลำตัว-แขน-ขาจากด้านข้าง เพื่อตรวจมุมข้อศอกและความตรงของหลัง",
      checkpoints: ["เห็นหัวจรดเท้า", "เห็นข้อศอกงอชัดเจน", "เห็นลำตัวตรงหรือค่อม"],
      wrongWays: [" ด้านหน้า: จะเห็นแขนซ้อนกัน วัดมุมไม่ได้", " ใกล้เกินไป: ไม่เห็นเท้า"],
    },
    squat: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "",
      diagram: " ↙ ",
      distance: "1.5 - 2.5 เมตร",
      height: "ระดับเอว (50-70 cm)",
      reason: "AI ต้องเห็นการย่อตัวและมุมเข่า มองเฉียงจะเห็นทั้งหัวเข่าและลำตัว",
      checkpoints: ["เห็นเข่างอ-ไม่งอ", "เห็นหลังตรงหรือเอน", "เห็นสะโพกลงต่ำกว่าเข่า"],
      wrongWays: [" ด้านหลัง: ไม่เห็นความลึกของสะโพก", " ไกลเกิน: ย่อตัวแล้วหลุดกรอบ"],
    },
    plank: {
      position: "ด้านข้าง (Side View)",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (30-50 cm)",
      reason: "AI ต้องเห็นว่าลำตัวตรงหรือย้อย จึงต้องเห็นจากด้านข้าง",
      checkpoints: ["เห็นหัว-ไหล่-สะโพก-เท้า", "เห็นว่ายกตัวขึ้นจากพื้น", "เห็นลำตัวตรงหรือย้อย"],
      wrongWays: [" ด้านหน้า: ไม่เห็นว่าหลังย้อยหรือไม่", " มุมสูง: ไม่เห็นลำตัวเต็มตัว ตัดหัวหรือเท้าออก"],
    },
    lunge: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "",
      diagram: " ↙ ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (50-70 cm)",
      reason: "AI ต้องเห็นการก้าวขาและมุมเข่าทั้ง 2 ข้างชัดเจน",
      checkpoints: ["เห็นเข่าหน้า-หลัง", "เห็นก้าวยาว-สั้นของก้าว", "เห็นลำตัวตั้งตรง"],
      wrongWays: [" ด้านหลัง: ไม่เห็นมุมเข่าหน้า", " ด้านข้างตรง: เห็นขาซ้อนกัน"],
    },
    situp: {
      position: "ด้านข้าง (Side View)",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (30-50 cm)",
      reason: "AI ต้องเห็นลำตัวยกขึ้น-ลง จึงต้องเห็นจากด้านข้าง",
      checkpoints: ["เห็นลำตัวยกขึ้น-นอนลง", "เห็นมือที่ศีรษะ", "เห็นเข่างอชัดเจน"],
      wrongWays: [" ด้านหน้า: จะเห็นแค่หัว ไม่เห็นลำตัว", " มุมสูง: ไม่เห็นลำตัวยกขึ้น"],
    },
    jumpingjack: {
      position: "ด้านหน้า (Front View)",
      icon: "",
      diagram: " ↓ ",
      distance: "2 - 2.5 เมตร",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (40-60 cm)",
      reason: "AI ต้องเห็นลำตัว-แขน-ขาจากด้านข้าง เพื่อตรวจมุมข้อศอกและความตรงของหลัง",
      checkpoints: ["เห็นหัวจรดเท้า", "เห็นข้อศอกงอชัดเจน", "เห็นลำตัวตรงหรือค่อม"],
      wrongWays: [" ด้านหน้า: จะเห็นแขนซ้อนกัน วัดมุมไม่ได้", " ใกล้เกินไป: ไม่เห็นเท้า"],
    },
    squat: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "",
      diagram: " ↙ ",
      distance: "1.5 - 2.5 เมตร",
      height: "ระดับเอว (50-70 cm)",
      reason: "AI ต้องเห็นการย่อตัวและมุมเข่า มองเฉียงจะเห็นทั้งหัวเข่าและลำตัว",
      checkpoints: ["เห็นเข่างอ-ไม่งอ", "เห็นหลังตรงหรือเอน", "เห็นสะโพกลงต่ำกว่าเข่า"],
      wrongWays: [" ด้านหลัง: ไม่เห็นความลึกของสะโพก", " ไกลเกิน: ย่อตัวแล้วหลุดกรอบ"],
    },
    plank: {
      position: "ด้านข้าง (Side View)",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (30-50 cm)",
      reason: "AI ต้องเห็นว่าลำตัวตรงหรือย้อย จึงต้องเห็นจากด้านข้าง",
      checkpoints: ["เห็นหัว-ไหล่-สะโพก-เท้า", "เห็นว่ายกตัวขึ้นจากพื้น", "เห็นลำตัวตรงหรือย้อย"],
      wrongWays: [" ด้านหน้า: ไม่เห็นว่าหลังย้อยหรือไม่", " มุมสูง: ไม่เห็นลำตัวเต็มตัว ตัดหัวหรือเท้าออก"],
    },
    lunge: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "",
      diagram: " ↙ ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (50-70 cm)",
      reason: "AI ต้องเห็นการก้าวขาและมุมเข่าทั้ง 2 ข้างชัดเจน",
      checkpoints: ["เห็นเข่าหน้า-หลัง", "เห็นก้าวยาว-สั้นของก้าว", "เห็นลำตัวตั้งตรง"],
      wrongWays: [" ด้านหลัง: ไม่เห็นมุมเข่าหน้า", " ด้านข้างตรง: เห็นขาซ้อนกัน"],
    },
    situp: {
      position: "ด้านข้าง (Side View)",
      icon: "",
      diagram: " ← ",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (30-50 cm)",
      reason: "AI ต้องเห็นลำตัวยกขึ้น-ลง จึงต้องเห็นจากด้านข้าง",
      checkpoints: ["เห็นลำตัวยกขึ้น-นอนลง", "เห็นมือที่ศีรษะ", "เห็นเข่างอชัดเจน"],
      wrongWays: [" ด้านหน้า: จะเห็นแค่หัว ไม่เห็นลำตัว", " มุมสูง: ไม่เห็นลำตัวยกขึ้น"],
    },
    jumpingjack: {
      position: "ด้านหน้า (Front View)",
      icon: "",
      diagram: " ↓ ",
      distance: "2 - 2.5 เมตร",
 const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };
 const g = guides[exercise] || guides.pushup;

 return (
 <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
 <div style={{ marginBottom: "32px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#ffd70066", marginBottom: "12px" }}>// CAMERA SETUP GUIDE</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>SET UP<br /><span style={{ color: "#ffd700" }}>YOUR CAMERA</span></h1>
 <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff55", marginTop: "12px", lineHeight: 1.8 }}>
 ตั้งกล้องให้ถูกตำแหน่ง AI จะตรวจจับท่าได้แม่นยำ 100%
 </p>
 </div>

 {/* Recommended Position */}
 <div style={{ background: "#0a0a1a", border: "1px solid #ffd70044", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
 <div style={{ background: "#0d0d1f", padding: "12px 16px", borderBottom: "1px solid #ffd70033", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffd700", letterSpacing: "2px" }}>
 ตำแหน่งที่แนะนำ — {names[exercise]}
 </div>
 <div style={{ padding: "24px", textAlign: "center" }}>
 <div style={{ fontSize: "48px", marginBottom: "16px", letterSpacing: "16px" }}>{g.diagram}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#ffd700", marginBottom: "8px" }}>{g.position}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff77", lineHeight: 1.8 }}>{g.reason}</div>
 </div>
 <div style={{ display: "flex", gap: "12px", padding: "0 24px 20px", justifyContent: "center" }}>
 {[["", g.distance], ["", g.height]].map(([icon, val]) => (
 <div key={val} style={{ background: "#ffd70011", border: "1px solid #ffd70033", borderRadius: "6px", padding: "10px 16px", textAlign: "center" }}>
 <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, color: "#ffd700" }}>{val}</div>
 </div>
 ))}
 </div>
 </div>

 {/* Checkpoints */}
 <div style={{ background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", marginBottom: "12px" }}> AI ต้องเห็นอะไรบ้าง</div>
 {g.checkpoints.map((c, i) => (
 <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
 <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88", flexShrink: 0 }} />
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffffbb" }}>{c}</span>
 </div>
 ))}
 </div>

 {/* Wrong positions */}
 <div style={{ background: "#1a0d0d", border: "1px solid #ff336633", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ff336699", marginBottom: "12px" }}> ตำแหน่งที่ไม่ควรใช้</div>
 {g.wrongWays.map((w, i) => (
 <div key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ff668899", marginBottom: "6px", lineHeight: 1.6 }}>{w}</div>
 ))}
 </div>

 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
 <GlowButton onClick={onNext} style={{ width: "100%" }}> ตั้งกล้องเรียบร้อย →</GlowButton>
 <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← กลับ</GlowButton>
 </div>
 </div>
 );
}


// [หน้า 4.5] หน้าสรุปผลหลังออกกำลัง พร้อมแคลอรี่ + บันทึกประวัติ
function PageSummary({ result, stats, onPlayAgain, onBack }) {
 const icons = { pushup: "", squat: "", plank: "", lunge: "" };
 const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE" };
 const mins = Math.floor(result.elapsed / 60), secs = result.elapsed % 60;
 const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
 const isHold = result.exercise === "plank";
 const statLabel = isHold ? `${result.totalReps}s HELD` : `${result.totalReps} REPS`;
 const calLabel = `${result.calories} KCAL`;

 const statCards = [
 { label: "EXERCISE", val: names[result.exercise] || result.exercise.toUpperCase() },
 { label: "SETS", val: `${result.sets}×${isHold ? result.exPlan.hold_sec + "s" : result.exPlan.reps}` },
 { label: isHold ? "HELD" : "REPS", val: statLabel },
 { label: "TIME", val: timeStr },
 { label: "CALORIES", val: calLabel },
 ];

 return (
 <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
 <div style={{ textAlign: "center", marginBottom: "40px" }}>
 <div style={{ fontSize: "72px", marginBottom: "16px" }}></div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>// SESSION COMPLETE</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(28px,5vw,40px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>MISSION<br /><span style={{ color: "#00ff88" }}>ACCOMPLISHED</span></h1>
 </div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
 {statCards.map(({ label, val }) => (
 <div key={label} style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "20px", fontWeight: 700, color: "#00ff88" }}>{val}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{label}</div>
 </div>
 ))}
 </div>
 {/* Calorie highlight bar */}
 <div style={{ background: "linear-gradient(135deg, #0d1a0d, #001a0a)", border: "1px solid #00ff8844", borderRadius: "8px", padding: "20px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
 <div style={{ fontSize: "36px" }}></div>
 <div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "28px", fontWeight: 700, color: "#ffd700" }}>{result.calories} kcal</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff55", marginTop: "4px" }}>ประมาณการแคลอรี่ที่เผาผลาญ</div>
 </div>
 </div>
 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
 <GlowButton onClick={onPlayAgain} style={{ width: "100%" }}> ออกกำลังท่าอื่น</GlowButton>
 <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%" }}>← กลับแผนวันนี้</GlowButton>
 </div>
 </div>
 );
}

// [หน้า H] หน้าประวัติการออกกำลัง
function PageHistory({ onBack, stats }) {
 const [history, setHistory] = useState(() => loadLS(LS_HISTORY, []));
 const icons = { pushup: "", squat: "", plank: "", lunge: "", situp: "", jumpingjack: "" };
 const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };

 const clearHistory = () => { saveLS(LS_HISTORY, []); setHistory([]); };

 const totalCal = history.reduce((s, h) => s + (h.calories || 0), 0);
 const totalSessions = history.length;

 return (
 <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
 <div style={{ marginBottom: "32px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00bfff66", marginBottom: "12px" }}>// WORKOUT HISTORY</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>YOUR<br /><span style={{ color: "#00bfff" }}>JOURNEY</span></h1>
 </div>
 {/* Summary row */}
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
 {[[" SESSIONS", totalSessions], [" TOTAL KCAL", totalCal]].map(([k, v]) => (
 <div key={k} style={{ background: "#0d1a0d", border: "1px solid #00bfff22", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: 700, color: "#00bfff" }}>{v}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{k}</div>
 </div>
 ))}
 </div>
 {history.length === 0 ? (
 <div style={{ textAlign: "center", padding: "60px 24px", color: "#ffffff33", fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 2 }}>
 <div style={{ fontSize: "48px", marginBottom: "16px" }}></div>
 ยังไม่มีประวัติการออกกำลัง<br />เริ่มออกกำลังแล้วจะบันทึกที่นี่
 </div>
 ) : (
 <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
 {history.map((h) => {
 const d = new Date(h.id);
 const dateStr = d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
 const timeStr = d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
 const isHold = h.exercise === "plank";
 const elapsed = h.elapsed || 0;
 const m = Math.floor(elapsed / 60), s = elapsed % 60;
 return (
 <div key={h.id} style={{ background: "#0d1a0d", border: "1px solid #00bfff22", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
 <div style={{ fontSize: "28px", flexShrink: 0 }}>{icons[h.exercise] || ""}</div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, color: "#00bfff" }}>{names[h.exercise] || h.exercise?.toUpperCase()}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff55", marginTop: "3px" }}>
 {h.sets} sets · {isHold ? `${h.exPlan?.hold_sec || 0}s hold` : `${h.exPlan?.reps || 0} reps`} · {`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`}
 </div>
 </div>
 <div style={{ textAlign: "right", flexShrink: 0 }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffd700" }}>{h.calories || 0} kcal</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff33", marginTop: "3px" }}>{dateStr} {timeStr}</div>
 </div>
 </div>
 );
 })}
 </div>
 )}
 <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
 <div style={{ display: "flex", gap: "10px" }}>
 <GlowButton variant="ghost" onClick={onBack} style={{ flex: 1 }}>← กลับ</GlowButton>
 {history.length > 0 && <GlowButton variant="danger" onClick={clearHistory} style={{ flex: 1 }}> ล้างประวัติ</GlowButton>}
 </div>
 {/* Export / Import */}
 <div style={{ display: "flex", gap: "10px" }}>
 <button
 onClick={() => {
 const data = { stats, history: loadLS(LS_HISTORY, []), ctx: loadLS(LS_CTX, {}) };
 const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a"); a.href = url; a.download = `shadow_backup_${new Date().toISOString().slice(0, 10)}.json`; a.click();
 URL.revokeObjectURL(url);
 }}
 style={{ flex: 1, padding: "12px", background: "#0d1a0d", border: "1px solid #00ff8844", borderRadius: "4px", color: "#00ff88", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, cursor: "pointer", letterSpacing: "1px" }}
 >
 EXPORT ข้อมูล
 </button>
 <label
 style={{ flex: 1, padding: "12px", background: "#0d1a0d", border: "1px solid #00bfff44", borderRadius: "4px", color: "#00bfff", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, cursor: "pointer", letterSpacing: "1px", textAlign: "center" }}
 >
 IMPORT ข้อมูล
 <input type="file" accept=".json" style={{ display: "none" }} onChange={e => {
 const file = e.target.files?.[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = (ev) => {
 try {
 const data = JSON.parse(ev.target.result);
 if (data.history) { saveLS(LS_HISTORY, data.history); setHistory(data.history); }
 if (data.stats) saveLS(LS_STATS, data.stats);
 if (data.ctx) saveLS(LS_CTX, data.ctx);
 alert("นำเข้าข้อมูลสำเร็จ! รีเฟรชเพื่อใช้งานข้อมูลใหม่");
 } catch { alert("ไฟล์ไม่ถูกต้อง กรุณาใช้ไฟล์ที่ export จากแอปนี้เท่านั้น"); }
 };
 reader.readAsText(file);
 e.target.value = "";
 }} />
 </label>
 </div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff22", textAlign: "center", marginTop: "4px" }}>
 Export เพื่อสำรองข้อมูล · Import เพื่อกู้คืนข้อมูลข้ามเครื่อง
 </div>
 </div>
 </div>
 );
}

// [หน้า D] Dashboard สรุปสถิติ + กราฟรายสัปดาห์
function PageDashboard({ onBack }) {
 const canvasRef = useRef(null);
 const history = loadLS(LS_HISTORY, []);
 const totalCal = history.reduce((s, h) => s + (h.calories || 0), 0);
 const totalSessions = history.length;

 // Last 7 days
 const days = [];
 for (let i = 6; i >= 0; i--) {
 const d = new Date(); d.setDate(d.getDate() - i);
 const key = d.toISOString().slice(0, 10);
 const label = d.toLocaleDateString("th-TH", { weekday: "short" });
 const sessions = history.filter(h => new Date(h.id).toISOString().slice(0, 10) === key);
 days.push({ label, cal: sessions.reduce((s, h) => s + (h.calories || 0), 0), count: sessions.length });
 }
 const maxCal = Math.max(...days.map(d => d.cal), 1);

 // Streak
 let streak = 0;
 for (let i = 0; i < 30; i++) {
 const d = new Date(); d.setDate(d.getDate() - i);
 const key = d.toISOString().slice(0, 10);
 if (history.some(h => new Date(h.id).toISOString().slice(0, 10) === key)) streak++; else break;
 }

 // Exercise breakdown
 const exCount = {};
 history.forEach(h => { exCount[h.exercise] = (exCount[h.exercise] || 0) + 1; });
 const exNames = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };
 const exColors = { pushup: "#00ff88", squat: "#00bfff", plank: "#ffd700", lunge: "#ff9800", situp: "#a855f7", jumpingjack: "#ff3366" };

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 const W = canvas.width, H = canvas.height;
 ctx.clearRect(0, 0, W, H);
 ctx.fillStyle = "#0d1a0d"; ctx.fillRect(0, 0, W, H);
 // Grid
 ctx.strokeStyle = "#00ff8811"; ctx.lineWidth = 1;
 for (let i = 0; i < 5; i++) { const y = 30 + (i * (H - 70)) / 4; ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W - 20, y); ctx.stroke(); }
 // Bars
 const barW = (W - 90) / 7 - 8;
 days.forEach((d, i) => {
 const x = 60 + i * ((W - 90) / 7);
 const barH = d.cal > 0 ? (d.cal / maxCal) * (H - 90) : 0;
 const y = H - 50 - barH;
 const grad = ctx.createLinearGradient(x, y, x, H - 50);
 grad.addColorStop(0, "#00ff88"); grad.addColorStop(1, "#00ff8833");
 ctx.fillStyle = grad; ctx.fillRect(x, y, barW, barH);
 ctx.shadowColor = "#00ff88"; ctx.shadowBlur = d.cal > 0 ? 6 : 0;
 ctx.fillRect(x, y, barW, 2); ctx.shadowBlur = 0;
 if (d.cal > 0) { ctx.fillStyle = "#00ff88"; ctx.font = "bold 10px 'Space Mono',monospace"; ctx.textAlign = "center"; ctx.fillText(`${d.cal}`, x + barW / 2, y - 6); }
 ctx.fillStyle = "#ffffff55"; ctx.font = "10px 'Space Mono',monospace"; ctx.textAlign = "center"; ctx.fillText(d.label, x + barW / 2, H - 28);
 if (d.count > 0) { ctx.fillStyle = "#ffd700"; ctx.font = "9px 'Space Mono',monospace"; ctx.fillText(`${d.count}x`, x + barW / 2, H - 14); }
 });
 ctx.fillStyle = "#ffffff33"; ctx.font = "9px 'Space Mono',monospace"; ctx.textAlign = "right"; ctx.fillText("kcal", 45, 25);
 }, []);

 return (
 <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
 <div style={{ marginBottom: "32px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#a855f766", marginBottom: "12px" }}>// DASHBOARD</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>YOUR<br /><span style={{ color: "#a855f7" }}>PROGRESS</span></h1>
 </div>
 {/* Summary cards */}
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
 {[["", totalSessions, "SESSIONS"], ["", totalCal, "TOTAL KCAL"], ["", streak, "DAY STREAK"]].map(([icon, val, label]) => (
 <div key={label} style={{ background: "#0d1a0d", border: "1px solid #a855f722", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
 <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#a855f7" }}>{val}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{label}</div>
 </div>
 ))}
 </div>
 {/* Weekly chart */}
 <div style={{ background: "#0d1a0d", border: "1px solid #a855f722", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
 <div style={{ background: "#060810", padding: "12px", borderBottom: "1px solid #a855f722", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#a855f7", letterSpacing: "2px" }}> WEEKLY CALORIES</div>
 <canvas ref={canvasRef} width={520} height={260} style={{ width: "100%", height: "auto", display: "block" }} />
 </div>
 {/* Exercise breakdown */}
 {Object.keys(exCount).length > 0 && (
 <div style={{ background: "#0d1a0d", border: "1px solid #a855f722", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#a855f799", marginBottom: "16px" }}>EXERCISE BREAKDOWN</div>
 {Object.entries(exCount).sort((a, b) => b[1] - a[1]).map(([ex, cnt]) => (
 <div key={ex} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: exColors[ex] || "#00ff88", width: "100px", flexShrink: 0 }}>{exNames[ex] || ex.toUpperCase()}</span>
 <div style={{ flex: 1, height: "8px", background: "#060810", borderRadius: "4px", overflow: "hidden" }}>
 <div style={{ height: "100%", width: `${(cnt / totalSessions) * 100}%`, background: exColors[ex] || "#00ff88", borderRadius: "4px", boxShadow: `0 0 6px ${exColors[ex] || "#00ff88"}44` }} />
 </div>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff66", width: "30px", textAlign: "right" }}>{cnt}x</span>
 </div>
 ))}
 </div>
 )}
 <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%" }}>← กลับ</GlowButton>
 </div>
 );
}

// [หน้า 5] หน้าแจ้งเตือนขออนุญาตเข้าใช้กล้อง
function PageCameraPermission({ exercise, plan, onGranted, onBack }) {
 const [status, setStatus] = useState("idle");
 const exPlan = plan[exercise];
 const requestCamera = async () => {
 setStatus("requesting");
 try {
 const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: "user" } });
 onGranted(stream);
 } catch (e) {
 setStatus(e.name === "NotAllowedError" || e.name === "PermissionDeniedError" ? "denied" : "error");
 }
 };
 const statusUI = {
 idle: { icon: "", title: "ขออนุญาตใช้กล้อง", desc: "The Adaptable Shadow ต้องการเข้าถึงกล้องเพื่อตรวจจับท่าออกกำลังกาย Real-time\n\nข้อมูลภาพประมวลผลในเครื่องเท่านั้น", cta: "อนุญาตและเปิดกล้อง", ctaVariant: "primary" },
 requesting: { icon: "", title: "กำลังขอสิทธิ์...", desc: "โปรดกด 'อนุญาต' ในป๊อปอัปของเบราว์เซอร์", cta: null },
 denied: { icon: "", title: "ถูกปฏิเสธสิทธิ์", desc: "วิธีแก้:\n1. คลิกไอคอน ในแถบ URL\n2. เปลี่ยนกล้องเป็น 'อนุญาต'\n3. รีเฟรชแล้วลองใหม่", cta: "ลองใหม่อีกครั้ง", ctaVariant: "ghost" },
 error: { icon: "", title: "ไม่พบกล้อง", desc: "ตรวจสอบว่าเครื่องมีกล้องและไม่มีแอปอื่นใช้งานอยู่", cta: "ลองใหม่", ctaVariant: "ghost" },
 };
 const ui = statusUI[status];
 return (
 <div style={{ maxWidth: "460px", margin: "0 auto", padding: "40px 24px" }}>
 <div style={{ marginBottom: "40px" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>// CAMERA ACCESS</div>
 <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>READY TO<br /><span style={{ color: "#00ff88" }}>TRACK?</span></h1>
 </div>
 <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
 <div style={{ background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "6px", padding: "12px 20px", flex: 1, textAlign: "center" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#00ff88" }}>{exPlan.sets}×{exPlan.reps}</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff44", letterSpacing: "2px", marginTop: "4px" }}>{exercise === "pushup" ? "PUSH-UP" : "SQUAT"}</div>
 </div>
 <div style={{ background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "6px", padding: "12px 20px", flex: 1, textAlign: "center" }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#ffd700" }}>{plan.estimated_duration_min}m</div>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff44", letterSpacing: "2px", marginTop: "4px" }}>EST. TIME</div>
 </div>
 </div>
 <div style={{ background: "#0d1a0d", border: `1px solid ${status === "denied" || status === "error" ? "#ff336633" : "#00ff8822"}`, borderRadius: "12px", padding: "36px 28px", textAlign: "center", transition: "border-color 0.3s" }}>
 <div style={{ fontSize: "56px", marginBottom: "20px", lineHeight: 1 }}>{ui.icon}</div>
 {status === "requesting" && <div style={{ width: "48px", height: "48px", border: "3px solid #00ff8822", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />}
 <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "16px" }}>{ui.title}</h2>
 <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffff66", lineHeight: 2, whiteSpace: "pre-line", marginBottom: "28px" }}>{ui.desc}</p>
 {status === "idle" && (
 <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "28px" }}>
 {[" ประมวลผลในเครื่อง", " ไม่บันทึกวิดีโอ", " Real-time AI"].map(t => (
 <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", padding: "5px 10px", background: "#060810", border: "1px solid #00ff8833", borderRadius: "20px", color: "#00ff8899" }}>{t}</span>
 ))}
 </div>
 )}
 {ui.cta && <GlowButton onClick={requestCamera} variant={ui.ctaVariant} style={{ width: "100%" }}>{status === "denied" || status === "error" ? "" : ""}{ui.cta}</GlowButton>}
 </div>
 <div style={{ marginTop: "20px" }}><GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← กลับ</GlowButton></div>
 </div>
 );
}

// [หน้า 5.5] หน้า Preview กล้อง + AI Skeleton (แสดงภาพกล้องพร้อม AI ตรวจจับท่าก่อนเริ่มออกกำลัง)
function PageCameraPreview({ exercise, plan, mediapipeReady, initialStream, onStart, onBack }) {
 const videoRef = useRef(null), canvasRef = useRef(null), poseRef = useRef(null);
 const streamRef = useRef(null), rafRef = useRef(null);
 const [poseDetected, setPoseDetected] = useState(false);
 const [cameraErr, setCameraErr] = useState(null);
 const [jointCount, setJointCount] = useState(0);
 const exPlan = plan[exercise];

 // sync initialStream prop -> streamRef whenever it changes
 useEffect(() => { streamRef.current = initialStream || null; }, [initialStream]);

 useEffect(() => {
 if (!mediapipeReady) return;
 let active = true;
 const init = async () => {
 try {
 let stream = streamRef.current;
 if (!stream) {
 // fallback: request camera if stream was lost
 try {
 stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: "user" } });
 } catch (permErr) {
 setCameraErr("ไม่ได้รับอนุญาตใช้กล้อง กรุณากด ← กลับ แล้วอนุญาตใหม่อีกครั้ง");
 return;
 }
 }
 if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
 streamRef.current = stream;
 videoRef.current.srcObject = stream;
 await videoRef.current.play();
 const p = new window.Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${f}` });
 p.setOptions({ modelComplexity: 0, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.55, minTrackingConfidence: 0.55 });
 p.onResults((results) => {
 if (!active) return;
 const canvas = canvasRef.current, video = videoRef.current;
 if (!canvas || !video) return;
 const ctx2d = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
 // mirror the frame
 ctx2d.save(); ctx2d.translate(W, 0); ctx2d.scale(-1, 1); ctx2d.drawImage(results.image, 0, 0, W, H); ctx2d.restore();
 // dark vignette overlay
 const grad = ctx2d.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
 grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(1, "rgba(6,8,16,0.55)");
 ctx2d.fillStyle = grad; ctx2d.fillRect(0, 0, W, H);
 if (results.poseLandmarks) {
 setPoseDetected(true);
 setJointCount(results.poseLandmarks.length);
 // Draw connections
 if (window.drawConnectors && window.POSE_CONNECTIONS) {
 window.drawConnectors(ctx2d, results.poseLandmarks, window.POSE_CONNECTIONS, { color: "#00ff8866", lineWidth: 2 });
 }
 // Draw landmarks with numbered circles (like the reference image)
 results.poseLandmarks.forEach((lm, i) => {
 const x = (1 - lm.x) * W, y = lm.y * H; // mirrored
 const confidence = lm.visibility || 0;
 if (confidence < 0.3) return;
 // outer glow ring
 ctx2d.beginPath(); ctx2d.arc(x, y, 10, 0, Math.PI * 2);
 ctx2d.strokeStyle = `rgba(0,255,136,${confidence * 0.35})`; ctx2d.lineWidth = 6; ctx2d.stroke();
 // inner dot
 ctx2d.beginPath(); ctx2d.arc(x, y, 4, 0, Math.PI * 2);
 ctx2d.fillStyle = `rgba(0,255,136,${confidence})`; ctx2d.fill();
 // number label (only key joints)
 const keyJoints = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
 if (keyJoints.includes(i)) {
 ctx2d.fillStyle = "rgba(0,255,136,0.9)"; ctx2d.font = "bold 10px 'Space Mono',monospace";
 ctx2d.fillText(i, x + 7, y - 7);
 }
 });
 } else {
 setPoseDetected(false);
 }
 // Top HUD bar
 ctx2d.fillStyle = "rgba(6,8,16,0.78)"; ctx2d.fillRect(0, 0, W, 64);
 ctx2d.fillStyle = "#00ff88"; ctx2d.font = "bold 12px 'Space Mono',monospace";
 ctx2d.fillText(" AI BODY SCAN ACTIVE", 20, 26);
 ctx2d.fillStyle = results.poseLandmarks ? "#00ff88" : "#ff9800";
 ctx2d.font = "11px 'Space Mono',monospace";
 ctx2d.fillText(results.poseLandmarks ? ` POSE DETECTED — ${results.poseLandmarks.length} JOINTS` : "⟳ SCANNING...", 20, 50);
 // Exercise label top-right
 ctx2d.fillStyle = "#ffd700"; ctx2d.font = "bold 12px 'Space Mono',monospace";
 const exLabel = exercise === "pushup" ? "PUSH-UP" : "SQUAT";
 ctx2d.fillText(exLabel, W - ctx2d.measureText(exLabel).width - 20, 26);
 ctx2d.fillStyle = "#ffffff44"; ctx2d.font = "10px 'Space Mono',monospace";
 ctx2d.fillText(`${exPlan.sets} SETS × ${exPlan.reps} REPS`, W - ctx2d.measureText(`${exPlan.sets} SETS × ${exPlan.reps} REPS`).width - 20, 50);
 // Bottom HUD
 ctx2d.fillStyle = "rgba(6,8,16,0.78)"; ctx2d.fillRect(0, H - 56, W, 56);
 ctx2d.strokeStyle = "#00ff8833"; ctx2d.lineWidth = 1;
 ctx2d.beginPath(); ctx2d.moveTo(0, H - 56); ctx2d.lineTo(W, H - 56); ctx2d.stroke();
 ctx2d.fillStyle = "#ffffff55"; ctx2d.font = "11px 'Space Mono',monospace";
 ctx2d.fillText("// ตั้งตัวให้ AI เห็นร่างกายทั้งหมด แล้วกด 'เริ่มออกกำลัง'", 20, H - 22);
 });
 await p.initialize();
 poseRef.current = p;
 const loop = async () => {
 if (!active) return;
 if (poseRef.current && videoRef.current?.readyState >= 2) await poseRef.current.send({ image: videoRef.current });
 rafRef.current = requestAnimationFrame(loop);
 };
 rafRef.current = requestAnimationFrame(loop);
 } catch (e) { setCameraErr("ไม่สามารถเข้าถึงกล้องได้ กรุณากด ← กลับ แล้วลองใหม่: " + e.message); }
 };
 init();
 return () => {
 active = false;
 if (rafRef.current) cancelAnimationFrame(rafRef.current);
 // ต้อง close Pose ก่อน ไม่งั้น instance เก่าจะยังถือกล้องค้าง
 if (poseRef.current) { try { poseRef.current.close(); } catch (_) { } poseRef.current = null; }
 };
 }, [mediapipeReady]);

 return (
 <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#060810", display: "flex", flexDirection: "column" }}>
 <video ref={videoRef} style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} playsInline muted />
 {/* Canvas: live camera + AI overlay */}
 <div style={{ position: "relative", flex: 1 }}>
 <canvas ref={canvasRef} width={1280} height={720} style={{ width: "100%", height: "auto", display: "block", maxHeight: "calc(100vh - 130px)", background: "#000" }} />
 {/* MediaPipe loading */}
 {!mediapipeReady && (
 <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.92)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
 <div style={{ width: "48px", height: "48px", border: "3px solid #00ff8833", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
 <p style={{ fontFamily: "'Space Mono',monospace", color: "#00ff88", fontSize: "12px", letterSpacing: "2px" }}>กำลังโหลด AI...</p>
 </div>
 )}
 {cameraErr && (
 <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", flexDirection: "column", gap: "16px" }}>
 <div style={{ fontSize: "48px" }}></div>
 <p style={{ fontFamily: "'Space Mono',monospace", color: "#ff4466", fontSize: "13px", textAlign: "center" }}>{cameraErr}</p>
 </div>
 )}
 {/* Pose status badge */}
 <div style={{ position: "absolute", top: "72px", right: "16px", display: "flex", alignItems: "center", gap: "8px", background: "rgba(6,8,16,0.7)", border: `1px solid ${poseDetected ? "#00ff8866" : "#ff980066"}`, borderRadius: "20px", padding: "6px 14px" }}>
 <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: poseDetected ? "#00ff88" : "#ff9800", boxShadow: poseDetected ? "0 0 8px #00ff88" : "0 0 8px #ff9800", animation: "pulse 1.5s ease-in-out infinite" }} />
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: poseDetected ? "#00ff88" : "#ff9800", letterSpacing: "1px" }}>
 {poseDetected ? "AI TRACKING" : "SCANNING"}
 </span>
 </div>
 </div>
 {/* Bottom action bar */}
 <div style={{ background: "rgba(6,8,16,0.95)", borderTop: "1px solid #00ff8822", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
 <button onClick={onBack} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", background: "none", border: "1px solid #ffffff22", borderRadius: "4px", padding: "10px 18px", cursor: "pointer", letterSpacing: "1px", flexShrink: 0 }}>← กลับ</button>
 <div style={{ flex: 1 }}>
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: poseDetected ? "#00ff8899" : "#ff980099", letterSpacing: "2px", marginBottom: "4px" }}>
 {poseDetected ? ` พบ ${jointCount} จุดข้อต่อ — พร้อมแล้ว!` : "⟳ ตั้งตัวให้ AI มองเห็นร่างกายทั้งหมด"}
 </div>
 <div style={{ height: "3px", background: "#0d1a0d", borderRadius: "2px", overflow: "hidden" }}>
 <div style={{ height: "100%", width: poseDetected ? "100%" : "40%", background: poseDetected ? "#00ff88" : "#ff9800", transition: "all 0.6s ease", boxShadow: poseDetected ? "0 0 8px #00ff88" : "none" }} />
 </div>
 </div>
 <GlowButton onClick={onStart} style={{ flexShrink: 0, padding: "12px 24px" }}> เริ่มออกกำลัง</GlowButton>
 </div>
 <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
 </div>
 );
}

// [หน้า 6] พระเอกของงานระบบจับภาพสดด้วย MediaPipe นำข้อมูลข้อต่อส่งกลับมาประมวลผลมุมและองศา
function PageTracker({ exercise, plan, onFinish, onDone, mediapipeReady, initialStream, weightKg }) {
 const videoRef = useRef(null), canvasRef = useRef(null), poseRef = useRef(null);
 const streamRef = useRef(null), rafRef = useRef(null);
 const stageRef = useRef("up"), counterRef = useRef(0), setNumRef = useRef(1), restingRef = useRef(false);
 const lastCountTimeRef = useRef(0);
 const badFormCounterRef = useRef(0); // นับ rep ที่ทำผิดท่า: ทุก 2 ครั้งผิด = 1 ครั้งถูก
 const plankHoldRef = useRef(0), plankIntervalRef = useRef(null), plankActiveRef = useRef(false);
 const [counter, setCounter] = useState(0), [setNum, setSetNum] = useState(1);
 const [angle, setAngle] = useState(0), [formOk, setFormOk] = useState(true);
 const [feedback, setFeedback] = useState("ตั้งตัวให้กล้องมองเห็น");
 const [isResting, setIsResting] = useState(false), [restCountdown, setRestCountdown] = useState(0);
 const [cameraErr, setCameraErr] = useState(null), [done, setDone] = useState(false);
 const [startTime] = useState(Date.now()), [elapsed, setElapsed] = useState(0);
 const exPlan = plan[exercise];
 const isPlank = exercise === "plank";
 const exNames = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };

 useEffect(() => { streamRef.current = initialStream || null; }, [initialStream]);
 useEffect(() => { const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000); return () => clearInterval(t); }, [startTime]);

 useEffect(() => {
 if (!mediapipeReady) return;
 let active = true;
 const init = async () => {
 try {
 let stream = streamRef.current;
 if (!stream) stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
 if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
 streamRef.current = stream;
 videoRef.current.srcObject = stream;
 await videoRef.current.play();
 const p = new window.Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${f}` });
 p.setOptions({ modelComplexity: 0, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
 p.onResults(handleResults);
 await p.initialize();
 poseRef.current = p;
 const loop = async () => {
 if (!active) return;
 if (poseRef.current && videoRef.current?.readyState >= 2 && !restingRef.current) await poseRef.current.send({ image: videoRef.current });
 rafRef.current = requestAnimationFrame(loop);
 };
 rafRef.current = requestAnimationFrame(loop);
 } catch (e) { setCameraErr("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตสิทธิ์กล้องและรีเฟรช"); }
 };
 init();
 return () => {
 active = false;
 if (rafRef.current) cancelAnimationFrame(rafRef.current);
 if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
 if (poseRef.current) { try { poseRef.current.close(); } catch (_) { } poseRef.current = null; }
 };
 }, [mediapipeReady]);

 const handleResults = useCallback((results) => {
 const canvas = canvasRef.current, video = videoRef.current;
 if (!canvas || !video) return;
 const ctx2d = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
 ctx2d.save(); ctx2d.translate(W, 0); ctx2d.scale(-1, 1); ctx2d.drawImage(results.image, 0, 0, W, H); ctx2d.restore();
 const targetReps = isPlank ? exPlan.hold_sec : exPlan.reps;
 if (!results.poseLandmarks) { setFeedback("ตั้งตัวให้กล้องมองเห็น"); drawHUD(ctx2d, W, H, counterRef.current, setNumRef.current, targetReps, exPlan.sets, 0, true, "ตั้งตัวให้กล้องมองเห็น", stageRef.current, elapsed); return; }
 const landmarks = results.poseLandmarks;
 if (window.drawConnectors && window.POSE_CONNECTIONS) window.drawConnectors(ctx2d, landmarks, window.POSE_CONNECTIONS, { color: "#00ff8833", lineWidth: 2 });
 if (window.drawLandmarks) window.drawLandmarks(ctx2d, landmarks, { color: "#00ff88", lineWidth: 1, radius: 3 });
 let ang = 0, ok = true, fb = " Good!";
 try {
 if (exercise === "pushup") {
 const shoulder = lm(landmarks, LM.L_SHOULDER), elbow = lm(landmarks, LM.L_ELBOW), wrist = lm(landmarks, LM.L_WRIST), hip = lm(landmarks, LM.L_HIP), ankle = lm(landmarks, LM.L_ANKLE);
 ang = calcAngle(shoulder, elbow, wrist);
 const bodyAng = calcAngle(shoulder, hip, ankle);
 // MULTI-JOINT: มือ(wrist)ต้องอยู่ต่ำกว่าไหล่(shoulder) → ยืนยันว่ากำลัง push-up จริง ไม่ใช่ยืนกางแขน
 const wristBelowShoulder = wrist[1] > shoulder[1] + 0.05;
 // MULTI-JOINT: ลำตัวต้องตรง
 const bodyOk = Math.abs(bodyAng - 180) <= 15;
 if (!wristBelowShoulder) { ok = false; fb = " ลงไปท่า Push-up! มือต้องอยู่บนพื้น"; Sound.error(); }
 else if (!bodyOk) { ok = false; fb = " หลังค่อม! ขึงลำตัวให้ตรง"; Sound.error(); }
 else if (ang < 70 && ang > 40) { fb = " Perfect Form!"; }
 else if (ang >= 70 && ang <= 160) { fb = "↓ ลงให้ลึกกว่านี้!"; }
 else { fb = " Perfect Form!"; }
 if (ang > 160) { stageRef.current = "up"; }
 if (ang < 70 && stageRef.current === "up" && Date.now() - lastCountTimeRef.current > 500) {
 stageRef.current = "down";
 lastCountTimeRef.current = Date.now();
 if (ok) {
 counterRef.current += 1; setCounter(counterRef.current); Sound.rep();
 } else {
 badFormCounterRef.current += 1;
 if (badFormCounterRef.current >= 2) { badFormCounterRef.current = 0; counterRef.current += 1; setCounter(counterRef.current); Sound.rep(); }
 }
 if (counterRef.current >= exPlan.reps) { if (setNumRef.current < exPlan.sets) startRest(); else finishSet(); }
 }
 } else if (exercise === "squat" || exercise === "lunge") {
 const hip = lm(landmarks, LM.L_HIP), knee = lm(landmarks, LM.L_KNEE), ankle = lm(landmarks, LM.L_ANKLE);
 const shoulder = lm(landmarks, LM.L_SHOULDER);
 ang = calcAngle(hip, knee, ankle);
 const label = exercise === "squat" ? " Solid Squat!" : " Good Lunge!";
 // MULTI-JOINT: สะโพก(hip)ต้องลงใกล้ระดับเข่า(knee) → ยืนยันว่า squat จริง ไม่ใช่แค่ก้มตัว
 const hipDropped = hip[1] > knee[1] - 0.15;
 // MULTI-JOINT: เข่าตรงกับข้อเท้า
 const kneeAligned = Math.abs(knee[0] - ankle[0]) <= 0.07;
 // MULTI-JOINT: ลำตัวตั้งตรง
 const torsoUpright = Math.abs(shoulder[0] - hip[0]) <= 0.08;
 if (ang < 90 && !hipDropped) { ok = false; fb = " ย่อลงให้ลึกกว่านี้! สะโพกต้องลง"; Sound.error(); }
 else if (!kneeAligned) { ok = false; fb = exercise === "squat" ? " เข่าพับเข้า! เปิดเข่าออก" : " คุม balance ด้วย"; Sound.error(); }
 else if (!torsoUpright) { ok = false; fb = " ลำตัวเอน! ตั้งตัวให้ตรง"; Sound.error(); }
 else { fb = label; }
 if (ang > 160) { stageRef.current = "up"; }
 if (ang < 90 && stageRef.current === "up" && Date.now() - lastCountTimeRef.current > 500) {
 stageRef.current = "down";
 lastCountTimeRef.current = Date.now();
 if (ok) {
 counterRef.current += 1; setCounter(counterRef.current); Sound.rep();
 } else {
 badFormCounterRef.current += 1;
 if (badFormCounterRef.current >= 2) { badFormCounterRef.current = 0; counterRef.current += 1; setCounter(counterRef.current); Sound.rep(); }
 }
 if (counterRef.current >= exPlan.reps) { if (setNumRef.current < exPlan.sets) startRest(); else finishSet(); }
 }
 } else if (exercise === "situp") {
 const shoulder = lm(landmarks, LM.L_SHOULDER), hip = lm(landmarks, LM.L_HIP), knee = lm(landmarks, LM.L_KNEE);
 const elbow = lm(landmarks, LM.L_ELBOW);
 ang = calcAngle(shoulder, hip, knee);
 // STRICT: ตรวจว่าไม่ดึงคอ (ข้อศอกต้องไม่อยู่หน้าหัว) + เข่าต้องงอ
 const kneeAng = calcAngle(hip, knee, lm(landmarks, LM.L_ANKLE));
 if (kneeAng > 120) { ok = false; fb = " งอเข่าให้มากกว่านี้!"; Sound.error(); }
 else if (Math.abs(elbow[1] - shoulder[1]) > 0.15 && ang < 90) { ok = false; fb = " อย่าดึงคอ! ใช้หน้าท้องยกตัว"; Sound.error(); }
 else { fb = ang > 140 ? " ลงไป! เตรียมขึ้น" : ang < 70 ? " ขึ้นมาแล้ว! ดีมาก" : " Good Form!"; }
 if (ang > 140) { stageRef.current = "down"; }
 // นับ: form ถูก = +1, form ผิด 2 ครั้ง = +1
 if (ang < 70 && stageRef.current === "down" && Date.now() - lastCountTimeRef.current > 500) {
 stageRef.current = "up";
 lastCountTimeRef.current = Date.now();
 if (ok) {
 counterRef.current += 1; setCounter(counterRef.current); Sound.rep();
 } else {
 badFormCounterRef.current += 1;
 if (badFormCounterRef.current >= 2) { badFormCounterRef.current = 0; counterRef.current += 1; setCounter(counterRef.current); Sound.rep(); }
 }
 if (counterRef.current >= exPlan.reps) { if (setNumRef.current < exPlan.sets) startRest(); else finishSet(); }
 }
 } else if (exercise === "jumpingjack") {
 const hip = lm(landmarks, LM.L_HIP), shoulder = lm(landmarks, LM.L_SHOULDER), wrist = lm(landmarks, LM.L_WRIST);
 const rShoulder = lm(landmarks, LM.R_SHOULDER), rWrist = lm(landmarks, LM.R_WRIST), rHip = lm(landmarks, LM.R_HIP);
 const lAnkle = lm(landmarks, LM.L_ANKLE), rAnkle = lm(landmarks, LM.R_ANKLE);
 ang = calcAngle(hip, shoulder, wrist);
 const rAng = calcAngle(rHip, rShoulder, rWrist);
 // MULTI-JOINT: ขาต้องกางออก (ข้อเท้า 2 ข้างห่างกัน) → ป้องกันแค่ยกมือชนกัน
 const ankleSpread = Math.abs(lAnkle[0] - rAnkle[0]);
 const legsSpread = ankleSpread > 0.15;
 // MULTI-JOINT: ทั้ง 2 แขนต้องกางออกเท่าๆ กัน
 const armsSymmetric = Math.abs(ang - rAng) <= 30;
 // MULTI-JOINT: ลำตัวตั้งตรง
 const torsoUpright = Math.abs(shoulder[0] - hip[0]) <= 0.08;
 if (!armsSymmetric) { ok = false; fb = " กางแขนให้เท่ากัน!"; Sound.error(); }
 else if (!torsoUpright) { ok = false; fb = " ตั้งตัวตรง!"; Sound.error(); }
 else if (ang > 140 && !legsSpread) { ok = false; fb = " กางขาออกด้วย! ไม่ใช่แค่แขน"; Sound.error(); }
 else { fb = ang > 140 && legsSpread ? " กางแขน+ขาออก!" : ang < 40 ? " หุบแขน+ขา!" : " Keep Going!"; }
 if (ang < 40) { stageRef.current = "down"; }
 // นับ: form ถูก = +1, form ผิด 2 ครั้ง = +1
 if (ang > 140 && stageRef.current === "down" && Date.now() - lastCountTimeRef.current > 500) {
 stageRef.current = "up";
 lastCountTimeRef.current = Date.now();
 if (ok) {
 counterRef.current += 1; setCounter(counterRef.current); Sound.rep();
 } else {
 badFormCounterRef.current += 1;
 if (badFormCounterRef.current >= 2) { badFormCounterRef.current = 0; counterRef.current += 1; setCounter(counterRef.current); Sound.rep(); }
 }
 if (counterRef.current >= exPlan.reps) { if (setNumRef.current < exPlan.sets) startRest(); else finishSet(); }
 }
 } else if (isPlank) {
 const shoulder = lm(landmarks, LM.L_SHOULDER), hip = lm(landmarks, LM.L_HIP), ankle = lm(landmarks, LM.L_ANKLE);
 const elbow = lm(landmarks, LM.L_ELBOW);
 ang = calcAngle(shoulder, hip, ankle);
 // MULTI-JOINT: สะโพก(hip)ต้องอยู่สูงกว่าข้อเท้า(ankle) → ป้องกันนอนแผ่ราบ
 const hipElevated = hip[1] < ankle[1] - 0.03;
 // MULTI-JOINT: ลำตัวตรง
 const bodyOk = Math.abs(ang - 180) < 15;
 // MULTI-JOINT: ข้อศอกอยู่ใต้ไหล่
 const elbowOk = Math.abs(elbow[0] - shoulder[0]) < 0.1;
 ok = bodyOk && elbowOk && hipElevated;
 if (!hipElevated) { fb = " ยกตัวขึ้น! ห้ามนอนราบ"; }
 else if (!elbowOk) { fb = " ข้อศอกต้องอยู่ใต้ไหล่!"; }
 else if (ang < 165) { fb = " สะโพกสูงเกิน! ลดลงมา"; }
 else if (ang > 195) { fb = " สะโพกตก! ยกขึ้นนิด"; }
 else { fb = " Hold it! ค้างไว้"; }
 if (!ok) Sound.error();
 // MULTI-JOINT: นับเวลาเฉพาะตอน form ถูกทุกข้อเท่านั้น
 if (ok && !plankActiveRef.current && !restingRef.current) {
 plankActiveRef.current = true;
 plankIntervalRef.current = setInterval(() => {
 plankHoldRef.current += 1; setCounter(plankHoldRef.current); Sound.tick();
 if (plankHoldRef.current >= exPlan.hold_sec) {
 clearInterval(plankIntervalRef.current); plankHoldRef.current = 0; plankActiveRef.current = false;
 if (setNumRef.current < exPlan.sets) startRest(); else finishSet();
 }
 }, 1000);
 } else if (!ok && plankActiveRef.current) {
 clearInterval(plankIntervalRef.current); plankActiveRef.current = false;
 fb = " หยุดนับ! คืน form แล้ว hold ต่อ";
 }
 }
 setAngle(Math.round(ang)); setFormOk(ok); setFeedback(fb);
 } catch (_) { }
 drawHUD(ctx2d, W, H, counterRef.current, setNumRef.current, isPlank ? exPlan.hold_sec : exPlan.reps, exPlan.sets, Math.round(ang), ok, fb, stageRef.current, elapsed);
 }, [exercise, exPlan, elapsed, isPlank]);

 function startRest() {
 restingRef.current = true; setIsResting(true); counterRef.current = 0; setCounter(0); badFormCounterRef.current = 0; if (isPlank) plankHoldRef.current = 0;
 setNumRef.current += 1; setSetNum(setNumRef.current);
 let t = exPlan.rest_sec; setRestCountdown(t);
 const iv = setInterval(() => { t--; setRestCountdown(t); Sound.tick(); if (t <= 0) { clearInterval(iv); restingRef.current = false; setIsResting(false); stageRef.current = "up"; } }, 1000);
 }

 function finishSet() {
 if (isPlank && plankIntervalRef.current) clearInterval(plankIntervalRef.current);
 Sound.complete();
 const cal = estimateCalories(exercise, exPlan.sets * (isPlank ? exPlan.hold_sec : exPlan.reps), elapsed, weightKg || 65);
 if (onDone) onDone({ exercise, exPlan, sets: exPlan.sets, totalReps: exPlan.sets * (isPlank ? exPlan.hold_sec : exPlan.reps), elapsed, calories: cal });
 else setDone(true);
 }

 function drawHUD(ctx2d, W, H, cnt, sn, tr, ts, ang, ok, fb, stage, el) {
 ctx2d.fillStyle = "rgba(6,8,16,0.75)"; ctx2d.fillRect(0, 0, W, 70);
 ctx2d.fillStyle = "#00ff88"; ctx2d.font = "bold 13px 'Space Mono',monospace";
 const exLabel = exNames[exercise] || exercise.toUpperCase();
 ctx2d.fillText(exLabel, 20, 28);
 ctx2d.fillStyle = "#ffffff66"; ctx2d.font = "11px 'Space Mono',monospace"; ctx2d.fillText(`SET ${sn}/${ts}`, 20, 50);
 ctx2d.fillStyle = "#ffd700"; ctx2d.font = "bold 42px 'Space Mono',monospace";
 const repStr = isPlank ? `${cnt}s` : `${cnt}/${tr}`; ctx2d.fillText(repStr, W / 2 - ctx2d.measureText(repStr).width / 2, 52);
 ctx2d.fillStyle = stage === "up" ? "#00ff88" : "#ff9800"; ctx2d.font = "bold 11px 'Space Mono',monospace"; ctx2d.fillText(isPlank ? "HOLD" : stage.toUpperCase(), W - 120, 28);
 ctx2d.fillStyle = "#ffd700"; ctx2d.font = "bold 20px 'Space Mono',monospace"; ctx2d.fillText(`${ang}°`, W - 120, 52);
 const barH = ok ? 56 : 90;
 ctx2d.fillStyle = ok ? "rgba(0,255,136,0.12)" : "rgba(255,51,102,0.35)"; ctx2d.fillRect(0, H - barH, W, barH);
 if (!ok) { ctx2d.fillStyle = "rgba(255,51,102,0.15)"; ctx2d.fillRect(0, H - barH - 8, W, 8); } // red accent line
 ctx2d.strokeStyle = ok ? "#00ff8844" : "#ff3366"; ctx2d.lineWidth = ok ? 1 : 3; ctx2d.beginPath(); ctx2d.moveTo(0, H - barH); ctx2d.lineTo(W, H - barH); ctx2d.stroke();
 ctx2d.fillStyle = ok ? "#00ff88" : "#ff4466"; ctx2d.font = ok ? "bold 18px 'Space Mono',monospace" : "bold 28px 'Space Mono',monospace";
 ctx2d.fillText(fb, 20, ok ? H - 20 : H - 50);
 if (!ok) { ctx2d.fillStyle = "#ff446699"; ctx2d.font = "14px 'Space Mono',monospace"; ctx2d.fillText("แก้ท่าให้ถูกต้อง! (ผิด 2 ครั้ง = นับ 1)", 20, H - 18); }
 const m = Math.floor(el / 60), s = el % 60, tStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
 ctx2d.fillStyle = "#ffffff33"; ctx2d.font = "12px 'Space Mono',monospace"; ctx2d.fillText(tStr, W / 2 - ctx2d.measureText(tStr).width / 2, ok ? H - 20 : H - 18);
 }

 const mins = Math.floor(elapsed / 60), secs = elapsed % 60;
 return (
 <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#060810", display: "flex", flexDirection: "column" }}>
 <div style={{ position: "relative", width: "100%", flex: 1 }}>
 <video ref={videoRef} style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} playsInline muted />
 <canvas ref={canvasRef} width={1280} height={720} style={{ width: "100%", height: "auto", display: "block", maxHeight: "calc(100vh - 120px)" }} />
 {!mediapipeReady && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.9)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><div style={{ width: "40px", height: "40px", border: "3px solid #00ff8833", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }} /><p style={{ fontFamily: "'Space Mono',monospace", color: "#00ff88", fontSize: "12px" }}>Loading MediaPipe...</p></div>}
 {cameraErr && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "16px" }}></div><p style={{ fontFamily: "'Space Mono',monospace", color: "#ff4466", fontSize: "13px", lineHeight: 1.8 }}>{cameraErr}</p><GlowButton variant="ghost" onClick={() => window.location.reload()} style={{ marginTop: "24px" }}>RELOAD</GlowButton></div></div>}
 {isResting && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.88)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#ffffff44", marginBottom: "16px" }}>// REST TIME</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "96px", fontWeight: 700, color: "#00ff88", lineHeight: 1 }}>{restCountdown}</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", color: "#ffffff66", marginTop: "16px" }}>SET {setNum} COMING UP</div><div style={{ marginTop: "32px", background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "4px", padding: "16px 32px" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#00ff8899", letterSpacing: "2px" }}>COMPLETED SETS</div><div style={{ display: "flex", gap: "8px", marginTop: "8px", justifyContent: "center" }}>{Array.from({ length: exPlan.sets }).map((_, i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: i < setNum - 1 ? "#00ff88" : "#1a2a1a", boxShadow: i < setNum - 1 ? "0 0 8px #00ff88" : "none" }} />)}</div></div></div>}
 {done && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "32px" }}><div style={{ fontSize: "64px", marginBottom: "24px" }}></div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>// SESSION COMPLETE</div><h2 style={{ fontFamily: "'Space Mono',monospace", color: "#ffffff", fontSize: "28px", fontWeight: 700, margin: "0 0 32px", textAlign: "center" }}>MISSION<br /><span style={{ color: "#00ff88" }}>ACCOMPLISHED</span></h2><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "32px", width: "100%", maxWidth: "360px" }}>{[["EXERCISE", exercise.toUpperCase()], ["SETS", `${exPlan.sets}×${exPlan.reps}`], ["TIME", `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`]].map(([k, v]) => <div key={k} style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "16px", textAlign: "center" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, color: "#00ff88" }}>{v}</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{k}</div></div>)}</div><GlowButton onClick={onFinish}>BACK TO PLAN</GlowButton></div>}
 </div>
 <div style={{ background: "#060810", borderTop: "1px solid #00ff8822", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
 <div>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#00ff88", fontWeight: 700 }}>{exercise.toUpperCase()}</span>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", marginLeft: "12px" }}>SET {setNum}/{exPlan.sets} · {counter}/{exPlan.reps} REPS · {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</span>
 </div>
 <button onClick={onFinish} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", background: "none", border: "1px solid #ffffff22", borderRadius: "4px", padding: "6px 14px", cursor: "pointer", letterSpacing: "1px" }}>STOP</button>
 </div>
 </div>
 );
}

// ============================================================================
// 4. หัวใจหลักของแอปพลิเคชัน (Main App & Router)
// ============================================================================
export default function AdaptableShadow() {
 const [page, setPage] = useState("profile");
 const [stats, setStats] = useState(() => loadLS(LS_STATS, { weight: 70, height: 170, bodyFat: 22 }));
 const [ctx, setCtx] = useState(() => loadLS(LS_CTX, { calendar: "ว่าง", fatigue: 5, location: "บ้าน", weather: "แดดจ้า" }));
 const [plan, setPlan] = useState(null);
 const [exercise, setExercise] = useState("pushup");
 const [planError, setPlanError] = useState(null);
 const [loading, setLoading] = useState(false);
 const [mediapipeReady, setMediapipeReady] = useState(false);
 const [cameraStream, setCameraStream] = useState(null);
 const [workoutResult, setWorkoutResult] = useState(null);
 const [soundEnabled, setSoundEnabled] = useState(true);
 const [user, setUser] = useState(null);
 const [authLoading, setAuthLoading] = useState(true); // รอเช็คสถานะ auth
 const [loginLoading, setLoginLoading] = useState(false);
 // Guided Workout: คิวท่าที่ต้องทำตามลำดับ
 const [guidedQueue, setGuidedQueue] = useState([]);
 const [guidedResults, setGuidedResults] = useState([]);
 const EXERCISE_ORDER = ["pushup", "squat", "plank", "lunge", "situp", "jumpingjack"];

 // ----------------------------------------------------
 // ระบบ Auth & Cloud Sync
 // ----------------------------------------------------
 useEffect(() => {
 // ฟังการเปลี่ยนสถานะล็อกอิน
 const unsubscribe = onAuth(async (currentUser) => {
 setUser(currentUser);
 setAuthLoading(false);
 if (currentUser) {
 // ถ้าล็อกอินแล้ว ให้ลองดึงข้อมูลจาก Cloud มาทับ (ถ้ามี)
 try {
 const cloudData = await loadUserData(currentUser.uid);
 if (cloudData) {
 if (cloudData.stats) { setStats(cloudData.stats); saveLS(LS_STATS, cloudData.stats); }
 if (cloudData.ctx) { setCtx(cloudData.ctx); saveLS(LS_CTX, cloudData.ctx); }
 if (cloudData.history) { saveLS(LS_HISTORY, cloudData.history); }
 } else {
 syncToCloud(currentUser.uid, stats, ctx, loadLS(LS_HISTORY, []));
 }
 } catch (e) { console.warn("Cloud load failed:", e); }
 }
 });
 return () => unsubscribe();
 }, []); // eslint-disable-line react-hooks/exhaustive-deps

 const syncToCloud = async (uid, s, c, h) => {
 if (!uid) return;
 try { await saveUserData(uid, { stats: s, ctx: c, history: h }); } catch (e) { console.warn("Cloud sync failed:", e); }
 };

 const handleLogin = async () => {
 setLoginLoading(true);
 try { await loginWithGoogle(); } catch (e) { alert("เข้าสู่ระบบไม่สำเร็จ: " + e.message); }
 finally { setLoginLoading(false); }
 };
 const handleLogout = async () => {
 if (window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
 await logout();
 alert("ออกจากระบบแล้ว ข้อมูลหลังจากนี้จะถูกบันทึกแค่ในเครื่อง");
 }
 };

 // บันทึก stats/ctx ลง localStorage เสมอเมื่อเปลี่ยน (และอัพขึ้น Cloud ถ้าล็อกอินอยู่)
 useEffect(() => {
 saveLS(LS_STATS, stats);
 if (user) syncToCloud(user.uid, stats, ctx, loadLS(LS_HISTORY, []));
 }, [stats]); // eslint-disable-line react-hooks/exhaustive-deps
 useEffect(() => {
 saveLS(LS_CTX, ctx);
 if (user) syncToCloud(user.uid, stats, ctx, loadLS(LS_HISTORY, []));
 }, [ctx]); // eslint-disable-line react-hooks/exhaustive-deps

 useEffect(() => {
 const loadScript = src => new Promise((res, rej) => {
 if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
 const s = document.createElement("script"); s.src = src; s.crossOrigin = "anonymous";
 s.onload = res; s.onerror = () => rej(new Error(`Failed: ${src}`)); document.head.appendChild(s);
 });
 loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js")
 .then(() => loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js"))
 .then(() => setMediapipeReady(true))
 .catch(e => console.warn("MediaPipe load warn:", e));
 }, []);

 const stopCamera = () => { if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); setCameraStream(null); } };

 const handleDone = (result) => {
 stopCamera();
 saveWorkoutSession(result);
 if (user) {
 syncToCloud(user.uid, stats, ctx, loadLS(LS_HISTORY, []));
 }
 // Guided Workout: ถ้ายังมีคิวเหลือ → ไปท่าถัดไปอัตโนมัติ
 if (guidedQueue.length > 1) {
 const remaining = guidedQueue.slice(1);
 setGuidedQueue(remaining);
 setGuidedResults(prev => [...prev, result]);
 setExercise(remaining[0]);
 setPage("tutorial");
 } else if (guidedQueue.length === 1) {
 // ท่าสุดท้ายแล้ว! แสดงสรุปรวม
 const allResults = [...guidedResults, result];
 setGuidedQueue([]);
 setGuidedResults([]);
 // รวมแคลอรี่และเวลา
 const totalCal = allResults.reduce((sum, r) => sum + (r.calories || 0), 0);
 const totalTime = allResults.reduce((sum, r) => sum + (r.elapsed || 0), 0);
 setWorkoutResult({ ...result, calories: totalCal, elapsed: totalTime, isGuided: true, exercises: allResults });
 setPage("summary");
 } else {
 // ไม่ได้อยู่ใน guided mode
 setWorkoutResult(result);
 setPage("summary");
 }
 };

 const handleAnalyze = async () => {
 setLoading(true); setPlanError(null); setPage("planning");
 try { const p = await fetchAIPlan(stats, ctx); setPlan(p); saveLS(LS_LAST_PLAN, p); setPage("plan"); }
 catch (e) { setPlanError("เชื่อมต่อ AI ไม่ได้ กรุณาลองใหม่ (" + e.message + ")"); setPage("context"); }
 finally { setLoading(false); }
 };

 // Quick Start: โหลดแผนล่าสุดแล้วไปหน้า plan เลย
 const handleQuickStart = () => {
 const lastPlan = loadLS(LS_LAST_PLAN, null);
 if (lastPlan) { setPlan(lastPlan); setPage("plan"); }
 };

 // Guided Workout: เริ่มทำทุกท่าตามลำดับอัตโนมัติ
 const handleStartGuided = () => {
 setGuidedQueue([...EXERCISE_ORDER]);
 setGuidedResults([]);
 const first = EXERCISE_ORDER[0];
 setExercise(first);
 setPage("tutorial");
 };

 const hideHeader = page === "tracker" || page === "camera-permission" || page === "camera-preview" || page === "camera-guide";

 return (
 <>
 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
 *{box-sizing:border-box;margin:0;padding:0;}body{background:#0a0a12;}
 input[type=range]{-webkit-appearance:none;appearance:none;}
 input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background:#00ff88;border-radius:50%;box-shadow:0 0 12px #00ff8888;cursor:pointer;margin-top:-6px;}
 input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:4px;}
 ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#0a0a0f;}::-webkit-scrollbar-thumb{background:#00ff8833;border-radius:2px;}
 @keyframes spin{to{transform:rotate(360deg)}}
 @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
 .fade-in{animation:fadeIn 0.3s ease forwards}
 `}</style>

 {/* Auth Loading Screen */}
 {authLoading ? (
 <div style={{ minHeight: "100vh", background: "#0a0a12", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
 <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.06)", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
 <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff33", letterSpacing: "3px" }}>กำลังโหลด...</div>
 </div>
 ) : !user ? (
 /* Login Page — ยังไม่ได้ล็อกอิน */
 <PageLogin onLogin={handleLogin} loading={loginLoading} />
 ) : (
 /* App หลัก — ล็อกอินแล้ว */
 <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#ffffff" }}>
 {!hideHeader && (
 <div style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,18,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
 <span style={{ fontSize: "18px", color: "#00ff88" }}></span>
 <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, background: "linear-gradient(135deg, #00ff88, #00bfff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>THE ADAPTABLE SHADOW</span>
 </div>
 <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
 <button
 onClick={handleLogout}
 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50px", padding: "5px 12px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff88", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px" }}
 >
 <img src={user.photoURL} alt="profile" style={{ width: "18px", height: "18px", borderRadius: "50%" }} referrerPolicy="no-referrer" />
 {user.displayName?.split("")[0]}
 </button>
 <button
 onClick={() => { _soundEnabled = !_soundEnabled; setSoundEnabled(_soundEnabled); }}
 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50px", padding: "5px 10px", cursor: "pointer", fontSize: "14px", transition: "all 0.2s" }}
 >
 {soundEnabled ? "" : ""}
 </button>
 <div style={{ display: "flex", gap: "6px" }}>
 {["profile", "context", "plan"].map((p, i) => (
 <div key={p} style={{ width: "8px", height: "8px", borderRadius: "50%", background: page === p ? "#00ff88" : ["profile", "context", "plan", "planning"].indexOf(page) > i ? "#00ff8844" : "rgba(255,255,255,0.08)", boxShadow: page === p ? "0 0 8px #00ff88" : "none", transition: "all 0.3s" }} />
 ))}
 </div>
 </div>
 </div>
 )}
 <div className="fade-in" key={page}>
 {page === "profile" && <PageProfile stats={stats} setStats={setStats} onNext={() => setPage("context")} hasLastPlan={!!loadLS(LS_LAST_PLAN, null)} onQuickStart={handleQuickStart} />}
 {page === "context" && <PageContext ctx={ctx} setCtx={setCtx} onBack={() => setPage("profile")} onAnalyze={handleAnalyze} loading={loading} error={planError} />}
 {page === "planning" && <PagePlanning />}
 {page === "plan" && plan && <PagePlan plan={plan} onStart={ex => { setExercise(ex); setGuidedQueue([]); setPage("tutorial"); }} onStartGuided={handleStartGuided} onBack={() => setPage("context")} onHistory={() => setPage("history")} onDashboard={() => setPage("dashboard")} />}
 {page === "tutorial" && plan && <PageVideoTutorial exercise={exercise} onNext={() => setPage("camera-guide")} onBack={() => setPage("plan")} />}
 {page === "camera-guide" && plan && <PageCameraGuide exercise={exercise} onNext={() => { setCameraStream(null); setPage("camera-permission"); }} onBack={() => setPage("tutorial")} />}
 {page === "camera-permission" && plan && <PageCameraPermission exercise={exercise} plan={plan} onGranted={stream => { setCameraStream(stream); setPage("camera-preview"); }} onBack={() => setPage("camera-guide")} />}
 {page === "camera-preview" && plan && <PageCameraPreview exercise={exercise} plan={plan} mediapipeReady={mediapipeReady} initialStream={cameraStream} onStart={() => setPage("tracker")} onBack={() => { stopCamera(); setPage("camera-permission"); }} />}
 {page === "tracker" && plan && <PageTracker exercise={exercise} plan={plan} mediapipeReady={mediapipeReady} initialStream={cameraStream} weightKg={stats.weight} onDone={handleDone} onFinish={() => { stopCamera(); setPage("plan"); }} />}
 {page === "summary" && workoutResult && <PageSummary result={workoutResult} stats={stats} onPlayAgain={() => setPage("plan")} onBack={() => setPage("plan")} />}
 {page === "history" && <PageHistory onBack={() => setPage("plan")} stats={stats} />}
 {page === "dashboard" && <PageDashboard onBack={() => setPage("plan")} />}
 </div>
 </div>
 )}
 </>
 );
}