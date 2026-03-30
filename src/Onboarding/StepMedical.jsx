import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StepMedical() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const conditions = [
    "None",
    "Diabetes",
    "Thyroid",
    "PCOS",
    "High Cholesterol",
    "Blood Pressure",
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
      setError("Please select at least one option");
      return;
    }

    setError("");

    // Save locally
    localStorage.setItem("medical", JSON.stringify(selected));

    const user = JSON.parse(localStorage.getItem("user"));

    // Prepare data safely
    const data = {
      user_id: user?.id || null,
      gender: localStorage.getItem("gender") || null,
      height: parseFloat(localStorage.getItem("height")) || null,
      age: parseInt(localStorage.getItem("age")) || null,
      goal: JSON.parse(localStorage.getItem("goal") || "[]").join(","),
      language: localStorage.getItem("language") || null,
      location: localStorage.getItem("location") || null,
      weight: parseFloat(localStorage.getItem("weight")) || null,
      target_weight: parseFloat(localStorage.getItem("targetWeight")) || null,
      goal_speed: localStorage.getItem("goalSpeed") || null,
      medical: selected.join(","),
    };

    console.log("FINAL DATA:", data);

    try {
      if (user?.id) {
        await axios.post("http://localhost:5000/api/user/save", data);
        console.log("Saved to DB");
      } else {
        console.warn("User not found — skipping DB save (demo mode)");
      }
    } catch (err) {
      console.warn("Save failed:", err.message);
    }

    // ALWAYS go to dashboard
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Medical Conditions
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Do you have any medical conditions we should know about?
        </p>

        <div className="space-y-4">
          {conditions.map((condition) => (
            <div
              key={condition}
              onClick={() => toggle(condition)}
              className={`p-4 border rounded-xl cursor-pointer transition
              ${
                selected.includes(condition)
                  ? "bg-[#134611] text-white border-[#134611] shadow-lg"
                  : "bg-white border-gray-200 hover:border-[#06D6A0] hover:shadow-md"
              }`}
            >
              {condition}
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
          Finish
        </button>
      </div>
    </div>
  );
}

export default StepMedical;
