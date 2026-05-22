import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // ✅ ADDED

function StepMedical() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ADDED

  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  // ✅ USE KEYS INSTEAD OF TEXT
  const conditions = [
    { key: "none" },
    { key: "diabetes" },
    { key: "thyroid" },
    { key: "pcos" },
    { key: "cholesterol" },
    { key: "bloodPressure" },
  ];

  function toggle(condition) {
    setSelected((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  }

  async function finish() {
    if (selected.length === 0) {
      setError(t("selectMedicalError")); // ✅ UPDATED
      localStorage.setItem("onboarded", "true");
      return;
    }

    setError("");

    localStorage.setItem("medical", JSON.stringify(selected));

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) {
      alert("User not found. Please login again.");
      return;
    }

    const data = {
      user_id: user.id,
      gender: localStorage.getItem("gender"),
      height: parseFloat(localStorage.getItem("height")),
      age: parseInt(localStorage.getItem("age")),
      goal: JSON.parse(localStorage.getItem("goal") || "[]").join(","),
      language: localStorage.getItem("language"),
      location: localStorage.getItem("location"),
      weight: parseFloat(localStorage.getItem("weight")),
      target_weight: parseFloat(localStorage.getItem("targetWeight")),
      goal_speed: localStorage.getItem("goalSpeed"),
      medical: selected.join(","), // ✅ sends keys (correct)
    };

    console.log("FINAL DATA:", data);

    try {
      await axios.post(
        "https://eatwise-backend-39j2.onrender.com/api/user/save",
        data,
      );
      console.log("✅ Saved to DB");
    } catch (err) {
      console.error("❌ Save failed:", err.response?.data || err.message);
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          {t("medicalTitle")} {/* ✅ UPDATED */}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          {t("medicalSubtitle")} {/* ✅ UPDATED */}
        </p>

        <div className="space-y-4">
          {conditions.map((condition) => (
            <div
              key={condition.key}
              onClick={() => toggle(condition.key)} // ✅ UPDATED
              className={`p-4 border rounded-xl cursor-pointer transition
              ${
                selected.includes(condition.key)
                  ? "bg-[#134611] text-white border-[#134611] shadow-lg"
                  : "bg-white border-gray-200 hover:border-[#06D6A0] hover:shadow-md"
              }`}
            >
              {t(condition.key)} {/* ✅ THIS FIXES TRANSLATION */}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <button
          onClick={finish}
          className="mt-10 w-full bg-[#EF8A17] hover:bg-[#e07810] text-white py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          {t("finish")} {/* ✅ UPDATED */}
        </button>
      </div>
    </div>
  );
}

export default StepMedical;
