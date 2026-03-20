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
เป้าหมายวันนี้: "${stats.goal || 'ออกกำลังให้สุขภาพดี'}"
ความเหนื่อยล้าปัจจุบัน: ${ctx.fatigue}/9 (ค่าที่เหมาะสมคือ sets=${sets}, reps=${reps})

กฎเหล็ก (Strict Rules):
1. การเลือกท่า: เลือกเฉพาะท่าที่ "เกี่ยวข้องโดยตรง" กับเป้าหมายผู้ใช้เท่านั้น (เช่น ถ้าเป้าหมายคือ "ขา" ให้เลือกเฉพาะ squat, lunge)
2. ท่าที่เลือก: ต้องใช้ค่า sets=${sets} และ reps=${reps} เท่านั้น (ห้ามเปลี่ยนตัวเลข)
3. ท่าที่ไม่เลือก: ต้องตั้งค่า "sets": 0 และ "reps": 0 เสมอ
4. ความสำคัญ: ท่าที่มี sets เป็น 0 จะถูกซ่อนจากหน้าเว็บอัตโนมัติ ดังนั้นไม่ต้องกังวลเรื่องการไม่ได้ออกกำลังกายส่วนอื่น ให้เน้นที่ความเกี่ยวข้องกับเป้าหมายเป็นหลัก

ตอบกลับเป็น JSON บริสุทธิ์ (ห้ามมี markdown):
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
}`;

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
              content: `คุณคือ "The Adaptable Shadow" AI Trainer ที่เน้น "ความกระชับ แม่นยำ และความเกี่ยวข้องสูง (High Relevance)"

เกณฑ์การตัดสินใจ (Quality Benchmark ≥ 90%):
1. วิเคราะห์เป้าหมายผู้ใช้อย่างเข้มงวด: หากเป้าหมายระบุส่วนใดส่วนหนึ่ง (เช่น "ขา") ให้เลือกเฉพาะ squat, lunge เท่านั้น ท่าอื่นต้องเป็น 0
2. กฎการให้คะแนน:
   - ท่าที่ตรงเป้าหมาย: sets ต้องเท่ากับค่าที่ส่งไปให้เท่านั้น, reps ต้องเท่ากับค่าที่ส่งไปให้เท่านั้น
   - ท่าที่ไม่ตรงเป้าหมาย: sets ต้องเป็น 0, reps ต้องเป็น 0 (ห้ามแอบใส่เลขอื่นเด็ดขาด)
3. ข้อมูลต้องเป็นประโยชน์สูงสุด: คำแนะนำ (message) และแรงบันดาลใจ (motivation) ต้องยาวไม่เกิน 1-2 ประโยค
4. ห้ามตอบนอกเรื่อง: ให้ตอบกลับเฉพาะ JSON ที่ถูกต้องตามโครงสร้างที่กำหนด` 
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 800,
          top_p: 0.9,
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
