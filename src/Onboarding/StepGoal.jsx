import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ ADDED

function StepGoal() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ADDED

  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const goals = [
    { title: t("weightLoss"), key: "weightLoss", icon: "🔥" }, // ✅ UPDATED
    { title: t("muscleGain"), key: "muscleGain", icon: "💪" },
    { title: t("healthyDiet"), key: "healthyDiet", icon: "🥗" },
    { title: t("calorieTracking"), key: "calorieTracking", icon: "📊" },
  ];

  // ✅ Toggle selection (multi-select safe)
  function toggle(goal) {
    setSelected((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  }

  // ✅ Next step
  function next() {
    if (selected.length === 0) {
      setError(t("selectGoalError")); // ✅ UPDATED
      return;
    }

    setError("");

    // 🔥 STORE MULTI-SELECT AS JSON STRING
    localStorage.setItem("goal", JSON.stringify(selected));

    navigate("/onboarding/age");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          {t("goalTitle")} {/* ✅ UPDATED */}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          {t("goalSubtitle")} {/* ✅ UPDATED */}
        </p>

        {/* Goal Options */}
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.key}
              onClick={() => toggle(goal.key)} // ✅ UPDATED
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer 
              transition-all duration-200 border
              
              ${
                selected.includes(goal.key) // ✅ UPDATED
                  ? "bg-[#134611] text-white border-[#134611] shadow-lg"
                  : "bg-white border-gray-200 hover:border-[#06D6A0] hover:shadow-md"
              }`}
            >
              <span className="text-2xl">{goal.icon}</span>
              <span className="font-medium text-lg">{goal.title}</span>
            </div>
          ))}
        </div>

        {/* ❗ Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {/* Continue Button */}
        <button
          onClick={next}
          className="mt-10 w-full bg-[#EF8A17] hover:bg-[#e07810] 
          text-white py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          {t("continue")} {/* ✅ UPDATED */}
        </button>
      </div>
    </div>
  );
}

export default StepGoal;