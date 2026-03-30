import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CalorieTracker = () => {
  const { t } = useTranslation();

  const foodDatabase = {
    idli: 58,
    dosa: 133,
    rice: 200,
    chapati: 104,
    paneer: 265,
    dal: 120,
    banana: 105,
    apple: 95
  };

  const [selectedFood, setSelectedFood] = useState("");
  const [meal, setMeal] = useState("");
  const [foodList, setFoodList] = useState([]);

  const dailyGoal = 2000;

  const addFood = () => {
    if (!selectedFood || !meal) return;

    const newFood = {
      name: selectedFood,
      meal: meal,
      calories: foodDatabase[selectedFood]
    };

    setFoodList([...foodList, newFood]);
  };

  const totalCalories = foodList.reduce(
    (total, item) => total + item.calories,
    0
  );

  const mealCalories = {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0
  };

  foodList.forEach(item => {
    mealCalories[item.meal] += item.calories;
  });

  // 🔵 Big Circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (totalCalories / dailyGoal) * circumference;

  // 🟡 Meal Circle
  const MealCircle = ({ label, value, color }) => {
    const r = 40;
    const c = 2 * Math.PI * r;
    const p = (value / 800) * c;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={r} stroke="#e5e7eb" strokeWidth="12" fill="none" />
            <circle
              cx="100"
              cy="100"
              r={r}
              stroke={color}
              strokeWidth="12"
              fill="none"
              strokeDasharray={c}
              strokeDashoffset={c - p}
              transform="rotate(-90 100 100)"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center font-semibold">
            {value}
          </div>
        </div>

        <p className="text-xl">{label}</p>
      </div>
    );
  };

  // 🟢 Dropdown
  const CustomDropdown = ({ options, value, onChange, placeholder, type }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = React.useRef();

    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getIcon = (item) => {
      if (type === "meal") {
        if (item === "Breakfast") return "🍳";
        if (item === "Lunch") return "🍛";
        if (item === "Dinner") return "🌙";
      }
      return "";
    };

    return (
      <div ref={dropdownRef} className="relative w-full">
        <div
          onClick={() => setOpen(!open)}
          className="px-3 py-2 border rounded-xl cursor-pointer bg-white flex justify-between"
        >
          <span>
            {value ? `${getIcon(value)} ${t(value.toLowerCase())}` : placeholder}
          </span>
         <span
  className={`transition-transform ${open ? "rotate-180" : ""}`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</span>

        </div>

        {open && (
          <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-xl z-50">
            {options.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                {getIcon(item)} {t(item.toLowerCase())}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white/80 rounded-3xl shadow-xl">

      {/* 🔥 Heading */}
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
        {t("calorie")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* ✅ LEFT SIDE */}
        <div className="flex-1 flex flex-col items-center">

          {/* Dropdowns */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <CustomDropdown
              options={["Breakfast", "Lunch", "Dinner"]}
              value={meal}
              placeholder={t("selectMeal")}
              onChange={setMeal}
              type="meal"
            />

            <CustomDropdown
              options={Object.keys(foodDatabase)}
              value={selectedFood}
              placeholder={t("selectFood")}
              onChange={setSelectedFood}
            />

            <button
              onClick={addFood}
              className="bg-orange-500 text-white py-2 rounded-xl"
            >
              {t("addFood")}
            </button>
          </div>

          {/* Big Circle */}
          <div className="mt-8 flex justify-center w-full">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} stroke="#e5e7eb" strokeWidth="15" fill="none" />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#EF8A17"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  transform="rotate(-90 100 100)"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold">{totalCalories}</p>
                <p className="text-sm">kcal</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <h3 className="mt-4 text-center">
            {t("totalCalories")}: {totalCalories} / {dailyGoal} kcal
          </h3>

        </div>

        {/* ✅ RIGHT SIDE */}
        <div className="flex-1">

          {/* Small Circles */}
          <div className="flex justify-between mb-4">
            <MealCircle label="🍳" value={mealCalories.Breakfast} color="#06D6A0" />
            <MealCircle label="🍛" value={mealCalories.Lunch} color="#C6C013" />
            <MealCircle label="🌙" value={mealCalories.Dinner} color="#EF8A17" />
          </div>

          {/* Labels */}
          <div className="flex justify-between px-6 text-yellow-600">
            <span>{t("breakfast")}</span>
            <span>{t("lunch")}</span>
            <span>{t("dinner")}</span>
          </div>

          {/* Food List */}
          <div className="mt-6 space-y-2 max-h-[250px] overflow-y-auto">
            {foodList.length === 0 ? (
              <p className="text-gray-400 text-center">{t("noFood")}</p>
            ) : (
              foodList.map((item, index) => (
                <div key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                  <span>{t(item.name)}</span>
                  <span className="text-orange-500">{item.calories} kcal</span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default CalorieTracker;