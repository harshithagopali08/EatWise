const db = require("../config/db");

// ================= SAVE / UPDATE USER DETAILS =================
const saveUserDetails = (req, res) => {
  // ✅ FIX: support BOTH POST and PUT
  let user_id = req.params.userId || req.body.user_id;

  let {
    gender,
    height,
    age,
    goal,
    language,
    location,
    weight,
    target_weight,
    goal_speed,
    medical,
  } = req.body;

  console.log("USER ID RECEIVED:", user_id);
  console.log("RECEIVED DATA:", req.body);

  // ================= TYPE CONVERSIONS =================
  user_id = parseInt(user_id);
  height = parseFloat(height);
  age = parseInt(age);
  weight = parseFloat(weight);
  target_weight = parseFloat(target_weight);

  // ================= FIX NaN → NULL =================
  height = isNaN(height) ? null : height;
  age = isNaN(age) ? null : age;
  weight = isNaN(weight) ? null : weight;
  target_weight = isNaN(target_weight) ? null : target_weight;

  // ================= EMPTY → NULL =================
  gender = gender || null;
  goal = goal || null;
  language = language || null;
  location = location || null;
  goal_speed = goal_speed || null;
  medical = medical || null;

  // ================= CHECK EXISTING DETAILS =================
  db.query(
    "SELECT id FROM user_details WHERE user_id = ?",
    [user_id],
    (checkErr, checkResult) => {
      if (checkErr) {
        console.error("CHECK ERROR:", checkErr);
        return res.status(500).json({ message: "Database error" });
      }

      // ================= UPDATE =================
      if (checkResult.length > 0) {
        const updateSql = `
          UPDATE user_details SET
            gender=?, height=?, age=?, goal=?, language=?, location=?,
            weight=?, target_weight=?, goal_speed=?, medical=?
          WHERE user_id=?
        `;

        return db.query(
          updateSql,
          [
            gender,
            height,
            age,
            goal,
            language,
            location,
            weight,
            target_weight,
            goal_speed,
            medical,
            user_id,
          ],
          (err) => {
            if (err) {
              console.error("UPDATE ERROR:", err);
              return res.status(500).json({ message: "Update failed" });
            }

            console.log("✅ UPDATED SUCCESSFULLY");
            return res.json({ message: "Updated successfully" });
          },
        );
      }

      // ================= INSERT =================
      const insertSql = `
        INSERT INTO user_details
        (user_id, gender, height, age, goal, language, location, weight, target_weight, goal_speed, medical)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      return db.query(
        insertSql,
        [
          user_id,
          gender,
          height,
          age,
          goal,
          language,
          location,
          weight,
          target_weight,
          goal_speed,
          medical,
        ],
        (err) => {
          if (err) {
            console.error("INSERT ERROR:", err);
            return res.status(500).json({ message: "Insert failed" });
          }

          console.log("✅ INSERTED SUCCESSFULLY");
          return res.json({ message: "Saved successfully" });
        },
      );
    },
  );
};

// ================= GET PROFILE =================
const getUserProfile = (req, res) => {
  const userId = req.params.userId;

  console.log("FETCHING PROFILE FOR USER:", userId);

  const sql = `
    SELECT 
      u.id,
      u.name,
      u.email,
      ud.height,
      ud.weight,
      ud.age,
      ud.goal,
      ud.language,
      ud.location,
      ud.target_weight,
      ud.goal_speed,
      ud.medical
    FROM users u
    LEFT JOIN user_details ud ON u.id = ud.user_id
    WHERE u.id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("FETCH ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("PROFILE DATA:", result[0]);
    res.json(result[0]);
  });
};

module.exports = { saveUserDetails, getUserProfile };
