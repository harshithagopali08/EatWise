import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StepLocation() {
  const navigate = useNavigate();

  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Tamil Nadu",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Delhi",
    "West Bengal",
    "Gujarat",
    "Rajasthan",
  ];

  function next() {
    if (!state) {
      setError("Please select your state");
      return;
    }

    setError("");

    // ✅ Store as combined location
    const location = `India - ${state}`;
    localStorage.setItem("location", location);

    navigate("/onboarding/language");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Where are you from?
        </h1>

        <p className="text-gray-500 text-center mb-8">
          We personalize plans based on your location
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          {/* Country */}
          <label className="block text-[#134611] font-semibold mb-2">
            Country
          </label>

          <input
            value="India"
            disabled
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 mb-4"
          />

          {/* State Dropdown */}
          <label className="block text-[#134611] font-semibold mb-2">
            State
          </label>

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#06D6A0]"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* ❗ Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
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

export default StepLocation;
