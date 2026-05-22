const express = require("express");
const router = express.Router();

console.log("✅ userDetailsRoutes loaded");

const {
  saveUserDetails,
  getUserProfile,
} = require("../controllers/userDetailsController");

// ================= SAVE USER DETAILS =================
router.post("/save", saveUserDetails);

// ================= GET USER PROFILE =================
router.get("/profile/:userId", getUserProfile);

// ✅ ADD THIS (VERY IMPORTANT)
router.put("/profile/:userId", saveUserDetails);

module.exports = router;
