import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StepSpeed() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const speeds = [
    {
      title: "Relaxed",
      desc: "Slow and steady progress",
    },
    {
      title: "Gradual",
      desc: "Balanced and sustainable",
    },
    {
      title: "Steady",
      desc: "Faster but manageable",
    },
    {
      title: "Rapid",
      desc: "Quick results with dedication",
    },
  ];

  function next() {
    if (!selected) {
      setError("Please select a goal speed");
      return;
    }

    setError("");

    // ✅ STORE IN LOCALSTORAGE
    localStorage.setItem("goalSpeed", selected);

    navigate("/onboarding/medical");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Goal Speed
        </h1>

        <p className="text-gray-500 text-center mb-8">
          How fast do you want to reach your goal?
        </p>

        <div className="space-y-4">
          {speeds.map((speed) => (
            <div
              key={speed.title}
              onClick={() => setSelected(speed.title)}
              className={`p-4 border rounded-xl cursor-pointer transition
              ${
                selected === speed.title
                  ? "bg-[#134611] text-white border-[#134611] shadow-lg"
                  : "bg-white border-gray-200 hover:border-[#06D6A0] hover:shadow-md"
              }`}
            >
              <h3 className="font-semibold text-lg">{speed.title}</h3>
              <p className="text-sm opacity-80">{speed.desc}</p>
            </div>
          ))}
        </div>

        {/* ❗ Error */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <button
          onClick={next}
          className="mt-10 w-full bg-[#EF8A17] hover:bg-[#e07810] 
          text-white py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default StepSpeed;
