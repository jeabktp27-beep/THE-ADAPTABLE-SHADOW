import { useState, useEffect, useRef, useCallback } from "react";

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

// ฟังก์ชันเรียกขอแผนออกกำลังกายจาก Gemini ผ่าน Backend (server.js)
async function fetchAIPlan(stats, ctx) {
  const bmi = (stats.weight / (stats.height / 100) ** 2).toFixed(1);
  const prompt = `คุณคือ AI Personal Trainer ชื่อ "The Adaptable Shadow"
ตอบกลับเป็น JSON เท่านั้น ไม่มีข้อความอื่นนอกจาก JSON บริสุทธิ์
ข้อมูลผู้ใช้: น้ำหนัก ${stats.weight}kg, ส่วนสูง ${stats.height}cm, ไขมัน ${stats.bodyFat}%, BMI ${bmi}
บริบท: ตารางงาน="${ctx.calendar}", เหนื่อยล้า ${ctx.fatigue}/10, สถานที่="${ctx.location}", อากาศ="${ctx.weather}"
กฎการตัดสิน:
- เหนื่อยล้า>=7 หรือมีคำว่า ประชุม/ยุ่ง/งานเร่ง → mode="micro" (แค่ sets 2 reps 8-10)
- เหนื่อยล้า 4-6 → mode="moderate" (sets 3 reps 12-15)
- เหนื่อยล้า 1-3 และว่าง → mode="full" (sets 4 reps 20+)
- ไขมัน<18% → reps+20% / ไขมัน>25% → reps-15%
ตอบ JSON เท่านั้น ห้ามมี markdown backtick:
{"mode":"micro","message":"ข้อความ trainer 1-2 ประโยคภาษาไทย","motivation":"ประโยคกระตุ้นใจ","pushup":{"sets":2,"reps":10,"rest_sec":45},"squat":{"sets":2,"reps":12,"rest_sec":45},"form_tip":"เคล็ดลับ form 1 ข้อ","estimated_duration_min":8}`;

  const res = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  let text = data.content?.[0]?.text || "";
  // ดึงเฉพาะส่วน JSON ออกมา
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI ตอบกลับไม่ถูกต้อง");
  const plan = JSON.parse(match[0]);
  // ใส่ค่า default ถ้า Gemini ตอบไม่ครบ
  if (!plan.pushup) plan.pushup = { sets: 2, reps: 10, rest_sec: 45 };
  if (!plan.squat) plan.squat = { sets: 2, reps: 12, rest_sec: 45 };
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
    primary: { bg: "#00ff88", color: "#060810", shadow: "0 0 24px #00ff8866" },
    ghost: { bg: "transparent", color: "#00ff88", shadow: "0 0 0 1px #00ff8844", border: "1px solid #00ff8844" },
    danger: { bg: "#ff3366", color: "#fff", shadow: "0 0 24px #ff336666" },
  };
  const c = colors[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: "14px 32px", fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", border: c.border || "none", borderRadius: "4px", background: c.bg, color: c.color, boxShadow: c.shadow, opacity: disabled ? 0.4 : 1, transition: "all 0.2s", ...style }}>
      {children}
    </button>
  );
}

function StatInput({ label, value, onChange, min, max, step = 1, unit }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#00ff8899", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "18px", color: "#00ff88", fontWeight: 700 }}>{value}<span style={{ fontSize: "12px", color: "#ffffff66", marginLeft: "4px" }}>{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", height: "4px", appearance: "none", background: `linear-gradient(to right,#00ff88 0%,#00ff88 ${((value - min) / (max - min)) * 100}%,#1a2a1a ${((value - min) / (max - min)) * 100}%,#1a2a1a 100%)`, borderRadius: "2px", cursor: "pointer", outline: "none" }} />
      <style>{`input[type=range]::-webkit-slider-thumb{appearance:none;width:16px;height:16px;background:#00ff88;border-radius:50%;box-shadow:0 0 10px #00ff88;cursor:pointer}`}</style>
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
function PageProfile({ stats, setStats, onNext }) {
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  STEP 01 — BODY STATS</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>WHO ARE<br /><span style={{ color: "#00ff88" }}>YOU?</span></h1>
        <p style={{ color: "#ffffff55", fontFamily: "'Space Mono',monospace", fontSize: "12px", marginTop: "16px", lineHeight: 1.8 }}>ข้อมูลนี้จะส่งให้ AI วิเคราะห์<br />เพื่อออกแบบโปรแกรมเฉพาะตัวคุณ</p>
      </div>
      <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "32px" }}>
        <StatInput label="น้ำหนัก" value={stats.weight} onChange={v => setStats(s => ({ ...s, weight: v }))} min={40} max={150} step={0.5} unit="kg" />
        <StatInput label="ส่วนสูง" value={stats.height} onChange={v => setStats(s => ({ ...s, height: v }))} min={140} max={220} unit="cm" />
        <StatInput label="ไขมันในร่างกาย" value={stats.bodyFat} onChange={v => setStats(s => ({ ...s, bodyFat: v }))} min={5} max={50} step={0.5} unit="%" />
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
      <div style={{ marginTop: "32px", textAlign: "right" }}><GlowButton onClick={onNext}>NEXT →</GlowButton></div>
    </div>
  );
}

// [หน้า 2] สอบถามบริบทย่อยของวันนี้ (ตารางงาน ความเหนื่อยล้า สถานที่)
function PageContext({ ctx, setCtx, onBack, onAnalyze, loading, error }) {
  const fatigueLabels = ["", "ยอดเยี่ยม", "ดีมาก", "ดี", "ปกติ", "เริ่มเหนื่อย", "เหนื่อย", "เหนื่อยมาก", "หมดแรง", "แย่มาก", "หมดสภาพ"];
  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  STEP 02 — TODAY'S CONTEXT</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>HOW'S<br /><span style={{ color: "#00ff88" }}>TODAY?</span></h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", padding: "24px" }}>
          <StatInput label={`ความเหนื่อยล้า — ${fatigueLabels[ctx.fatigue]}`} value={ctx.fatigue} onChange={v => setCtx(c => ({ ...c, fatigue: v }))} min={1} max={10} unit="/10" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            {["micro", "moderate", "moderate", "moderate", "moderate", "moderate", "tired", "tired", "rest", "rest"].map((mode, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: ctx.fatigue === i + 1 ? "#00ff88" : mode === "rest" ? "#ff336633" : mode === "tired" ? "#ff980033" : "#00ff8822" }} />
            ))}
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
        <GlowButton variant="ghost" onClick={onBack}>← BACK</GlowButton>
        <GlowButton onClick={onAnalyze} disabled={loading}>{loading ? "ANALYZING..." : "ANALYZE ⚡"}</GlowButton>
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
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866" }}>//  AI ANALYZING</div>
      <h2 style={{ fontFamily: "'Space Mono',monospace", color: "#ffffff", fontSize: "24px", margin: "16px 0" }}>THE SHADOW IS THINKING{".".repeat(dots)}</h2>
      <p style={{ color: "#ffffff44", fontFamily: "'Space Mono',monospace", fontSize: "12px", maxWidth: "300px", lineHeight: 1.8 }}>กำลังวิเคราะห์ข้อมูลร่างกายและบริบทชีวิตของคุณ</p>
    </div>
  );
}

// [หน้า 3] หน้าสรุปแผน พร้อมปุ่มเพิ่มลง Google Calendar และให้ผู้ใช้เริ่มออกกำลัง
function PagePlan({ plan, onStart, onBack }) {
  const modeColors = { micro: "#ff9800", moderate: "#00bfff", full: "#00ff88" };
  const color = modeColors[plan.mode] || "#00ff88";

  const getCalendarUrl = () => {
    const title = encodeURIComponent(`The Adaptable Shadow: ${plan.mode.toUpperCase()} WORKOUT`);
    const details = encodeURIComponent(`ตารางวันนี้:\n${plan.message}\nPush-up: ${plan.pushup.sets}x${plan.pushup.reps}\nSquat: ${plan.squat.sets}x${plan.squat.reps}`);
    const now = new Date();
    const startObj = new Date(now.getTime() + 10 * 60000); // +10 mins from now
    const endObj = new Date(startObj.getTime() + (plan.estimated_duration_min * 60000));
    const start = startObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = endObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          <ModeChip mode={plan.mode} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", letterSpacing: "2px" }}>{plan.estimated_duration_min} MIN</span>
          <a href={getCalendarUrl()} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", textDecoration: "none", fontFamily: "'Space Mono',monospace", fontSize: "10px", padding: "6px 14px", background: "#1a2a1a", color: "#00ff88", borderRadius: "4px", border: "1px solid #00ff8844", display: "inline-block" }}>+ ADD TO CALENDAR</a>
        </div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0 }}>YOUR PLAN<br /><span style={{ color }}>IS READY</span></h1>
      </div>
      <div style={{ background: "#0d1a0d", border: `1px solid ${color}33`, borderLeft: `3px solid ${color}`, borderRadius: "4px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: `${color}99`, marginBottom: "8px" }}>//  AI TRAINER SAYS</div>
        <p style={{ color: "#ffffff", fontFamily: "'Space Mono',monospace", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>{plan.message}</p>
        <p style={{ color: color, fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 1.8, margin: "12px 0 0", fontStyle: "italic" }}>💪 {plan.motivation}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {[["pushup", "PUSH-UP", "🤸"], ["squat", "SQUAT", "🦵"]].map(([key, label, icon]) => (
          <div key={key} style={{ background: "#0d1a0d", border: `1px solid ${color}22`, borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: `${color}99`, marginBottom: "12px" }}>{label}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "32px", fontWeight: 700, color }}>{plan[key].sets}<span style={{ fontSize: "14px", color: "#ffffff66" }}>×</span>{plan[key].reps}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff44", marginTop: "6px" }}>REST {plan[key].rest_sec}s</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#060810", border: "1px solid #ffd70033", borderRadius: "4px", padding: "16px", marginBottom: "32px" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffd70099", letterSpacing: "2px" }}>📌 FORM TIP: </span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffd700" }}>{plan.form_tip}</span>
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "2px", color: "#ffffff44", marginBottom: "16px" }}>//  CHOOSE EXERCISE TO START</div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <GlowButton onClick={() => onStart("pushup")} style={{ flex: 1 }}>🤸 PUSH-UP</GlowButton>
        <GlowButton onClick={() => onStart("squat")} variant="ghost" style={{ flex: 1 }}>🦵 SQUAT</GlowButton>
      </div>
      <div style={{ marginTop: "16px" }}><GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← REPLAN</GlowButton></div>
    </div>
  );
}

// [หน้า 4] หน้าแสดงวิดีโอตัวอย่างท่าที่ถูกต้องให้ผู้ใช้ดูก่อน
function PageVideoTutorial({ exercise, onNext, onBack }) {
  const vidSrc = exercise === "pushup"
    ? "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder videos for now as real ones aren't available
    : "https://www.w3schools.com/html/mov_bbb.mp4";

  // Using direct placeholder videos. Recommend replacing these with real workout gifs/mp4 later.

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>//  FORM CHECK</div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(24px,4vw,34px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, margin: 0 }}>WATCH &<br /><span style={{ color: "#00ff88" }}>LEARN</span></h1>
      </div>
      <div style={{ background: "#0d1a0d", border: "1px solid #00ff8822", borderRadius: "8px", overflow: "hidden", marginBottom: "24px" }}>
        <div style={{ background: "#060810", padding: "12px", borderBottom: "1px solid #00ff8822", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#00ff88", letterSpacing: "2px" }}>
          ▶ {exercise.toUpperCase()} DEMO
        </div>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
          <video src={vidSrc} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
        </div>
        <div style={{ padding: "20px" }}>
          <ul style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#ffffffbb", lineHeight: 1.8, paddingLeft: "20px", margin: 0 }}>
            {exercise === "pushup" ? (
              <>
                <li>หลังและลำตัวต้องตรงเป็นแผ่นกระดาน</li>
                <li>ลงให้ลึกจนข้อศอกทำมุม 90 องศา</li>
                <li>ตาควรมองตรงไปข้างหน้าเล็กน้อย</li>
              </>
            ) : (
              <>
                <li>ทิ้งน้ำหนักลงที่ส้นเท้า</li>
                <li>ย่อลงจนต้นขาขนานกับพื้น</li>
                <li>ห้ามให้เข่าหุบเข้าหากัน</li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px" }}>
        <GlowButton onClick={onNext} style={{ width: "100%" }}>I'M READY ⚡</GlowButton>
        <GlowButton variant="ghost" onClick={onBack} style={{ width: "100%", opacity: 0.5 }}>← BACK</GlowButton>
      </div>
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: "user" } });
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

// [หน้า 6] พระเอกของงานระบบจับภาพสดด้วย MediaPipe นำข้อมูลข้อต่อส่งกลับมาประมวลผลมุมและองศา
function PageTracker({ exercise, plan, onFinish, mediapipeReady, initialStream }) {
  const videoRef = useRef(null), canvasRef = useRef(null), poseRef = useRef(null);
  const streamRef = useRef(initialStream || null), rafRef = useRef(null);
  const stageRef = useRef("up"), counterRef = useRef(0), setNumRef = useRef(1), restingRef = useRef(false);
  const [counter, setCounter] = useState(0), [setNum, setSetNum] = useState(1);
  const [angle, setAngle] = useState(0), [formOk, setFormOk] = useState(true);
  const [feedback, setFeedback] = useState("ตั้งตัวให้กล้องมองเห็น");
  const [isResting, setIsResting] = useState(false), [restCountdown, setRestCountdown] = useState(0);
  const [cameraErr, setCameraErr] = useState(null), [done, setDone] = useState(false);
  const [startTime] = useState(Date.now()), [elapsed, setElapsed] = useState(0);
  const exPlan = plan[exercise];

  useEffect(() => { const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000); return () => clearInterval(t); }, [startTime]);

  useEffect(() => {
    if (!mediapipeReady) return;
    let active = true;
    const init = async () => {
      try {
        let stream = streamRef.current;
        if (!stream) stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const p = new window.Pose({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${f}` });
        p.setOptions({ modelComplexity: 1, smoothLandmarks: true, enableSegmentation: false, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
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
    return () => { active = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); poseRef.current = null; };
  }, [mediapipeReady]);

  const handleResults = useCallback((results) => {
    const canvas = canvasRef.current, video = videoRef.current;
    if (!canvas || !video) return;
    const ctx2d = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
    ctx2d.save(); ctx2d.translate(W, 0); ctx2d.scale(-1, 1); ctx2d.drawImage(results.image, 0, 0, W, H); ctx2d.restore();
    if (!results.poseLandmarks) { setFeedback("ตั้งตัวให้กล้องมองเห็น"); drawHUD(ctx2d, W, H, counterRef.current, setNumRef.current, exPlan.reps, exPlan.sets, 0, true, "ตั้งตัวให้กล้องมองเห็น", stageRef.current, elapsed); return; }
    const landmarks = results.poseLandmarks;
    if (window.drawConnectors && window.POSE_CONNECTIONS) window.drawConnectors(ctx2d, landmarks, window.POSE_CONNECTIONS, { color: "#00ff8833", lineWidth: 2 });
    if (window.drawLandmarks) window.drawLandmarks(ctx2d, landmarks, { color: "#00ff88", lineWidth: 1, radius: 3 });
    let ang = 0, ok = true, fb = "✓ Good!";
    try {
      if (exercise === "pushup") {
        const shoulder = lm(landmarks, LM.L_SHOULDER), elbow = lm(landmarks, LM.L_ELBOW), wrist = lm(landmarks, LM.L_WRIST), hip = lm(landmarks, LM.L_HIP), ankle = lm(landmarks, LM.L_ANKLE);
        ang = calcAngle(shoulder, elbow, wrist);
        const bodyAng = calcAngle(shoulder, hip, ankle);
        if (Math.abs(bodyAng - 180) > 20) { ok = false; fb = "⚠ หลังค่อม! ขึงลำตัวให้ตรง"; } else fb = "✓ Perfect Form!";
      } else {
        const hip = lm(landmarks, LM.L_HIP), knee = lm(landmarks, LM.L_KNEE), ankle = lm(landmarks, LM.L_ANKLE);
        ang = calcAngle(hip, knee, ankle);
        if (Math.abs(knee[0] - ankle[0]) > 0.09) { ok = false; fb = "⚠ เข่าพับเข้า! เปิดเข่าออก"; } else fb = "✓ Solid Squat!";
      }
      setAngle(Math.round(ang)); setFormOk(ok); setFeedback(fb);
      const downThresh = exercise === "pushup" ? 70 : 90;
      if (ang > 160) { stageRef.current = "up"; }
      if (ang < downThresh && stageRef.current === "up" && ok) {
        stageRef.current = "down"; counterRef.current += 1; setCounter(counterRef.current);
        if (counterRef.current >= exPlan.reps) {
          if (setNumRef.current < exPlan.sets) {
            restingRef.current = true; setIsResting(true); counterRef.current = 0; setCounter(0); setNumRef.current += 1; setSetNum(setNumRef.current);
            let t = exPlan.rest_sec; setRestCountdown(t);
            const iv = setInterval(() => { t--; setRestCountdown(t); if (t <= 0) { clearInterval(iv); restingRef.current = false; setIsResting(false); stageRef.current = "up"; } }, 1000);
          } else { setDone(true); }
        }
      }
    } catch (_) { }
    drawHUD(ctx2d, W, H, counterRef.current, setNumRef.current, exPlan.reps, exPlan.sets, Math.round(ang), ok, fb, stageRef.current, elapsed);
  }, [exercise, exPlan, elapsed]);

  function drawHUD(ctx2d, W, H, cnt, sn, tr, ts, ang, ok, fb, stage, el) {
    ctx2d.fillStyle = "rgba(6,8,16,0.75)"; ctx2d.fillRect(0, 0, W, 70);
    ctx2d.fillStyle = "#00ff88"; ctx2d.font = "bold 13px 'Space Mono',monospace"; ctx2d.fillText(exercise === "pushup" ? "PUSH-UP" : "SQUAT", 20, 28);
    ctx2d.fillStyle = "#ffffff66"; ctx2d.font = "11px 'Space Mono',monospace"; ctx2d.fillText(`SET ${sn}/${ts}`, 20, 50);
    ctx2d.fillStyle = "#ffd700"; ctx2d.font = "bold 42px 'Space Mono',monospace";
    const repStr = `${cnt}/${tr}`; ctx2d.fillText(repStr, W / 2 - ctx2d.measureText(repStr).width / 2, 52);
    ctx2d.fillStyle = stage === "up" ? "#00ff88" : "#ff9800"; ctx2d.font = "bold 11px 'Space Mono',monospace"; ctx2d.fillText(stage.toUpperCase(), W - 120, 28);
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
  const [stats, setStats] = useState({ weight: 70, height: 170, bodyFat: 22 });
  const [ctx, setCtx] = useState({ calendar: "ว่าง", fatigue: 5, location: "บ้าน", weather: "แดดจ้า" });
  const [plan, setPlan] = useState(null);
  const [exercise, setExercise] = useState("pushup");
  const [planError, setPlanError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediapipeReady, setMediapipeReady] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

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

  const handleAnalyze = async () => {
    setLoading(true); setPlanError(null); setPage("planning");
    try { const p = await fetchAIPlan(stats, ctx); setPlan(p); setPage("plan"); }
    catch (e) { setPlanError("เชื่อมต่อ AI ไม่ได้ กรุณาลองใหม่ (" + e.message + ")"); setPage("context"); }
    finally { setLoading(false); }
  };

  const hideHeader = page === "tracker" || page === "camera-permission";

  return (
    <div style={{ minHeight: "100vh", background: "#060810", color: "#ffffff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}body{background:#060810;}
        input[type=range]{-webkit-appearance:none;appearance:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;background:#00ff88;border-radius:50%;box-shadow:0 0 10px #00ff88;cursor:pointer;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#060810;}::-webkit-scrollbar-thumb{background:#00ff8844;border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeIn 0.4s ease forwards}
      `}</style>
      <Scanline />
      {!hideHeader && (
        <div style={{ borderBottom: "1px solid #00ff8811", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: "3px", color: "#00ff88", fontWeight: 700 }}>◆ THE ADAPTABLE SHADOW</div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["profile", "context", "plan"].map((p, i) => (
              <div key={p} style={{ width: "8px", height: "8px", borderRadius: "50%", background: page === p ? "#00ff88" : ["profile", "context", "plan", "planning"].indexOf(page) > i ? "#00ff8844" : "#1a2a1a", boxShadow: page === p ? "0 0 8px #00ff88" : "none" }} />
            ))}
          </div>
        </div>
      )}
      <div className="fade-in" key={page}>
        {page === "profile" && <PageProfile stats={stats} setStats={setStats} onNext={() => setPage("context")} />}
        {page === "context" && <PageContext ctx={ctx} setCtx={setCtx} onBack={() => setPage("profile")} onAnalyze={handleAnalyze} loading={loading} error={planError} />}
        {page === "planning" && <PagePlanning />}
        {page === "plan" && plan && <PagePlan plan={plan} onStart={ex => { setExercise(ex); setPage("tutorial"); }} onBack={() => setPage("context")} />}
        {page === "tutorial" && plan && <PageVideoTutorial exercise={exercise} onNext={() => { setCameraStream(null); setPage("camera-permission"); }} onBack={() => setPage("plan")} />}
        {page === "camera-permission" && plan && <PageCameraPermission exercise={exercise} plan={plan} onGranted={stream => { setCameraStream(stream); setPage("tracker"); }} onBack={() => setPage("tutorial")} />}
        {page === "tracker" && plan && <PageTracker exercise={exercise} plan={plan} mediapipeReady={mediapipeReady} initialStream={cameraStream} onFinish={() => { stopCamera(); setPage("plan"); }} />}
      </div>
    </div>
  );
}