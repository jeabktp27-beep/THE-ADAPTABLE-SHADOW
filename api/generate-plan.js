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
  const prompt = `ข้อมูลผู้ใช้: น้ำหนัก ${stats.weight}kg, ส่วนสูง ${stats.height}cm, ไขมัน ${stats.bodyFat}%, BMI ${bmi}
เป้าหมายของผู้ใช้วันนี้: "${stats.goal || 'ออกกำลังให้สุขภาพดี'}"
บริบท: เหนื่อยล้า ${ctx.fatigue}/9, สถานที่="${ctx.location}", อากาศ="${ctx.weather}"
ค่ากำหนด (ห้ามเปลี่ยน): sets=${sets}, reps=${reps}

ท่าออกกำลังที่มีให้เลือกและประเภท:
- pushup: อก, แขนหลัง (Upper Body)
- squat: ขา, ก้น (Lower Body)
- plank: แกนกลางลำตัว (Core)
- lunge: ขา, ก้น (Lower Body)
- situp: หน้าท้อง (Core)
- jumpingjack: หัวใจ, ขา (Cardio/Full Body)

ตอบกลับเป็น JSON ตามโครงสร้างนี้เท่านั้น (ห้ามมี markdown):
{
  "mode": "moderate",
  "message": "...",
  "motivation": "...",
  "pushup": {"sets": 0, "reps": 0, "rest_sec": 45},
  "squat": {"sets": 0, "reps": 0, "rest_sec": 45},
  "plank": {"sets": 0, "hold_sec": 30, "rest_sec": 30},
  "lunge": {"sets": 0, "reps": 0, "rest_sec": 45},
  "situp": {"sets": 0, "reps": 0, "rest_sec": 45},
  "jumpingjack": {"sets": 0, "reps": 0, "rest_sec": 30},
  "form_tip": "...",
  "estimated_duration_min": 8
}
(กฎ: เปลี่ยน sets จาก 0 เป็น ${sets} และ reps เป็น ${reps} เฉพาะท่าที่ตรงกับเป้าหมายของผู้ใช้เท่านั้น ท่าอื่นๆ ให้คงค่า sets เป็น 0 ไว้)`;

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
            { 
              role: "system", 
              content: `คุณคือ "The Adaptable Shadow" AI Personal Trainer ผู้เชี่ยวชาญการปรับโปรแกรมตามเป้าหมาย

กฎเหล็กที่คุณต้องปฏิบัติตามอย่างเคร่งครัด:
1. วิเคราะห์ "เป้าหมาย" ของผู้ใช้อย่างละเอียด
2. หากเป้าหมายระบุส่วนใดส่วนหนึ่ง (เช่น "เน้นขา", "Leg Day", "ลดพุง") ให้เลือกเฉพาะท่าที่เกี่ยวข้องโดยตรงเท่านั้น
3. สำหรับท่าที่ไม่เกี่ยวข้องกับเป้าหมาย ให้ตั้งค่า "sets": 0 เสมอ (ห้ามแอบใส่มาถ้าไม่จำเป็น)
4. ใช้ค่า sets และ reps ที่กำหนดให้สำหรับท่าที่เลือก (ยกเว้น plank ให้ใช้ hold_sec)
5. ตอบกลับเป็น JSON บริสุทธิ์เท่านั้น ห้ามมีคำอธิบายหรือ Markdown ใดๆ ทั้งสิ้น` 
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
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
