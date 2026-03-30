import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StepLanguage() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("");
  const [error, setError] = useState(""); // ✅ added

  function next() {
    if (!language) {
      setError("Please select your preferred language"); // ❌ removed alert
      return;
    }

    setError("");

    // ✅ STORE IN LOCALSTORAGE
    localStorage.setItem("language", language);

    navigate("/onboarding/weight");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Preferred Language
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Which language do you prefer to use?
        </p>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <label className="block text-[#134611] font-semibold mb-3">
            Select Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#06D6A0]"
          >
            <option value="">Choose Language</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
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

export default StepLanguage;
