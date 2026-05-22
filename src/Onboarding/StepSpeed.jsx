import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ ADDED

function StepSpeed() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ADDED

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const speeds = [
    {
      title: t("relaxed"), // ✅ UPDATED
      key: "relaxed",
      desc: t("relaxedDesc"),
    },
    {
      title: t("gradual"),
      key: "gradual",
      desc: t("gradualDesc"),
    },
    {
      title: t("steady"),
      key: "steady",
      desc: t("steadyDesc"),
    },
    {
      title: t("rapid"),
      key: "rapid",
      desc: t("rapidDesc"),
    },
  ];

  function next() {
    if (!selected) {
      setError(t("selectSpeedError")); // ✅ UPDATED
      return;
    }

    setError("");

    // ✅ STORE IN LOCALSTORAGE (store key, not text)
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
          {t("goalSpeedTitle")} {/* ✅ UPDATED */}
        </h1>

        <p className="text-gray-500 text-center mb-8">
          {t("goalSpeedSubtitle")} {/* ✅ UPDATED */}
        </p>

        <div className="space-y-4">
          {speeds.map((speed) => (
            <div
              key={speed.key}
              onClick={() => setSelected(speed.key)} // ✅ UPDATED
              className={`p-4 border rounded-xl cursor-pointer transition
              ${
                selected === speed.key // ✅ UPDATED
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
          {t("continue")} {/* ✅ UPDATED */}
        </button>
      </div>
    </div>
  );
}

export default StepSpeed;