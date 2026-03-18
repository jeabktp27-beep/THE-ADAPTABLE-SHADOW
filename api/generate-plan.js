export default async function handler(req, res) {
  // อนุญาตเฉพาะ Method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { stats, ctx } = req.body;
  if (!stats || !ctx) {
    return res.status(400).json({ message: 'Missing stats or ctx in request body' });
  }

  const bmi = (stats.weight / (stats.height / 100) ** 2).toFixed(1);
  const prompt = `คุณคือ AI Personal Trainer ชื่อ "The Adaptable Shadow"
ตอบกลับเป็น JSON เท่านั้น ไม่มีข้อความอื่นนอกจาก JSON บริสุทธิ์
ข้อมูลผู้ใช้: น้ำหนัก ${stats.weight}kg, ส่วนสูง ${stats.height}cm, ไขมัน ${stats.bodyFat}%, BMI ${bmi}
เป้าหมายของผู้ใช้วันนี้: "${stats.goal || 'ออกกำลังให้สุขภาพดี'}"
บริบท: เหนื่อยล้า ${ctx.fatigue}/10, สถานที่="${ctx.location}", อากาศ="${ctx.weather}"
กฎการตัดสิน:
- เหนื่อยล้า>=7 หรือมีคำว่า ประชุม/ยุ่ง/งานเร่ง → mode="micro" (แค่ sets 2 reps 8-10)
- เหนื่อยล้า 4-6 → mode="moderate" (sets 3 reps 12-15)
- เหนื่อยล้า 1-3 และว่าง → mode="full" (sets 4 reps 20+)
- ไขมัน<18% → reps+20% / ไขมัน>25% → reps-15%
- เป้าหมายผู้ใช้: ปรับท่าออกกำลังและสารใน message/motivation ให้ตรงกับเป้าหมายนี้
ท่าออกกำลัง: pushup(นับ reps), squat(นับ reps), plank(นับวินาที hold_sec), lunge(นับ reps), situp(นับ reps), jumpingjack(นับ reps)
ตอบ JSON เท่านั้น ห้ามมี markdown backtick:
{"mode":"micro","message":"ข้อความ trainer 1-2 ประโยคภาษาไทย","motivation":"ประโยคกระตุ้นใจ","pushup":{"sets":2,"reps":10,"rest_sec":45},"squat":{"sets":2,"reps":12,"rest_sec":45},"plank":{"sets":2,"hold_sec":30,"rest_sec":30},"lunge":{"sets":2,"reps":10,"rest_sec":45},"situp":{"sets":2,"reps":15,"rest_sec":45},"jumpingjack":{"sets":2,"reps":20,"rest_sec":30},"form_tip":"เคล็ดลับ form 1 ข้อ","estimated_duration_min":8}`;

  // ดึง API Key จาก Environment Variables ของ Vercel
  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_KEY) {
    console.error("Missing GEMINI_API_KEY in Environment Variables");
    return res.status(500).json({ message: "⚠️ ระบบยังไม่ได้ตั้งค่า API Key กรุณาแจ้งผู้ดูแลระบบ" });
  }

  // ============================================================
  // Retry Logic: ถ้า Gemini ตอบ 429 (Rate Limit) จะรอแล้วยิงใหม่
  // ใช้ Exponential Backoff: รอ 2s → 4s → 8s (สูงสุด 3 รอบ)
  // ============================================================
  const MAX_RETRIES = 3;
  let lastError = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      // ถ้าโดน Rate Limit (429) → รอแล้วลองใหม่
      if (response.status === 429) {
        const waitSec = Math.pow(2, attempt + 1); // 2s, 4s, 8s
        console.warn(`[Attempt ${attempt + 1}/${MAX_RETRIES}] Rate limited (429). Waiting ${waitSec}s...`);
        await new Promise(resolve => setTimeout(resolve, waitSec * 1000));
        continue;
      }

      // ถ้า Error อื่นที่ไม่ใช่ 429
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", response.status, errorText);
        const friendlyMsg = getFriendlyErrorMessage(response.status, errorText);
        return res.status(response.status).json({ message: friendlyMsg });
      }

      // สำเร็จ! แปลงผลลัพธ์
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error("No JSON match in AI response:", text);
        return res.status(500).json({ message: "🤖 AI ตอบกลับมาไม่ถูกรูปแบบ กรุณาลองใหม่อีกครั้ง" });
      }

      return res.status(200).json(JSON.parse(match[0]));

    } catch (error) {
      console.error(`[Attempt ${attempt + 1}] Error:`, error.message);
      lastError = error;
    }
  }

  // ถ้าลองครบ 3 รอบแล้วยังไม่ผ่าน
  console.error("All retries exhausted. Last error:", lastError?.message);
  return res.status(429).json({
    message: "🔥 ระบบ AI มีคนใช้เยอะในตอนนี้ กรุณารอ 1-2 นาทีแล้วลองใหม่อีกครั้งครับ"
  });
}

// ============================================================
// แปลง Error Code → ข้อความภาษาไทยที่อ่านง่าย
// ============================================================
function getFriendlyErrorMessage(status, errorText) {
  switch (status) {
    case 400:
      if (errorText.includes("API key not valid")) {
        return "🔑 API Key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่าใน Vercel Environment Variables";
      }
      return "⚠️ ข้อมูลที่ส่งไปไม่ถูกต้อง กรุณาลองใหม่";
    case 401:
      return "🔐 ไม่มีสิทธิ์เข้าถึง API กรุณาตรวจสอบ API Key";
    case 403:
      return "🚫 API Key ถูกระงับการใช้งาน กรุณาตรวจสอบที่ Google AI Studio";
    case 404:
      return "❌ ไม่พบโมเดล AI กรุณาแจ้งผู้ดูแลระบบ";
    case 429:
      return "🔥 ระบบ AI มีคนใช้เยอะในตอนนี้ กรุณารอ 1-2 นาทีแล้วลองใหม่";
    case 500:
    case 503:
      return "🛠️ เซิร์ฟเวอร์ AI ขัดข้อง กรุณาลองใหม่ภายหลัง";
    default:
      return `⚠️ เกิดข้อผิดพลาดจาก AI (Error ${status}) กรุณาลองใหม่`;
  }
}
