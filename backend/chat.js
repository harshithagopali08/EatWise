import express from "express";
import { db } from "./server.js";
import Groq from "groq-sdk";

const router = express.Router();



router.post("/chat", async (req, res) => {

  const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,   // ⚠️ DON'T HARDCODE
});
  const message = req.body.message;

  // 🔥 LANGUAGE DETECTION
  let language = "english";

  if (/[\u0C00-\u0C7F]/.test(message)) {
    language = "telugu";
  } else if (/[\u0900-\u097F]/.test(message)) {
    language = "hindi";
  }

  // 🔥 LANGUAGE INSTRUCTION
  let langInstruction = `
Respond in natural, simple English.
`;

  if (language === "telugu") {
    langInstruction = `
Respond ONLY in natural Telugu.
Do NOT translate word-by-word.
Use simple conversational Telugu (like speaking).
`;
  }

  if (language === "hindi") {
    langInstruction = `
Respond ONLY in natural Hindi.
Use simple spoken Hindi.
`;
  }

  // 🔍 FOOD QUERY
  let foodQuery = null;

  if (message.toLowerCase().includes("calories in")) {
    foodQuery = message.toLowerCase().replace("calories in", "").trim();
  }

  // ✅ DB RESPONSE
  if (foodQuery) {
    const sql = "SELECT * FROM foods WHERE food_name_lower LIKE ?";

    db.query(sql, [`%${foodQuery}%`], (err, result) => {
      if (err) return res.status(500).send("DB Error");

      if (result.length > 0) {
        const f = result[0];

        return res.json({
          reply: `${f.food_name}: ${f.calories} kcal, ${f.protein}g protein, ${f.carbs}g carbs`
        });
      }

      return res.json({ reply: "Food not found." });
    });
  }

  // 🤖 AI RESPONSE
  else {
    try {
      const ai = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a helpful nutrition assistant.

Rules:
- Follow language instruction strictly
- Keep answers short (2-4 lines)
- Be clear and practical
- No markdown symbols
`
          },
          {
            role: "user",
            content: `
${langInstruction}

User: ${message}
`
          }
        ],
        temperature: 0.6
      });

      res.json({
        reply: ai.choices[0].message.content
      });

    } catch (err) {
      console.log("AI ERROR:", err);
      res.json({ reply: "Something went wrong." });
    }
  }
});

export default router;