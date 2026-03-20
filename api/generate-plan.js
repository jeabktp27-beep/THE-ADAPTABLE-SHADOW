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

ท่าออกกำลังที่มีให้เลือกและหมวดหมู่:
1. pushup: อก, แขนหลัง (Upper Body)
2. squat: ขา, ก้น (Lower Body)
3. plank: แกนกลางลำตัว (Core)
4. lunge: ขา, ก้น (Lower Body)
5. situp: หน้าท้อง (Core)
6. jumpingjack: หัวใจ, ขา (Cardio/Full Body)

กฎการคัดเลือกท่า:
1. วิเคราะห์เป้าหมายผู้ใช้อย่างละเอียด และเลือกเฉพาะท่าที่ "ควรทำ" เพื่อให้บรรลุเป้าหมายนั้น
2. หากท่าไหนไม่เกี่ยวข้อง ให้ตั้งค่า "sets": 0
3. หากท่าไหนเลือกให้ทำ ให้ตั้งค่า "sets": 1 (เพื่อระบุว่าเลือกท่านี้)
4. ไม่ต้องกำหนดจำนวนครั้ง (reps) หรือเวลา (hold_sec) เพราะผู้ใช้จะกำหนดเองภายหลัง

ตอบกลับเป็น JSON บริสุทธิ์ (ห้ามมี markdown):
{
  "mode": "moderate",
  "message": "คำแนะนำสั้นๆ",
  "motivation": "ข้อความกระตุ้น",
  "pushup": {"sets": 0},
  "squat": {"sets": 0},
  "plank": {"sets": 0},
  "lunge": {"sets": 0},
  "situp": {"sets": 0},
  "jumpingjack": {"sets": 0},
  "form_tip": "เคล็ดลับฟอร์ม 1 ข้อ",
  "estimated_duration_min": 10
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
              content: `คุณคือ "The Adaptable Shadow" AI Trainer ที่เน้น "ความยืดหยุ่นและมีประโยชน์ต่อผู้ใช้ (User-Centric)"

แนวทางการตัดสินใจ:
1. วิเคราะห์เป้าหมายผู้ใช้: "ควร" เลือกท่าที่เหมาะสมที่สุด หากเป้าหมายเจาะจง ให้เน้นท่านั้นเป็นหลัก
2. ความกระชับ: คำแนะนำควรเป็นธรรมชาติและมีประโยชน์ต่อผู้ใช้จริงๆ
3. ความเป็นมืออาชีพ: ปรับแผนการเล่นตามสภาพร่างกายและความเหนื่อยล้าอย่างสมเหตุสมผล` 
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
      // ป้องกัน AI ดื้อไม่ทำตามคำสั่ง (ใช้ plan[ex].sets > 0 เป็นตัวตัดสิน)
      // ============================================================
      const repExercises = ['pushup', 'squat', 'lunge', 'situp', 'jumpingjack'];
      repExercises.forEach(ex => {
        if (plan[ex] && plan[ex].sets > 0) {
          plan[ex].sets = sets;
          plan[ex].reps = reps;
        } else if (plan[ex]) {
          plan[ex].sets = 0;
          plan[ex].reps = 0;
        }
      });
      if (plan.plank && plan.plank.sets > 0) {
        plan.plank.sets = sets;
      } else if (plan.plank) {
        plan.plank.sets = 0;
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
