export default async function handler(req, res) {
  // อนุญาตเฉพาะ Method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { stats, ctx, targetSets, targetReps } = req.body;
  if (!stats || !ctx) {
    return res.status(400).json({ message: 'Missing stats or ctx in request body' });
  }

  // ใช้ค่า sets/reps ที่ frontend ส่งมา (ตาม fatigue level ที่ user เลือก)
  const sets = targetSets || 2;
  const reps = targetReps || 10;

  const bmi = (stats.weight / (stats.height / 100) ** 2).toFixed(1);
  const prompt = `คุณคือ AI Personal Trainer ชื่อ "The Adaptable Shadow"
ตอบกลับเป็น JSON เท่านั้น ไม่มีข้อความอื่นนอกจาก JSON บริสุทธิ์
ข้อมูลผู้ใช้: น้ำหนัก ${stats.weight}kg, ส่วนสูง ${stats.height}cm, ไขมัน ${stats.bodyFat}%, BMI ${bmi}
เป้าหมายของผู้ใช้วันนี้: "${stats.goal || 'ออกกำลังให้สุขภาพดี'}"
บริบท: เหนื่อยล้า ${ctx.fatigue}/9, สถานที่="${ctx.location}", อากาศ="${ctx.weather}"

กฎสำคัญที่สุด — ห้ามฝ่าฝืน:
- ผู้ใช้กำหนดไว้แล้วว่า sets=${sets} และ reps=${reps} สำหรับท่าที่เลือก
- คุณต้องเลือกท่าที่เหมาะสมกับ "เป้าหมาย" และ "บริบท" ของผู้ใช้มากที่สุด (ไม่จำเป็นต้องครบทุกท่า)
- หากเป้าหมายระบุเจาะจง เช่น "เน้นขา" ให้เลือกเฉพาะท่าที่เกี่ยวข้อง (เช่น squat, lunge, jumpingjack)
- สำหรับท่าที่ไม่เลือก ให้กำหนดค่า sets: 0
- plank ใช้ sets=${sets} หรือ 0, hold_sec ตามสมควร (15-60 วินาที)
- rest_sec ปรับได้ตามความเหมาะสม (20-90 วินาที)
- เลือก mode จากจำนวน sets: sets>=3 → "full", sets=2 → "moderate", sets=1 → "micro"
- เป้าหมายผู้ใช้: ปรับสารใน message/motivation ให้ตรงกับเป้าหมายนี้

ท่าออกกำลังที่มีให้เลือก: pushup, squat, plank, lunge, situp, jumpingjack
ตอบ JSON เท่านั้น ห้ามมี markdown backtick:
{"mode":"moderate","message":"ข้อความ trainer 1-2 ประโยคภาษาไทย","motivation":"ประโยคกระตุ้นใจ","pushup":{"sets":${sets},"reps":${reps},"rest_sec":45},"squat":{"sets":${sets},"reps":${reps},"rest_sec":45},"plank":{"sets":${sets},"hold_sec":30,"rest_sec":30},"lunge":{"sets":${sets},"reps":${reps},"rest_sec":45},"situp":{"sets":${sets},"reps":${reps},"rest_sec":45},"jumpingjack":{"sets":${sets},"reps":${reps},"rest_sec":30},"form_tip":"เคล็ดลับ form 1 ข้อ","estimated_duration_min":8}`;

  // ดึง API Key จาก Environment Variables
  const GROQ_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_KEY) {
    console.error("Missing GROQ_API_KEY in Environment Variables");
    return res.status(500).json({ 
      message: "⚠️ ระบบยังไม่ได้ตั้งค่า API Key กรุณาเพิ่ม GROQ_API_KEY ใน Vercel Settings และทำการ Redeploy" 
    });
  }

  // ============================================================
  // Retry Logic: Exponential Backoff (2s → 4s → 8s, สูงสุด 3 รอบ)
  // ============================================================
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      // ============================================================
      // เรียก Groq API (OpenAI-compatible format)
      // ============================================================
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "คุณคือ AI Personal Trainer ตอบกลับเป็น JSON เท่านั้น ห้ามมี markdown หรือข้อความอื่น" },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          response_format: { type: "json_object" }
        })
      });

      // ถ้าโดน Rate Limit (429) → รอแล้วลองใหม่
      if (response.status === 429) {
        const waitSec = Math.pow(2, attempt + 1);
        console.warn(`[Attempt ${attempt + 1}/${MAX_RETRIES}] Rate limited (429). Waiting ${waitSec}s...`);
        await new Promise(resolve => setTimeout(resolve, waitSec * 1000));
        continue;
      }

      // ถ้า Error อื่น
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Groq API Error:", response.status, errorText);
        const friendlyMsg = getFriendlyErrorMessage(response.status, errorText);
        return res.status(response.status).json({ message: friendlyMsg });
      }

      // สำเร็จ! ดึง JSON จาก Groq response
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "{}";

      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error("No JSON match in AI response:", text);
        return res.status(500).json({ message: "🤖 AI ตอบกลับมาไม่ถูกรูปแบบ กรุณาลองใหม่อีกครั้ง" });
      }

      const plan = JSON.parse(match[0]);

      // ============================================================
      // Safety Net: Force override sets/reps ให้ตรงกับที่ user กำหนด
      // ป้องกัน AI ดื้อไม่ทำตามคำสั่ง
      // ============================================================
      const repExercises = ['pushup', 'squat', 'lunge', 'situp', 'jumpingjack'];
      repExercises.forEach(ex => {
        if (plan[ex]) {
          plan[ex].sets = sets;
          plan[ex].reps = reps;
        }
      });
      if (plan.plank) {
        plan.plank.sets = sets;
      }

      return res.status(200).json(plan);

    } catch (error) {
      console.error(`[Attempt ${attempt + 1}] Error:`, error.message);
    }
  }

  // ลองครบ 3 รอบแล้วยังไม่ผ่าน
  return res.status(429).json({
    message: "🔥 ระบบ AI มีคนใช้เยอะในตอนนี้ กรุณารอ 1-2 นาทีแล้วลองใหม่อีกครั้งครับ"
  });
}

// ============================================================
// แปลง Error Code → ข้อความภาษาไทย
// ============================================================
function getFriendlyErrorMessage(status, errorText) {
  switch (status) {
    case 400:
      return "⚠️ ข้อมูลที่ส่งไปไม่ถูกต้อง กรุณาลองใหม่";
    case 401:
      return "🔐 API Key ของ Groq ไม่ถูกต้อง (401)";
    case 403:
      return "🚫 การเข้าถึงถูกปฏิเสธ (403)";
    case 413:
      return "📦 ข้อมูลใหญ่เกินไปสำหรับ AI (413)";
    case 429:
      return "🔥 Groq จำกัดความเร็ว (Rate Limit) กรุณารอสักครู่";
    case 500:
    case 503:
      return "🛠️ เซิร์ฟเวอร์ Groq ขัดข้อง (5xx) กรุณาลองใหม่ภายหลัง";
    default:
      return `⚠️ เกิดข้อผิดพลาดจาก AI (Status: ${status})`;
  }
}
