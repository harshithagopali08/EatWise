import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StepWeight() {
  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function next() {
    if (!weight || Number(weight) <= 0) {
      setError("Please enter a valid current weight");
      return;
    }

    setError("");

    // ✅ STORE IN LOCALSTORAGE
    localStorage.setItem("weight", weight);

    navigate("/onboarding/target-weight");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Current Weight
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your current body weight
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <label className="block text-[#134611] font-semibold mb-3">
            Weight (kg)
          </label>

          <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-center text-lg focus:outline-none focus:border-[#06D6A0]"
          />
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

export default StepWeight;
