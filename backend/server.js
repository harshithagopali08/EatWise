import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mysql from "mysql2";

// ROUTES
import chatRoutes from "./chat.js";
import recommendationRoutes from "./routes/recommendation.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userDetailsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.options(/.*/, cors());

app.use(express.json());

// ================= DATABASE =================
export const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

// ================= ROUTES =================
app.use("/api", chatRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/foods", async (req, res) => {
  const search = req.query.search;

  if (!search) return res.json([]);

  try {
    const [rows] = await db.execute(
      `
      SELECT 
        food_name,
        carbohydrates,
        proteins,
        fats,
        (carbohydrates*4 + proteins*4 + fats*9) AS calories
      FROM foods
      WHERE LOWER(food_name) LIKE LOWER(?)
      LIMIT 10
      `,
      [`%${search}%`],
    );

    res.json(rows);
  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ================= ADD FOOD =================
app.post("/add-food", async (req, res) => {
  const { user_id, food_name, meal, calories } = req.body;

  if (!user_id || !food_name || !meal || !calories) {
    return res.status(400).send("Missing fields");
  }

  try {
    await db.execute(
      `INSERT INTO calorie_logs (user_id, food_name, meal, calories)
       VALUES (?, ?, ?, ?)`,
      [user_id, food_name, meal, calories],
    );

    res.send("Food added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving data");
  }
});

// ================= GET FOOD =================
app.get("/get-foods", async (req, res) => {
  const user_id = req.query.user_id;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM calorie_logs WHERE user_id = ?",
      [user_id],
    );

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching data");
    console.log("DB NAME:", item.name);
    console.log("KEY:", getFoodKey(item.name));
  }
});

// ================= PROFILE =================
app.get("/api/user/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM user_details WHERE user_id = ?",
      [userId],
    );

    if (rows.length === 0) {
      return res.json({});
    }

    // ✅ FIXED RESPONSE (IMPORTANT)
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
});
// SAVE FOOD ENTRY
app.post("/calorie-log", async (req, res) => {
  const { user_id, food_name, meal, calories } = req.body;

  if (!user_id || !food_name || !meal || !calories) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await db.execute(
      `INSERT INTO calorie_logs (user_id, food_name, meal, calories)
       VALUES (?, ?, ?, ?)`,
      [user_id, food_name, meal, calories],
    );

    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "DB Error" });
  }
});
// GET USER CALORIE LOGS
app.get("/calorie-log/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const [rows] = await db.execute(
      `
      SELECT food_name, meal, calories 
      FROM calorie_logs 
      WHERE user_id = ?
      AND DATE(created_at) = CURDATE()
      ORDER BY created_at DESC
      `,
      [user_id],
    );

    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "DB Error" });
  }
});
// ================= TEST =================
app.get("/", (req, res) => {
  res.send("🚀 EatWise Backend is Running...");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
