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

// ฟังก์ชันเรียกขอแผนออกกำลังกายจาก Gemini ผ่าน Backend (server.js / Vercel API Route)
async function fetchAIPlan(stats, ctx) {
  console.log("Fetching AI plan from Backend...");

  const res = await fetch('/api/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stats, ctx })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Backend/Gemini Error:", res.status, errorData);
    throw new Error(errorData.message || `Backend Error (${res.status})`);
  }

  const plan = await res.json();

  // ใส่ค่า default ถ้า Gemini ตอบไม่ครบ
  if (!plan.pushup) plan.pushup = { sets: 2, reps: 10, rest_sec: 45 };
  if (!plan.squat) plan.squat = { sets: 2, reps: 12, rest_sec: 45 };
  if (!plan.plank) plan.plank = { sets: 2, hold_sec: 30, rest_sec: 30 };
  if (!plan.lunge) plan.lunge = { sets: 2, reps: 10, rest_sec: 45 };
  if (!plan.situp) plan.situp = { sets: 2, reps: 15, rest_sec: 45 };
  if (!plan.jumpingjack) plan.jumpingjack = { sets: 2, reps: 20, rest_sec: 30 };
  if (!plan.mode) plan.mode = "moderate";
  if (!plan.estimated_duration_min) plan.estimated_duration_min = 10;
  return plan;
}

// ============================================================================
// 2. คอมโพเนนต์ตกแต่ง UI (UI Components)
// ============================================================================

// เอฟเฟกต์ตกแต่งสไตล์ Cyberpunk (เส้นสแกนจอ)
function Scanline() {      // ← บรรทัดถัดไปต้องเป็นนี้เลย
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,136,0.015) 2px,rgba(0,255,136,0.015) 4px)" }} />;
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
  // ฟังก์ชัน: คำนวณไขมันอัตโนมัติจาก BMI (สูตร Deurenberg)
  const estimateBodyFat = () => {
    const bmi = stats.weight / (stats.height / 100) ** 2;
    // สูตรประมาณ: BF% = 1.2 × BMI + 0.23 × อายุ - 5.4 (ใช้อายุ 25 เป็น default)
    const estimated = Math.round((1.2 * bmi + 0.23 * 25 - 5.4) * 10) / 10;
    const clamped = Math.max(5, Math.min(50, estimated));
    setStats(s => ({ ...s, bodyFat: clamped }));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  ขั้นตอน 01 — ข้อมูลร่างกาย</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>คุณ<br /><span style={{ color: "#00ff88" }}>เป็นใคร?</span></h1>
        <p style={{ color: "#ffffff55", fontFamily: "'Space Mono',monospace", fontSize: "12px", marginTop: "16px", lineHeight: 1.8 }}>ข้อมูลนี้จะส่งให้ AI วิเคราะห์<br />เพื่อออกแบบโปรแกรมเฉพาะตัวคุณ</p>
      </div>
      {/* ชื่อเล่น */}
      <div style={{ marginBottom: "20px", background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "20px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", textTransform: "uppercase", marginBottom: "10px" }}>👤  ชื่อเล่น / Nickname</div>
        <input
          value={stats.nickname || ""}
          onChange={e => setStats(s => ({ ...s, nickname: e.target.value }))}
          placeholder="บอกชื่อของคุณ... เช่น: เบสท์, พี่, เบนซ์"
          style={{ width: "100%", background: "#060810", border: "1px solid #00ff8833", borderRadius: "4px", padding: "10px 14px", color: "#00ff88", fontFamily: "'Space Mono',monospace", fontSize: "14px", fontWeight: 700, outline: "none", boxSizing: "border-box", letterSpacing: "1px" }}
        />
      </div>
      <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "32px" }}>
        <StatInput label="น้ำหนัก" value={stats.weight} onChange={v => setStats(s => ({ ...s, weight: v }))} min={40} max={150} step={0.5} unit="kg" />
        <StatInput label="ส่วนสูง" value={stats.height} onChange={v => setStats(s => ({ ...s, height: v }))} min={140} max={220} unit="cm" />
        <StatInput label="ไขมันในร่างกาย" value={stats.bodyFat} onChange={v => setStats(s => ({ ...s, bodyFat: v }))} min={5} max={50} step={0.5} unit="%" />
        {/* ปุ่ม: ไม่ทราบค่าไขมัน → ประมาณจาก BMI ให้ */}
        <button
          onClick={estimateBodyFat}
          style={{ width: "100%", marginTop: "12px", padding: "14px 16px", background: "linear-gradient(135deg, #ffd70022, #ff980022)", border: "2px solid #ffd70066", borderRadius: "8px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "13px", fontWeight: 700, color: "#ffd700", letterSpacing: "1px", transition: "all 0.25s", boxShadow: "0 0 20px #ffd70033" }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ffd70033'; e.currentTarget.style.boxShadow = '0 0 30px #ffd70055'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #ffd70022, #ff980022)'; e.currentTarget.style.boxShadow = '0 0 20px #ffd70033'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          🔍 ไม่รู้ค่าไขมัน? กดเลย — AI ประมาณให้จาก BMI
        </button>
        <div style={{ marginTop: "12px", padding: "16px", background: "#060810", borderRadius: "4px", border: "1px solid #00ff8811" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[["BMI", (stats.weight / (stats.height / 100) ** 2).toFixed(1)], ["ไขมัน", (stats.weight * stats.bodyFat / 100).toFixed(1) + "kg"], ["กล้าม", (stats.weight * (1 - stats.bodyFat / 100)).toFixed(1) + "kg"]].map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, color: "#ffd700" }}>{v}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* เป้าหมายวันนี้ */}
      <div style={{ marginTop: "24px", background: "#0d1a0d", border: "1px solid #ffd70033", borderRadius: "8px", padding: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ffd70099", marginBottom: "12px" }}>🎯  เป้าหมายวันนี้</div>
        <textarea
          value={stats.goal || ""}
          onChange={e => setStats(s => ({ ...s, goal: e.target.value }))}
          rows={3}
          placeholder="บอก AI ว่าคุณต้องการอะไรวันนี้... เช่น: อยากลดพุง, เสริมแขน, อยากฝึกความอดทน"
          style={{ width: "100%", background: "#060810", border: "1px solid #ffd70033", borderRadius: "4px", padding: "12px 14px", color: "#ffd700", fontFamily: "'Space Mono',monospace", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.7 }}
        />
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff33", marginTop: "8px" }}>
          AI จะนำเป้าหมายนี้ไปปรับแผนและคำพูดกระตุ้นใจให้ตรงกับคุณโดยเฉพาะ
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px" }}>
        <GlowButton onClick={onNext} style={{ width: "100%" }}>ถัดไป →</GlowButton>
        {/* Quick Start: ถ้ามีแผนเก่า สามารถกดเริ่มเลย */}
        {hasLastPlan && (
          <GlowButton variant="ghost" onClick={onQuickStart} style={{ width: "100%", borderColor: "#ffd70044", color: "#ffd700" }}>⚡ เริ่มออกกำลังเลย (แผนเดิม)</GlowButton>
        )}
      </div>
    </div>
  );
}

// [หน้า 2] สอบถามบริบทย่อยของวันนี้ (ตารางงาน ความเหนื่อยล้า สถานที่)
function PageContext({ ctx, setCtx, onBack, onAnalyze, loading, error }) {
  const fatigueLevels = [
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
  const current = fatigueLevels.find(f => f.level === ctx.fatigue) || fatigueLevels[4];
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  ขั้นตอน 02 — บริบทวันนี้</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>วันนี้<br /><span style={{ color: "#00ff88" }}>เป็นยังไง?</span></h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* ความเหนื่อยล้า — 9 ระดับ */}
        <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "24px" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", textTransform: "uppercase", marginBottom: "12px" }}>💪  ความเหนื่อยล้า — <span style={{ color: current.color, fontWeight: 700 }}>{current.label}</span></div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: current.color, fontWeight: 700, textAlign: "center", marginBottom: "16px", padding: "10px", background: `${current.color}11`, border: `1px solid ${current.color}33`, borderRadius: "4px" }}>
            ระดับ {current.level}: {current.sets} SET × {current.reps} REP
          </div>
          {/* Grid 3×3 ให้เลือก */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {fatigueLevels.map(f => {
              const isActive = ctx.fatigue === f.level;
              return (
                <button
                  key={f.level}
                  onClick={() => setCtx(c => ({ ...c, fatigue: f.level }))}
                  style={{
                    background: isActive ? `${f.color}22` : "#060810",
                    border: `1px solid ${isActive ? f.color : "#ffffff11"}`,
                    borderRadius: "6px",
                    padding: "10px 4px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                    boxShadow: isActive ? `0 0 12px ${f.color}33` : "none",
                  }}
                >
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", fontWeight: 700, color: isActive ? f.color : "#ffffff66" }}>{f.level}</div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: isActive ? f.color : "#ffffff33", marginTop: "2px" }}>{f.sets}×{f.reps}</div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "8px", color: isActive ? "#ffffffaa" : "#ffffff22", marginTop: "2px" }}>{f.label}</div>
                </button>
              );
            })}
          </div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff33", marginTop: "12px", textAlign: "center", lineHeight: 1.6 }}>
            1 = พลังเต็ม (3 SET × 12 REP) → 9 = หมดสภาพ (1 SET × 6 REP)
          </div>
        </div>
        {[{ key: "calendar", label: "📅  ตารางงานวันนี้", placeholder: "เช่น: ประชุม 3 ชม., ว่าง..." },
        { key: "location", label: "📍  สถานที่", placeholder: "เช่น: บ้าน, ออฟฟิศ, ยิม..." },
        { key: "weather", label: "🌤  สภาพอากาศ", placeholder: "เช่น: ร้อน, ฝนตก, แดดจ้า..." }
        ].map(({ key, label, placeholder }) => (
          <div key={key} style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", textTransform: "uppercase", marginBottom: "10px" }}>{label}</div>
            <input value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} placeholder={placeholder}
              style={{ width: "100%", background: "#060810", border: "1px solid #00ff8833", borderRadius: "4px", padding: "10px 14px", color: "#ffffff", fontFamily: "'Space Mono',monospace", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
      {error && <div style={{ marginTop: "16px", padding: "12px", background: "#ff336622", border: "1px solid #ff3366", borderRadius: "4px", color: "#ff6688", fontFamily: "'Space Mono',monospace", fontSize: "12px" }}>{error}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px" }}>
        <GlowButton variant="ghost" onClick={onBack}>← กลับ</GlowButton>
        <GlowButton onClick={onAnalyze} disabled={loading}>{loading ? "กำลังวิเคราะห์..." : "วิเคราะห์แผน ⚡"}</GlowButton>
      </div>
    </div>
  );
}

// [หน้าคั่น] หน้าต่างโหลดระหว่ารอ Gemini AI กำลังจัดตาราง
function PagePlanning() {
  const [dots, setDots] = useState(0);
  useEffect(() => { const t = setInterval(() => setDots(d => (d + 1) % 4), 400); return () => clearInterval(t); }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", textAlign: "center", padding: "40px" }}>
      <div style={{ width: "80px", height: "80px", border: "3px solid #00ff8833", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "40px" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866" }}>//  AI กำลังวิเคราะห์</div>
      <h2 style={{ fontFamily: "'Space Mono',monospace", color: "#ffffff", fontSize: "24px", margin: "16px 0" }}>กำลังคิด{".".repeat(dots)}</h2>
      <p style={{ color: "#ffffff44", fontFamily: "'Space Mono',monospace", fontSize: "12px", maxWidth: "300px", lineHeight: 1.8 }}>กำลังวิเคราะห์ข้อมูลร่างกายและบริบทชีวิตของคุณ</p>
    </div>
  );
}

// [หน้า 3] หน้าสรุปแผน พร้อมปุ่มเพิ่มลง Google Calendar และให้ผู้ใช้เริ่มออกกำลัง
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
    { key: "pushup", label: "PUSH-UP", icon: "🤸", stat: `${plan.pushup.sets}×${plan.pushup.reps}`, sub: `REST ${plan.pushup.rest_sec}s` },
    { key: "squat", label: "SQUAT", icon: "🦵", stat: `${plan.squat.sets}×${plan.squat.reps}`, sub: `REST ${plan.squat.rest_sec}s` },
    { key: "plank", label: "PLANK", icon: "🧘", stat: `${plan.plank.sets}×${plan.plank.hold_sec}s`, sub: `REST ${plan.plank.rest_sec}s` },
    { key: "lunge", label: "LUNGE", icon: "🏃", stat: `${plan.lunge.sets}×${plan.lunge.reps}`, sub: `REST ${plan.lunge.rest_sec}s` },
    { key: "situp", label: "SIT-UP", icon: "🧑\u200d🦿", stat: `${plan.situp.sets}×${plan.situp.reps}`, sub: `REST ${plan.situp.rest_sec}s` },
    { key: "jumpingjack", label: "JUMPING JACK", icon: "⭐", stat: `${plan.jumpingjack.sets}×${plan.jumpingjack.reps}`, sub: `REST ${plan.jumpingjack.rest_sec}s` },
  ];

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          <ModeChip mode={plan.mode} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", letterSpacing: "2px" }}>{plan.estimated_duration_min} MIN</span>
        </div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>แผนของคุณ<br /><span style={{ color }}>พร้อมแล้ว!</span></h1>
      </div>
      <div style={{ background: "#0d1a0d", border: `1px solid ${color}33`, borderLeft: `3px solid ${color}`, borderRadius: "4px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: `${color}99`, marginBottom: "8px" }}>//  AI TRAINER SAYS</div>
        <p style={{ color: "#ffffff", fontFamily: "'Space Mono',monospace", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>{plan.message}</p>
        <p style={{ color: color, fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 1.8, margin: "12px 0 0", fontStyle: "italic" }}>💪 {plan.motivation}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {exercises.map(({ key, label, icon, stat, sub }) => (
          <div key={key} style={{ background: "#0d1a0d", border: `1px solid ${color}22`, borderRadius: "8px", padding: "16px" }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "2px", color: `${color}99`, marginBottom: "8px" }}>{label}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color }}>{stat}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff44", marginTop: "4px" }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#060810", border: "1px solid #ffd70033", borderRadius: "4px", padding: "16px", marginBottom: "24px" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffd70099", letterSpacing: "2px" }}>📌 FORM TIP: </span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffd700" }}>{plan.form_tip}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        <a
          href={getCalendarUrl()} target="_blank" rel="noreferrer"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 12px", background: "linear-gradient(135deg,#0d2a0d,#0a1f0a)", border: "1px solid #00ff8866", borderRadius: "8px", boxShadow: "0 0 12px #00ff8820", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: "#00ff88", letterSpacing: "1px", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 24px #00ff8840"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 12px #00ff8820"}
        >
          📅 CALENDAR
        </a>
        <button
          onClick={onHistory}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 12px", background: "linear-gradient(135deg,#0d1a2a,#0a1220)", border: "1px solid #00bfff66", borderRadius: "8px", boxShadow: "0 0 12px #00bfff20", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: "#00bfff", letterSpacing: "1px", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 24px #00bfff40"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 12px #00bfff20"}
        >
          📋 HISTORY
        </button>
        <button
          onClick={onDashboard}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 12px", background: "linear-gradient(135deg,#1a0d2a,#120a20)", border: "1px solid #a855f766", borderRadius: "8px", boxShadow: "0 0 12px #a855f720", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: "#a855f7", letterSpacing: "1px", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 24px #a855f740"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 12px #a855f720"}
        >
          📊 STATS
        </button>
      </div>

      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ffffff44", marginBottom: "12px" }}>//  เลือกท่าเพื่อเริ่ม</div>
      {/* Guided Workout: พาทำทีละท่าตามลำดับ */}
      <div style={{ marginBottom: "16px" }}>
        <GlowButton onClick={onStartGuided} style={{ width: "100%", fontSize: "14px", padding: "18px" }}>🎯 เริ่มออกกำลังกายอัตโนมัติ (ทำทุกท่า)</GlowButton>
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#ffffff33", textAlign: "center", marginBottom: "16px" }}>── หรือเลือกท่าเอง ──</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <GlowButton onClick={() => onStart("pushup")}>🤸 PUSH-UP</GlowButton>
        <GlowButton onClick={() => onStart("squat")} variant="ghost">🦵 SQUAT</GlowButton>
        <GlowButton onClick={() => onStart("plank")} variant="ghost">🧘 PLANK</GlowButton>
        <GlowButton onClick={() => onStart("lunge")} variant="ghost">🏃 LUNGE</GlowButton>
        <GlowButton onClick={() => onStart("situp")} variant="ghost">🧑‍🦿 SIT-UP</GlowButton>
        <GlowButton onClick={() => onStart("jumpingjack")} variant="ghost">⭐ JUMPING JACK</GlowButton>
      </div>
      <div style={{ marginTop: "16px" }}><GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← วางแผนใหม่</GlowButton></div>

    </div>
  );
}

// [หน้า 4] หน้าแสดงวิดีโอตัวอย่างท่าที่ถูกต้องให้ผู้ใช้ดูก่อน
function PageVideoTutorial({ exercise, onNext, onBack }) {
  const tips = {
    pushup: ["หลังและลำตัวต้องตรงเป็นแผ่นกระดาน", "ลงให้ลึกจนข้อศอกทำมุม 90 องศา", "มือต้องวางบนพื้น ไม่ใช่ยืนกางแขน", "ตาควรมองตรงไปข้างหน้าเล็กน้อย"],
    squat: ["ทิ้งน้ำหนักลงที่ส้นเท้า", "ย่อลงจนสะโพกใกล้ระดับเข่า", "ห้ามให้เข่าหุบเข้าหากัน", "ลำตัวตั้งตรง ห้ามเอนไปข้างหน้า"],
    plank: ["ลำตัวตรงเส้นเดียวตั้งแต่หัวถึงส้นเท้า", "ยกตัวขึ้นจากพื้น ห้ามนอนราบ", "ข้อศอกอยู่ใต้ไหล่พอดี", "หายใจตามปกติ อย่ากลั้นหายใจ"],
    lunge: ["ก้าวขาไปข้างหน้า 1 ก้าวยาว", "สะโพกลงใกล้ระดับเข่า", "เข่าหน้าทำมุม 90° เข่าหลังเกือบถึงพื้น", "ลำตัวตั้งตรง ไม่เอนไปข้างหน้า"],
    situp: ["นอนหงาย งอเข่าให้มากพอ", "ใช้กล้ามเนื้อหน้าท้องยกตัวขึ้น ห้ามดึงคอ", "ข้อศอกไม่ยื่นหน้าหัว", "หายใจออกตอนขึ้น"],
    jumpingjack: ["กระโดดกางทั้งแขนและขาพร้อมกัน", "ขาต้องกางออก ไม่ใช่แค่ยกแขน", "แขน 2 ข้างกางออกเท่าๆ กัน", "รักษาจังหวะสม่ำเสมอ"],
  };
  const cameraPos = {
    pushup: { pos: "ด้านข้าง", icon: "📷➡️🤸", detail: "วางกล้องด้านข้างลำตัว เห็นทั้งหัว-เท้า" },
    squat: { pos: "เฉียง 45°", icon: "📷↗️🦵", detail: "วางกล้องเฉียง 45° ด้านหน้า" },
    plank: { pos: "ด้านข้าง", icon: "📷➡️🧘", detail: "วางกล้องด้านข้าง ให้เห็นว่ายกตัวขึ้น" },
    lunge: { pos: "เฉียง 45°", icon: "📷↗️🏃", detail: "วางกล้องเฉียงด้านหน้า" },
    situp: { pos: "ด้านข้าง", icon: "📷➡️🧑‍🦿", detail: "วางกล้องด้านข้าง เห็นลำตัวขึ้น-ลง" },
    jumpingjack: { pos: "ด้านหน้า", icon: "📷⬆️⭐", detail: "วางกล้องตรงด้านหน้า ให้เห็นขากาง" },
  };
  const icons = { pushup: "🤸", squat: "🦵", plank: "🧘", lunge: "🏃", situp: "🧑\u200d🦿", jumpingjack: "⭐" };
  const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };
  const cam = cameraPos[exercise] || cameraPos.pushup;

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  FORM CHECK</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>WATCH &<br /><span style={{ color: "#00ff88" }}>LEARN</span></h1>
      </div>
      <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ background: "#060810", padding: "12px", borderBottom: "1px solid #00ff8822", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "2px" }}>
          {icons[exercise]} {names[exercise] || exercise.toUpperCase()} DEMO
        </div>
        <div style={{ padding: "32px", textAlign: "center", fontSize: "80px", lineHeight: 1 }}>{icons[exercise]}</div>
        <div style={{ padding: "20px" }}>
          <ul style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffffbb", lineHeight: 1.8, paddingLeft: "20px", margin: 0 }}>
            {(tips[exercise] || []).map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
      {/* Camera Position Guide */}
      <div style={{ background: "#0a0a1a", border: "1px solid #ffd70044", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ffd70099", marginBottom: "12px" }}>📷  CAMERA SETUP</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "32px", flexShrink: 0 }}>{cam.icon}</div>
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "16px", fontWeight: 700, color: "#ffd700" }}>📍 {cam.pos}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff88", marginTop: "4px" }}>{cam.detail}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["ห่าง 1.5-2 เมตร", "ระดับเอว", "เห็นทั้งตัว"].map(t => (
            <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", padding: "4px 10px", background: "#ffd70011", border: "1px solid #ffd70033", borderRadius: "20px", color: "#ffd70099" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        <GlowButton onClick={onNext} style={{ width: "100%" }}>I'M READY ⚡</GlowButton>
        <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← BACK</GlowButton>
      </div>
    </div>
  );
}

// [หน้า Camera Guide] หน้าแนะนำการตั้งกล้องให้ user ก่อนเริ่มออกกำลัง
function PageCameraGuide({ exercise, onNext, onBack }) {
  const guides = {
    pushup: {
      position: "ด้านข้าง (Side View)",
      icon: "📷",
      diagram: "🤸 ← 📷",
      distance: "1.5 - 2 เมตร",
      height: "ระดับเอว (40-60 cm)",
      reason: "AI ต้องเห็นลำตัว-แขน-ขาจากด้านข้าง เพื่อตรวจมุมข้อศอกและความตรงของหลัง",
      checkpoints: ["เห็นหัวจรดเท้า", "เห็นข้อศอกงอชัดเจน", "เห็นลำตัวตรงหรือค่อม"],
      wrongWays: ["❌ ด้านหน้า: จะเห็นแขนซ้อนกัน วัดมุมไม่ได้", "❌ ใกล้เกินไป: ไม่เห็นเท้า"],
    },
    squat: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "📷",
      diagram: "📷 ↗️ 🦵",
      distance: "2 - 2.5 เมตร",
      height: "ระดับเอว (60-80 cm)",
      reason: "AI ต้องเห็นเข่า-สะโพก-ข้อเท้าเพื่อตรวจว่าสะโพกลงจริงและเข่าไม่พับเข้า",
      checkpoints: ["เห็นหัวจรดเท้า", "เห็นเข่าทั้ง 2 ข้าง", "เห็นสะโพกลงใกล้เข่า"],
      wrongWays: ["❌ ด้านหลัง: ไม่เห็นเข่า", "❌ บนลงล่าง: วัดความลึกไม่ได้"],
    },
    plank: {
      position: "ด้านข้าง (Side View)",
      icon: "📷",
      diagram: "🧘 ← 📷",
      distance: "2 - 2.5 เมตร",
      height: "ระดับพื้น (20-40 cm)",
      reason: "AI ต้องเห็นว่าตัวยกขึ้นจากพื้น ลำตัวตรง และข้อศอกอยู่ใต้ไหล่",
      checkpoints: ["เห็นตั้งแต่หัวถึงเท้า", "เห็นว่าตัวไม่ติดพื้น", "เห็นข้อศอกวางตรงไหล่"],
      wrongWays: ["❌ ด้านบน: ดูเหมือนนอนราบ แยกไม่ออก", "❌ ด้านหน้า: ไม่เห็นลำตัวตรง/ค่อม"],
    },
    lunge: {
      position: "เฉียง 45° (Front-Angle View)",
      icon: "📷",
      diagram: "📷 ↗️ 🏃",
      distance: "2 - 2.5 เมตร",
      height: "ระดับเอว (60-80 cm)",
      reason: "AI ต้องเห็นขาหน้า-ขาหลังและสะโพกเพื่อตรวจมุมเข่าและความตรงของลำตัว",
      checkpoints: ["เห็นขาทั้ง 2 ข้าง", "เห็นลำตัวตั้งตรง", "เห็นสะโพกลง"],
      wrongWays: ["❌ ด้านหลัง: ไม่เห็นเข่าหน้า", "❌ ใกล้เกินไป: ไม่เห็นเท้า"],
    },
    situp: {
      position: "ด้านข้าง (Side View)",
      icon: "📷",
      diagram: "🧑‍🦿 ← 📷",
      distance: "1.5 - 2 เมตร",
      height: "ระดับพื้น (30-50 cm)",
      reason: "AI ต้องเห็นหลังยกขึ้น-ลง และตรวจว่าเข่างอและไม่ดึงคอ",
      checkpoints: ["เห็นลำตัวยกขึ้นจากพื้น", "เห็นเข่างอ", "เห็นข้อศอกชัดเจน"],
      wrongWays: ["❌ ด้านหน้า: ไม่เห็นมุมขึ้น-ลง", "❌ ไกลเกินไป: เห็นข้อต่อไม่ชัด"],
    },
    jumpingjack: {
      position: "ด้านหน้า (Front View)",
      icon: "📷",
      diagram: "📷 → ⭐",
      distance: "2 - 3 เมตร",
      height: "ระดับเอว (60-80 cm)",
      reason: "AI ต้องเห็นขา 2 ข้างกางออกและแขน 2 ข้างยกขึ้น เพื่อยืนยันว่าทำท่าครบ",
      checkpoints: ["เห็นทั้งตัวชัดเจน", "เห็นขากาง-ชิดได้ชัด", "เห็นแขน 2 ข้างยกขึ้น"],
      wrongWays: ["❌ ด้านข้าง: จะเห็นขาซ้อนกัน วัดการกางไม่ได้", "❌ ใกล้เกิน: กระโดดแล้วหลุดกรอบ"],
    },
  };
  const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };
  const g = guides[exercise] || guides.pushup;

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#ffd70066", marginBottom: "12px" }}>//  CAMERA SETUP GUIDE</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>SET UP<br /><span style={{ color: "#ffd700" }}>YOUR CAMERA</span></h1>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff55", marginTop: "12px", lineHeight: 1.8 }}>
          ตั้งกล้องให้ถูกตำแหน่ง AI จะตรวจจับท่าได้แม่นยำ 100%
        </p>
      </div>

      {/* Recommended Position */}
      <div style={{ background: "#0a0a1a", border: "1px solid #ffd70044", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ background: "#0d0d1f", padding: "12px 16px", borderBottom: "1px solid #ffd70033", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffd700", letterSpacing: "2px" }}>
          ✅ ตำแหน่งที่แนะนำ — {names[exercise]}
        </div>
        <div style={{ padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px", letterSpacing: "16px" }}>{g.diagram}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#ffd700", marginBottom: "8px" }}>{g.position}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff77", lineHeight: 1.8 }}>{g.reason}</div>
        </div>
        <div style={{ display: "flex", gap: "12px", padding: "0 24px 20px", justifyContent: "center" }}>
          {[["📏", g.distance], ["📐", g.height]].map(([icon, val]) => (
            <div key={val} style={{ background: "#ffd70011", border: "1px solid #ffd70033", borderRadius: "6px", padding: "10px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: 700, color: "#ffd700" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkpoints */}
      <div style={{ background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", marginBottom: "12px" }}>✅ AI ต้องเห็นอะไรบ้าง</div>
        {g.checkpoints.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffffbb" }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Wrong positions */}
      <div style={{ background: "#1a0d0d", border: "1px solid #ff336633", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ff336699", marginBottom: "12px" }}>⚠️ ตำแหน่งที่ไม่ควรใช้</div>
        {g.wrongWays.map((w, i) => (
          <div key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ff668899", marginBottom: "6px", lineHeight: 1.6 }}>{w}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <GlowButton onClick={onNext} style={{ width: "100%" }}>📷 ตั้งกล้องเรียบร้อย →</GlowButton>
        <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← กลับ</GlowButton>
      </div>
    </div>
  );
}


// [หน้า 4.5] หน้าสรุปผลหลังออกกำลัง พร้อมแคลอรี่ + บันทึกประวัติ
function PageSummary({ result, stats, onPlayAgain, onBack }) {
  const icons = { pushup: "🤸", squat: "🦵", plank: "🧘", lunge: "🏃" };
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
        <div style={{ fontSize: "72px", marginBottom: "16px" }}>🏆</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  SESSION COMPLETE</div>
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
        <div style={{ fontSize: "36px" }}>🔥</div>
        <div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "28px", fontWeight: 700, color: "#ffd700" }}>{result.calories} kcal</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff55", marginTop: "4px" }}>ประมาณการแคลอรี่ที่เผาผลาญ</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <GlowButton onClick={onPlayAgain} style={{ width: "100%" }}>⚡ ออกกำลังท่าอื่น</GlowButton>
        <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%" }}>← กลับแผนวันนี้</GlowButton>
      </div>
    </div>
  );
}

// [หน้า H] หน้าประวัติการออกกำลัง
function PageHistory({ onBack, stats }) {
  const [history, setHistory] = useState(() => loadLS(LS_HISTORY, []));
  const icons = { pushup: "🤸", squat: "🦵", plank: "🧘", lunge: "🏃", situp: "🧑‍🦿", jumpingjack: "⭐" };
  const names = { pushup: "PUSH-UP", squat: "SQUAT", plank: "PLANK", lunge: "LUNGE", situp: "SIT-UP", jumpingjack: "JUMPING JACK" };

  const clearHistory = () => { saveLS(LS_HISTORY, []); setHistory([]); };

  const totalCal = history.reduce((s, h) => s + (h.calories || 0), 0);
  const totalSessions = history.length;

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00bfff66", marginBottom: "12px" }}>//  WORKOUT HISTORY</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>YOUR<br /><span style={{ color: "#00bfff" }}>JOURNEY</span></h1>
      </div>
      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {[["🏋️ SESSIONS", totalSessions], ["🔥 TOTAL KCAL", totalCal]].map(([k, v]) => (
          <div key={k} style={{ background: "#0d1a0d", border: "1px solid #00bfff22", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "24px", fontWeight: 700, color: "#00bfff" }}>{v}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{k}</div>
          </div>
        ))}
      </div>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", color: "#ffffff33", fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 2 }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
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
                <div style={{ fontSize: "28px", flexShrink: 0 }}>{icons[h.exercise] || "💪"}</div>
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
          {history.length > 0 && <GlowButton variant="danger" onClick={clearHistory} style={{ flex: 1 }}>🗑 ล้างประวัติ</GlowButton>}
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
            📤 EXPORT ข้อมูล
          </button>
          <label
            style={{ flex: 1, padding: "12px", background: "#0d1a0d", border: "1px solid #00bfff44", borderRadius: "4px", color: "#00bfff", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, cursor: "pointer", letterSpacing: "1px", textAlign: "center" }}
          >
            📥 IMPORT ข้อมูล
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
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#a855f766", marginBottom: "12px" }}>//  DASHBOARD</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>YOUR<br /><span style={{ color: "#a855f7" }}>PROGRESS</span></h1>
      </div>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
        {[["🏋️", totalSessions, "SESSIONS"], ["🔥", totalCal, "TOTAL KCAL"], ["⚡", streak, "DAY STREAK"]].map(([icon, val, label]) => (
          <div key={label} style={{ background: "#0d1a0d", border: "1px solid #a855f722", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "22px", fontWeight: 700, color: "#a855f7" }}>{val}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>
      {/* Weekly chart */}
      <div style={{ background: "#0d1a0d", border: "1px solid #a855f722", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
        <div style={{ background: "#060810", padding: "12px", borderBottom: "1px solid #a855f722", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#a855f7", letterSpacing: "2px" }}>📊 WEEKLY CALORIES</div>
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
    idle: { icon: "📷", title: "ขออนุญาตใช้กล้อง", desc: "The Adaptable Shadow ต้องการเข้าถึงกล้องเพื่อตรวจจับท่าออกกำลังกาย Real-time\n\nข้อมูลภาพประมวลผลในเครื่องเท่านั้น", cta: "อนุญาตและเปิดกล้อง", ctaVariant: "primary" },
    requesting: { icon: "⏳", title: "กำลังขอสิทธิ์...", desc: "โปรดกด 'อนุญาต' ในป๊อปอัปของเบราว์เซอร์", cta: null },
    denied: { icon: "🚫", title: "ถูกปฏิเสธสิทธิ์", desc: "วิธีแก้:\n1. คลิกไอคอน 🔒 ในแถบ URL\n2. เปลี่ยนกล้องเป็น 'อนุญาต'\n3. รีเฟรชแล้วลองใหม่", cta: "ลองใหม่อีกครั้ง", ctaVariant: "ghost" },
    error: { icon: "⚠️", title: "ไม่พบกล้อง", desc: "ตรวจสอบว่าเครื่องมีกล้องและไม่มีแอปอื่นใช้งานอยู่", cta: "ลองใหม่", ctaVariant: "ghost" },
  };
  const ui = statusUI[status];
  return (
    <div style={{ maxWidth: "460px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  CAMERA ACCESS</div>
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
            {["🔒 ประมวลผลในเครื่อง", "🚫 ไม่บันทึกวิดีโอ", "⚡ Real-time AI"].map(t => (
              <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", padding: "5px 10px", background: "#060810", border: "1px solid #00ff8833", borderRadius: "20px", color: "#00ff8899" }}>{t}</span>
            ))}
          </div>
        )}
        {ui.cta && <GlowButton onClick={requestCamera} variant={ui.ctaVariant} style={{ width: "100%" }}>{status === "denied" || status === "error" ? "🔄 " : ""}{ui.cta}</GlowButton>}
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
          ctx2d.fillText("◆ AI BODY SCAN ACTIVE", 20, 26);
          ctx2d.fillStyle = results.poseLandmarks ? "#00ff88" : "#ff9800";
          ctx2d.font = "11px 'Space Mono',monospace";
          ctx2d.fillText(results.poseLandmarks ? `✓ POSE DETECTED — ${results.poseLandmarks.length} JOINTS` : "⟳ SCANNING...", 20, 50);
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
            <div style={{ fontSize: "48px" }}>📷</div>
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
            {poseDetected ? `✓ พบ ${jointCount} จุดข้อต่อ — พร้อมแล้ว!` : "⟳ ตั้งตัวให้ AI มองเห็นร่างกายทั้งหมด"}
          </div>
          <div style={{ height: "3px", background: "#0d1a0d", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: poseDetected ? "100%" : "40%", background: poseDetected ? "#00ff88" : "#ff9800", transition: "all 0.6s ease", boxShadow: poseDetected ? "0 0 8px #00ff88" : "none" }} />
          </div>
        </div>
        <GlowButton onClick={onStart} style={{ flexShrink: 0, padding: "12px 24px" }}>⚡ เริ่มออกกำลัง</GlowButton>
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
    let ang = 0, ok = true, fb = "✓ Good!";
    try {
      if (exercise === "pushup") {
        const shoulder = lm(landmarks, LM.L_SHOULDER), elbow = lm(landmarks, LM.L_ELBOW), wrist = lm(landmarks, LM.L_WRIST), hip = lm(landmarks, LM.L_HIP), ankle = lm(landmarks, LM.L_ANKLE);
        ang = calcAngle(shoulder, elbow, wrist);
        const bodyAng = calcAngle(shoulder, hip, ankle);
        // MULTI-JOINT: มือ(wrist)ต้องอยู่ต่ำกว่าไหล่(shoulder) → ยืนยันว่ากำลัง push-up จริง ไม่ใช่ยืนกางแขน
        const wristBelowShoulder = wrist[1] > shoulder[1] + 0.05;
        // MULTI-JOINT: ลำตัวต้องตรง
        const bodyOk = Math.abs(bodyAng - 180) <= 15;
        if (!wristBelowShoulder) { ok = false; fb = "⚠ ลงไปท่า Push-up! มือต้องอยู่บนพื้น"; Sound.error(); }
        else if (!bodyOk) { ok = false; fb = "⚠ หลังค่อม! ขึงลำตัวให้ตรง"; Sound.error(); }
        else if (ang < 70 && ang > 40) { fb = "✓ Perfect Form!"; }
        else if (ang >= 70 && ang <= 160) { fb = "↓ ลงให้ลึกกว่านี้!"; }
        else { fb = "✓ Perfect Form!"; }
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
        const label = exercise === "squat" ? "✓ Solid Squat!" : "✓ Good Lunge!";
        // MULTI-JOINT: สะโพก(hip)ต้องลงใกล้ระดับเข่า(knee) → ยืนยันว่า squat จริง ไม่ใช่แค่ก้มตัว
        const hipDropped = hip[1] > knee[1] - 0.15;
        // MULTI-JOINT: เข่าตรงกับข้อเท้า
        const kneeAligned = Math.abs(knee[0] - ankle[0]) <= 0.07;
        // MULTI-JOINT: ลำตัวตั้งตรง
        const torsoUpright = Math.abs(shoulder[0] - hip[0]) <= 0.08;
        if (ang < 90 && !hipDropped) { ok = false; fb = "⚠ ย่อลงให้ลึกกว่านี้! สะโพกต้องลง"; Sound.error(); }
        else if (!kneeAligned) { ok = false; fb = exercise === "squat" ? "⚠ เข่าพับเข้า! เปิดเข่าออก" : "⚠ คุม balance ด้วย"; Sound.error(); }
        else if (!torsoUpright) { ok = false; fb = "⚠ ลำตัวเอน! ตั้งตัวให้ตรง"; Sound.error(); }
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
        if (kneeAng > 120) { ok = false; fb = "⚠ งอเข่าให้มากกว่านี้!"; Sound.error(); }
        else if (Math.abs(elbow[1] - shoulder[1]) > 0.15 && ang < 90) { ok = false; fb = "⚠ อย่าดึงคอ! ใช้หน้าท้องยกตัว"; Sound.error(); }
        else { fb = ang > 140 ? "✓ ลงไป! เตรียมขึ้น" : ang < 70 ? "✓ ขึ้นมาแล้ว! ดีมาก" : "✓ Good Form!"; }
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
        if (!armsSymmetric) { ok = false; fb = "⚠ กางแขนให้เท่ากัน!"; Sound.error(); }
        else if (!torsoUpright) { ok = false; fb = "⚠ ตั้งตัวตรง!"; Sound.error(); }
        else if (ang > 140 && !legsSpread) { ok = false; fb = "⚠ กางขาออกด้วย! ไม่ใช่แค่แขน"; Sound.error(); }
        else { fb = ang > 140 && legsSpread ? "✓ กางแขน+ขาออก!" : ang < 40 ? "✓ หุบแขน+ขา!" : "✓ Keep Going!"; }
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
        if (!hipElevated) { fb = "⚠ ยกตัวขึ้น! ห้ามนอนราบ"; }
        else if (!elbowOk) { fb = "⚠ ข้อศอกต้องอยู่ใต้ไหล่!"; }
        else if (ang < 165) { fb = "⚠ สะโพกสูงเกิน! ลดลงมา"; }
        else if (ang > 195) { fb = "⚠ สะโพกตก! ยกขึ้นนิด"; }
        else { fb = "✓ Hold it! ค้างไว้"; }
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
          fb = "⚠ หยุดนับ! คืน form แล้ว hold ต่อ";
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
    ctx2d.fillStyle = ok ? "rgba(0,255,136,0.12)" : "rgba(255,51,102,0.18)"; ctx2d.fillRect(0, H - 56, W, 56);
    ctx2d.strokeStyle = ok ? "#00ff8844" : "#ff336644"; ctx2d.lineWidth = 1; ctx2d.beginPath(); ctx2d.moveTo(0, H - 56); ctx2d.lineTo(W, H - 56); ctx2d.stroke();
    ctx2d.fillStyle = ok ? "#00ff88" : "#ff4466"; ctx2d.font = "bold 18px 'Space Mono',monospace"; ctx2d.fillText(fb, 20, H - 20);
    const m = Math.floor(el / 60), s = el % 60, tStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    ctx2d.fillStyle = "#ffffff33"; ctx2d.font = "12px 'Space Mono',monospace"; ctx2d.fillText(tStr, W / 2 - ctx2d.measureText(tStr).width / 2, H - 20);
  }

  const mins = Math.floor(elapsed / 60), secs = elapsed % 60;
  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#060810", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%", flex: 1 }}>
        <video ref={videoRef} style={{ position: "absolute", opacity: 0, width: "1px", height: "1px" }} playsInline muted />
        <canvas ref={canvasRef} width={1280} height={720} style={{ width: "100%", height: "auto", display: "block", maxHeight: "calc(100vh - 120px)" }} />
        {!mediapipeReady && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.9)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><div style={{ width: "40px", height: "40px", border: "3px solid #00ff8833", borderTop: "3px solid #00ff88", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }} /><p style={{ fontFamily: "'Space Mono',monospace", color: "#00ff88", fontSize: "12px" }}>Loading MediaPipe...</p></div>}
        {cameraErr && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: "48px", marginBottom: "16px" }}>📷</div><p style={{ fontFamily: "'Space Mono',monospace", color: "#ff4466", fontSize: "13px", lineHeight: 1.8 }}>{cameraErr}</p><GlowButton variant="ghost" onClick={() => window.location.reload()} style={{ marginTop: "24px" }}>RELOAD</GlowButton></div></div>}
        {isResting && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.88)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#ffffff44", marginBottom: "16px" }}>//  REST TIME</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "96px", fontWeight: 700, color: "#00ff88", lineHeight: 1 }}>{restCountdown}</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "14px", color: "#ffffff66", marginTop: "16px" }}>SET {setNum} COMING UP</div><div style={{ marginTop: "32px", background: "#0d1a0d", border: "1px solid #00ff8833", borderRadius: "4px", padding: "16px 32px" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#00ff8899", letterSpacing: "2px" }}>COMPLETED SETS</div><div style={{ display: "flex", gap: "8px", marginTop: "8px", justifyContent: "center" }}>{Array.from({ length: exPlan.sets }).map((_, i) => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: i < setNum - 1 ? "#00ff88" : "#1a2a1a", boxShadow: i < setNum - 1 ? "0 0 8px #00ff88" : "none" }} />)}</div></div></div>}
        {done && <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "32px" }}><div style={{ fontSize: "64px", marginBottom: "24px" }}>🏆</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  SESSION COMPLETE</div><h2 style={{ fontFamily: "'Space Mono',monospace", color: "#ffffff", fontSize: "28px", fontWeight: 700, margin: "0 0 32px", textAlign: "center" }}>MISSION<br /><span style={{ color: "#00ff88" }}>ACCOMPLISHED</span></h2><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "32px", width: "100%", maxWidth: "360px" }}>{[["EXERCISE", exercise.toUpperCase()], ["SETS", `${exPlan.sets}×${exPlan.reps}`], ["TIME", `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`]].map(([k, v]) => <div key={k} style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "16px", textAlign: "center" }}><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", fontWeight: 700, color: "#00ff88" }}>{v}</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", color: "#ffffff44", letterSpacing: "1px", marginTop: "4px" }}>{k}</div></div>)}</div><GlowButton onClick={onFinish}>BACK TO PLAN</GlowButton></div>}
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
      if (currentUser) {
        // ถ้าล็อกอินแล้ว ให้ลองดึงข้อมูลจาก Cloud มาทับ (ถ้ามี)
        const cloudData = await loadUserData(currentUser.uid);
        if (cloudData) {
          if (cloudData.stats) { setStats(cloudData.stats); saveLS(LS_STATS, cloudData.stats); }
          if (cloudData.ctx) { setCtx(cloudData.ctx); saveLS(LS_CTX, cloudData.ctx); }
          if (cloudData.history) { saveLS(LS_HISTORY, cloudData.history); } // เซฟลง LS ไปก่อน หน้า History ค่อยดึง
        } else {
          // ถ้าเป็น user ใหม่บน Cloud ให้เอาของ Local ไปเซฟบน Cloud เลย
          syncToCloud(currentUser.uid, stats, ctx, loadLS(LS_HISTORY, []));
        }
      }
    });
    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const syncToCloud = async (uid, s, c, h) => {
    if (!uid) return;
    try { await saveUserData(uid, { stats: s, ctx: c, history: h }); } catch (e) { console.warn("Cloud sync failed:", e); }
  };

  const handleLogin = async () => {
    try { await loginWithGoogle(); } catch (e) { alert("Login failed: " + e.message); }
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
    <div style={{ minHeight: "100vh", background: "#000000", color: "#ffffff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}body{background:#000000;}
        input[type=range]{-webkit-appearance:none;appearance:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:#00ff88;border-radius:50%;box-shadow:0 0 10px #00ff88;cursor:pointer;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#000000;}::-webkit-scrollbar-thumb{background:#00ff8844;border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeIn 0.4s ease forwards}
      `}</style>
      <Scanline />
      {!hideHeader && (
        <div style={{ borderBottom: "1px solid #00ff8811", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: "3px", color: "#00ff88", fontWeight: 700 }}>◆ THE ADAPTABLE SHADOW <span style={{ fontSize: '8px', opacity: 0.5 }}>[v2.1 - DIRECT AI]</span></div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* User Login Section */}
            {user ? (
              <button
                onClick={handleLogout}
                style={{ background: "#060810", border: "1px solid #00ff8844", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "10px", color: "#00ff88", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img src={user.photoURL} alt="profile" style={{ width: "16px", height: "16px", borderRadius: "50%" }} referrerPolicy="no-referrer" />
                {user.displayName?.split(" ")[0]}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                style={{ background: "linear-gradient(135deg, #00ff8833, #00cc6a22)", border: "2px solid #00ff88", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: 700, color: "#00ff88", transition: "all 0.25s", boxShadow: "0 0 15px #00ff8844", letterSpacing: "1px" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 25px #00ff8866'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 15px #00ff8844'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                ☁️ สมัครสมาชิก
              </button>
            )}

            <button
              onClick={() => { _soundEnabled = !_soundEnabled; setSoundEnabled(_soundEnabled); }}
              style={{ background: "none", border: `1px solid ${soundEnabled ? "#00ff8844" : "#ffffff22"}`, borderRadius: "4px", padding: "4px 10px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: soundEnabled ? "#00ff88" : "#ffffff44", transition: "all 0.2s" }}
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              {["profile", "context", "plan"].map((p, i) => (
                <div key={p} style={{ width: "8px", height: "8px", borderRadius: "50%", background: page === p ? "#00ff88" : ["profile", "context", "plan", "planning"].indexOf(page) > i ? "#00ff8844" : "#1a2a1a", boxShadow: page === p ? "0 0 8px #00ff88" : "none" }} />
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
  );
}