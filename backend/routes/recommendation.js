import express from "express";
import Groq from "groq-sdk";

const router = express.Router();


// ✅ KEY NORMALIZER (CRITICAL FIX)
function normalizeMeals(data) {
  const map = {
    breakfast: ["breakfast", "नाश्ता", "బ్రేక్‌ఫాస్ట్"],
    lunch: ["lunch", "दोपहर", "లంచ్"],
    dinner: ["dinner", "रात", "డిన్నర్"],
    snacks: ["snacks", "नाश्ता", "స్నాక్స్"],
  };

  const result = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };

  for (let key in data) {
    const lower = key.toLowerCase();

    for (let standard in map) {
      if (map[standard].some(k => lower.includes(k))) {
        result[standard] = data[key];
      }
    }
  }

  return result;
}

router.post("/recommend", async (req, res) => {
  try {
    const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

    const { language = "English" } = req.body;

    // 🌍 LANGUAGE CONTROL
    let langInstruction = "Respond in English.";
    if (language === "Hindi") langInstruction = "Respond in Hindi.";
    if (language === "Telugu") langInstruction = "Respond in Telugu.";

    const prompt = `
Create a healthy Indian meal plan.

STRICT RULES:
- Only Indian foods
- No junk food
- No explanation

IMPORTANT:
- Return ONLY JSON
- Keys MUST be in English (breakfast, lunch, dinner, snacks)
- Only values should be translated

Format:
{
  "breakfast": ["item1", "item2"],
  "lunch": ["item1", "item2"],
  "dinner": ["item1", "item2"],
  "snacks": ["item1", "item2"]
}

${langInstruction}
`;

    let meals;

    try {
      const ai = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "Return only JSON" },
          { role: "user", content: prompt },
        ],
        model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
      });

      const raw = ai.choices[0].message.content;
      console.log("RAW AI:", raw);

      const cleaned = raw.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\{[\s\S]*\}/);

      if (!match) throw new Error("No JSON found");

      const parsed = JSON.parse(match[0]);

      // ✅ FINAL FIX
      meals = normalizeMeals(parsed);

      // fallback safety
      if (!meals.breakfast.length) {
        throw new Error("Bad AI format");
      }

    } catch (err) {
      console.log("AI ERROR:", err.message);

      meals = {
        breakfast: ["Idli", "Upma"],
        lunch: ["Rice", "Dal"],
        dinner: ["Chapati", "Sabzi"],
        snacks: ["Fruits", "Nuts"],
      };
    }

    res.json({
      success: true,
      data: { meals },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

export default router;