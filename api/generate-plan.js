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
    return res.status(500).json({ message: "Server configuration error: Missing API Key." });
  }

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      return res.status(response.status).json({ 
        message: `Gemini API Error (${response.status}): ${errorText.substring(0, 200)}` 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // ดึงเฉพาะส่วน JSON ออกมา
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("No JSON match in AI response:", text);
      return res.status(500).json({ message: "AI response did not contain JSON" });
    }

    return res.status(200).json(JSON.parse(match[0]));
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({ message: "Internal Server Error", details: error.message });
  }
}
