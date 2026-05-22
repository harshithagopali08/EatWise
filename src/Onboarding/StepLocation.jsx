import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ ADDED

function StepLocation() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ADDED

  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const states = [
  { key: "andhraPradesh", value: "Andhra Pradesh" },
  { key: "telangana", value: "Telangana" },
  { key: "tamilNadu", value: "Tamil Nadu" },
  { key: "karnataka", value: "Karnataka" },
  { key: "kerala", value: "Kerala" },
  { key: "maharashtra", value: "Maharashtra" },
  { key: "delhi", value: "Delhi" },
  { key: "westBengal", value: "West Bengal" },
  { key: "gujarat", value: "Gujarat" },
  { key: "rajasthan", value: "Rajasthan" },
];  
  function next() {
    if (!state) {
      setError(t("selectStateError")); // ✅ UPDATED
      return;
    }

    setError("");

    // ✅ Store as combined location
    const location = `India - ${state}`;
    localStorage.setItem("location", location);

    navigate("/onboarding/weight");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          {t("locationTitle")} {/* ✅ UPDATED */}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          {t("locationSubtitle")} {/* ✅ UPDATED */}
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          {/* Country */}
          <label className="block text-[#134611] font-semibold mb-2">
            {t("country")} {/* ✅ UPDATED */}
          </label>

          <input
            value="India"
            disabled
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 mb-4"
          />

          {/* State Dropdown */}
          <label className="block text-[#134611] font-semibold mb-2">
            {t("state")} {/* ✅ UPDATED */}
          </label>

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#06D6A0]"
          >
            <option value="">
              {t("state")} {/* ✅ UPDATED */}
            </option>
           {states.map((s) => (
  <option key={s.key} value={s.value}>
    {t(s.key)}
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
          {t("continue")} {/* ✅ UPDATED */}
        </button>
      </div>
    </div>
  );
}

export default StepLocation;