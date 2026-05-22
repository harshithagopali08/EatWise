import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function BMICalculator() {
  const { t } = useTranslation();

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");

  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBmi] = useState(null);
  const [animatedBmi, setAnimatedBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const categoryColor = {
    Underweight: "#EF8A17",
    Normal: "#06d26f",
    Overweight: "#C6C013",
    Obese: "#ed4b4b",
  };

  useEffect(() => {
    if (!weight) return;

    let heightMeters;

    if (heightUnit === "cm") {
      if (height <= 0) {
        setError(t("heightError"));
        return;
      }

      heightMeters = height / 100;
    } else {
      const totalInches = parseFloat(feet || 0) * 12 + parseFloat(inches || 0);

      if (totalInches <= 0) {
        setError(t("heightInvalid"));
        return;
      }

      heightMeters = totalInches * 0.0254;
    }

    if (weight <= 0) {
      setError(t("weightError"));
      return;
    }

    setError("");

    let weightKg = weightUnit === "kg" ? weight : weight * 0.453592;

    const result = weightKg / (heightMeters * heightMeters);
    const rounded = result.toFixed(1);

    setBmi(rounded);

    if (result < 18.5) setCategory("Underweight");
    else if (result < 25) setCategory("Normal");
    else if (result < 30) setCategory("Overweight");
    else setCategory("Obese");

    let start = 0;
    const duration = 700;
    const increment = result / (duration / 16);

    const animate = () => {
      start += increment;

      if (start < result) {
        setAnimatedBmi(start.toFixed(1));
        requestAnimationFrame(animate);
      } else {
        setAnimatedBmi(rounded);
      }
    };

    animate();
  }, [height, feet, inches, weight, heightUnit, weightUnit]);

  const radius = 75;
  const circumference = 2 * Math.PI * radius;

  const progress = bmi ? (Math.min(bmi, 40) / 40) * circumference : 0;

  const angle = bmi ? (Math.min(bmi, 40) / 40) * 360 : 0;

  const pointerX = 100 + radius * Math.cos(((angle - 90) * Math.PI) / 180);

  const pointerY = 100 + radius * Math.sin(((angle - 90) * Math.PI) / 180);

  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-8 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-green-900 text-center mb-6">
        {t("bmi")}
      </h2>

      {/* HEIGHT TOGGLE */}

      <div className="flex justify-center gap-3 mb-3">
        <button
          onClick={() => setHeightUnit("cm")}
          className={`px-4 py-1 rounded-full ${
            heightUnit === "cm"
              ? "bg-green-800 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          CM
        </button>

        <button
          onClick={() => setHeightUnit("ft")}
          className={`px-4 py-1 rounded-full ${
            heightUnit === "ft"
              ? "bg-green-800 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          FT/IN
        </button>
      </div>

      {/* HEIGHT INPUT */}

      {heightUnit === "cm" ? (
        <input
          type="number"
          placeholder={`${t("height")} (cm)`}
          className="w-full border border-gray-200 rounded-lg p-3 mb-3"
          onChange={(e) => setHeight(e.target.value)}
        />
      ) : (
        <div className="flex gap-3 mb-3">
          <input
            type="number"
            placeholder={t("feet")}
            className="w-full border border-gray-200 rounded-lg p-3"
            onChange={(e) => setFeet(e.target.value)}
          />

          <input
            type="number"
            placeholder={t("inches")}
            className="w-full border border-gray-200 rounded-lg p-3"
            onChange={(e) => setInches(e.target.value)}
          />
        </div>
      )}

      {/* WEIGHT TOGGLE */}

      <div className="flex justify-center gap-3 mb-3">
        <button
          onClick={() => setWeightUnit("kg")}
          className={`px-4 py-1 rounded-full ${
            weightUnit === "kg"
              ? "bg-green-800 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          KG
        </button>

        <button
          onClick={() => setWeightUnit("lbs")}
          className={`px-4 py-1 rounded-full ${
            weightUnit === "lbs"
              ? "bg-green-800 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          LBS
        </button>
      </div>

      <input
        type="number"
        placeholder={`${t("weight")} (${weightUnit})`}
        className="w-full border border-gray-200 rounded-lg p-3"
        onChange={(e) => setWeight(e.target.value)}
      />

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mt-3 rounded">{error}</div>
      )}

      {/* BMI METER */}

      {bmi && !error && (
        <div className="mt-8 text-center">
          <div className="relative w-44 h-44 mx-auto">
            <svg viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="16"
                fill="none"
              />

              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={categoryColor[category]}
                strokeWidth="16"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                transform="rotate(-90 100 100)"
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />

              <circle
                cx={pointerX}
                cy={pointerY}
                r="6"
                fill={categoryColor[category]}
                style={{ transition: "all 1s ease" }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-green-900">{animatedBmi}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 text-sm mt-5 flex-wrap">
            <span
              className={`px-2 py-1 rounded ${category === "Underweight" ? "bg-orange-100 text-orange-600 font-semibold" : ""}`}
            >
              {t("underweight")}
            </span>

            <span
              className={`px-2 py-1 rounded ${category === "Normal" ? "bg-green-100 text-green-600 font-semibold" : ""}`}
            >
              {t("normal")}
            </span>

            <span
              className={`px-2 py-1 rounded ${category === "Overweight" ? "bg-yellow-100 text-yellow-600 font-semibold" : ""}`}
            >
              {t("overweight")}
            </span>

            <span
              className={`px-2 py-1 rounded ${category === "Obese" ? "bg-red-200 text-red-500 font-semibold" : ""}`}
            >
              {t("obese")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
