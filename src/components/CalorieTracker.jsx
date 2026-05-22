import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import hi from "../locales/hi/translation.json";
import te from "../locales/te/translation.json";

const CalorieTracker = () => {
  const { t, i18n } = useTranslation();

  const [selectedFood, setSelectedFood] = useState(null);
  const [meal, setMeal] = useState("");
  const [foodList, setFoodList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [input, setInput] = useState("");
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  const dailyGoal = 2000;

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    if (!searchTerm.trim()) return;

    const fetchFoods = async () => {
      let searchKey = getFoodKey(searchTerm);

      // 🔥 if Hindi/Telugu → convert using JSON search
      if (i18n.language !== "en") {
        const matches = searchLocalFoods(searchTerm);

        if (matches.length > 0) {
          searchKey = matches[0]; // take best match
        }
      }

      const res = await fetch(
        `https://eat-wise-phi.vercel.app/api/foods?search=${searchKey}`,
      );

      const data = await res.json();
      setFoods(data);
    };

    fetchFoods();
  }, [searchTerm]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `https://eat-wise-phi.vercel.app/api/calorie-log/${user.id}`,
        );
        const data = await res.json();

        setFoodList(
          data.map((item) => ({
            name: item.food_name,
            meal: item.meal,
            calories: item.calories,
          })),
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchLogs();
  }, []);

  // 🔒 CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getFoodKey = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, ""); // 🔥 removes special chars
  };

  // ✅ MOVE HERE (GLOBAL INSIDE COMPONENT)

  const hindiLayout = {
    default: [
      "अ आ इ ई उ ऊ ए ऐ ओ औ",
      "क ख ग घ च छ ज झ",
      "ट ठ ड ढ त थ द ध",
      "प फ ब भ म य र ल व",
      "श ष स ह",
      "{bksp} {space}",
    ],
  };

  const teluguLayout = {
    default: [
      "అ ఆ ఇ ఈ ఉ ఊ ఎ ఏ ఐ ఓ ఔ",
      "క ఖ గ ఘ చ ఛ జ ఝ",
      "ట ఠ డ ఢ త థ ద ధ",
      "ప ఫ బ భ మ య ర ల వ",
      "శ ష స హ",
      "{bksp} {space}",
    ],
  };

  const getLayout = () => {
    if (i18n.language === "hi") return hindiLayout;
    if (i18n.language === "te") return teluguLayout;
    return null;
  };
  const convertToKey = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  };
  const reverseMap = {
    // OATS
    ओट्स: "oats_porridge",
    ఓట్స్: "oats_porridge",

    // RICE
    "ब्राउन राइस": "brown_rice",
    "బ్రౌన్ రైస్": "brown_rice",

    "नींबू चावल": "lemon_rice",
    "నిమ్మకాయ అన్నం": "lemon_rice",

    "जीरा राइस": "jeera_rice",
    "జీరా రైస్": "jeera_rice",

    "दही चावल": "curd_rice",
    "పెరుగు అన్నం": "curd_rice",

    पुलाव: "pulao",
    పులావ్: "pulao",

    "फ्राइड राइस": "fried_rice",
    "ఫ్రైడ్ రైస్": "fried_rice",

    // BREAKFAST
    उपमा: "upma",
    ఉప్మా: "upma",

    पराठा: "paratha",
    పరాటా: "paratha",

    रोटी: "roti",
    రోటి: "roti",

    नान: "naan",
    నాన్: "naan",

    "तंदूरी रोटी": "tandoori_roti",
    "తందూరి రోటీ": "tandoori_roti",

    // CURRIES
    "सब्ज़ी करी": "vegetable_curry",
    కూర: "vegetable_curry",

    राजमा: "rajma",
    రాజ్మా: "rajma",

    छोले: "chole",
    ఛోలే: "chole",

    "पनीर बटर मसाला": "paneer_butter_masala",
    "పనీర్ బట్టర్ మసాలా": "paneer_butter_masala",

    "पालक पनीर": "palak_paneer",
    "పాలక్ పనీర్": "palak_paneer",

    कढ़ी: "kadhi",
    కడీ: "kadhi",

    "मिक्स वेज सब्ज़ी": "mixed_veg_sabzi",
    "మిక్స్ వెజ్ కూర": "mixed_veg_sabzi",

    // NON-VEG
    "चिकन करी": "chicken_curry",
    "చికెన్ కర్రీ": "chicken_curry",

    "मटन करी": "mutton_curry",
    "మటన్ కర్రీ": "mutton_curry",

    "फिश करी": "fish_curry",
    "ఫిష్ కర్రీ": "fish_curry",

    "ग्रिल्ड फिश": "grilled_fish",
    "గ్రిల్డ్ ఫిష్": "grilled_fish",

    "चिकन टिक्का": "chicken_tikka",
    "చికెన్ టిక్కా": "chicken_tikka",

    "बटर चिकन": "butter_chicken",
    "బట్టర్ చికెన్": "butter_chicken",

    // BIRYANI
    "वेज बिरयानी": "biryani_veg",
    "వెజ్ బిర్యానీ": "biryani_veg",

    "चिकन बिरयानी": "biryani_chicken",
    "చికెన్ బిర్యానీ": "biryani_chicken",

    // DAL / LIGHT
    "दाल खिचड़ी": "dal_khichdi",
    "దాల్ ఖిచ్డీ": "dal_khichdi",

    दही: "curd",
    పెరుగు: "curd",

    मठा: "buttermilk",
    మజ్జిగ: "buttermilk",

    // SNACKS
    "वेज नूडल्स": "veg_noodles",
    "వెజ్ నూడుల్స్": "veg_noodles",

    "बैंगन भरता": "baingan_bharta",
    "వంకాయ భర్తా": "baingan_bharta",

    "भरवां शिमला मिर्च": "stuffed_capsicum",
    "స్టఫ్డ్ క్యాప్సికమ్": "stuffed_capsicum",

    "सोयाबीन करी": "soybean_curry",
    "సోయాబీన్ కర్రీ": "soybean_curry",

    // EGG
    "अंडा करी": "egg_curry",
    "గుడ్డు కర్రీ": "egg_curry",

    "अंडा भुर्जी": "egg_bhurji",
    "గుడ్డు భుర్జీ": "egg_bhurji",

    // PANEER
    "पनीर भुर्जी": "paneer_bhurji",
    "పనీర్ భుర్జీ": "paneer_bhurji",

    // COMMON
    सांभर: "sambar",
    సాంబార్: "sambar",
  };
  const searchLocalFoods = (input) => {
    const lang = i18n.language;

    let foodsObj = {};

    if (lang === "hi") foodsObj = hi.foods;
    if (lang === "te") foodsObj = te.foods;

    return Object.entries(foodsObj)
      .filter(([key, value]) =>
        value.toLowerCase().includes(input.toLowerCase()),
      )
      .map(([key]) => key);
  };
  // ➕ ADD FOOD
  const addFood = async () => {
    if (!selectedFood || !meal) {
      alert(`⚠️ ${t("selectFoodMeal")}`);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      aalert(`❌ ${t("userNotLogged")}`);
      return;
    }

    if (totalCalories >= dailyGoal) {
      alert(`🚫 ${t("limitReached")}`);
      return;
    }

    if (totalCalories + selectedFood.calories > dailyGoal) {
      alert(`⚠️ ${t("exceedLimit")} (${dailyGoal} kcal)`);
      return;
    }

    const newFood = {
      user_id: user.id,
      food_name: selectedFood.food_name,
      meal: meal,
      calories: selectedFood.calories,
    };

    try {
      const res = await fetch(
        "https://eat-wise-phi.vercel.app/api/calorie-log",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFood),
        },
      );

      const data = await res.json();
      console.log(data);

      setFoodList((prev) => [
        ...prev,
        {
          name: newFood.food_name,
          meal: newFood.meal,
          calories: newFood.calories,
        },
      ]);

      setSelectedFood(null);
      setSearchTerm("");
    } catch (err) {
      console.log(err);
    }
  };

  const totalCalories = foodList.reduce(
    (total, item) => total + item.calories,
    0,
  );

  const mealCalories = {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
  };

  foodList.forEach((item) => {
    mealCalories[item.meal] += item.calories;
  });

  // 🔵 BIG CIRCLE
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (totalCalories / dailyGoal) * circumference;

  // 🟡 MEAL CIRCLE
  const MealCircle = ({ label, value, color }) => {
    const r = 40;
    const c = 2 * Math.PI * r;
    const p = (value / 800) * c;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={r}
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
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

  // 🟢 MEAL DROPDOWN (UNCHANGED)
  const MealDropdown = () => {
    const [openMeal, setOpenMeal] = useState(false);
    return (
      <div className="relative w-full">
        <div
          onClick={() => setOpenMeal(!openMeal)}
          className="px-3 py-2 border rounded-xl cursor-pointer bg-white flex justify-between"
        >
          <span>{meal ? `🍳 ${t(meal.toLowerCase())}` : t("selectMeal")}</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        {openMeal && (
          <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-xl z-50">
            {["Breakfast", "Lunch", "Dinner"].map((item) => (
              <div
                key={item}
                onClick={() => {
                  setMeal(item);
                  setOpenMeal(false);
                }}
                className="px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                {t(item.toLowerCase())}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white/80 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">
        {t("calorie")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <MealDropdown />

            {/* 🔥 SINGLE FOOD INPUT */}
            <div ref={dropdownRef} className="relative w-full">
              <input
                id="searchInput" // ⭐ MUST ADD THIS
                type="text"
                value={
                  selectedFood
                    ? t(
                        `foods.${getFoodKey(selectedFood.food_name)}`,
                        selectedFood.food_name,
                      )
                    : searchTerm
                }
                placeholder={t("selectFood")}
                onFocus={() => setShowKeyboard(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setOpen(true);
                }}
                className="px-3 py-2 border rounded-xl w-full"
              />
              {showKeyboard && getLayout() && (
                <Keyboard
                  layout={getLayout()}
                  display={{
                    "{bksp}":
                      i18n.language === "hi"
                        ? "⌫ हटाएं"
                        : i18n.language === "te"
                          ? "⌫ తొలగించు"
                          : "⌫",

                    "{space}":
                      i18n.language === "hi"
                        ? "स्पेस"
                        : i18n.language === "te"
                          ? "ఖాళీ"
                          : "space",
                  }}
                  onChange={(val) => {
                    setSearchTerm(val);
                    setOpen(true);
                  }}
                />
              )}

              {open && (
                <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto">
                  {foods.length > 0 ? (
                    foods.map((food) => (
                      <div
                        key={food.food_name}
                        onClick={() => {
                          setSelectedFood(food);
                          setSearchTerm(food.food_name);
                          setOpen(false);
                          setShowKeyboard(false);
                        }}
                        className="px-3 py-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                      >
                        {t(
                          `foods.${getFoodKey(food.food_name)}`,
                          food.food_name,
                        )}{" "}
                        ({Math.round(food.calories)} kcal)
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">{t("noFood")}</div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={addFood}
              disabled={totalCalories >= dailyGoal}
              className={`py-2 rounded-xl text-white ${
                totalCalories >= dailyGoal
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500"
              }`}
            >
              {totalCalories >= dailyGoal ? "Limit Reached 🚫" : t("addFood")}
            </button>
          </div>

          {/* BIG CIRCLE */}
          <div className="mt-8 flex justify-center w-full">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="15"
                  fill="none"
                />
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

          <h3 className="mt-4 text-center">
            {t("totalCalories")}: {totalCalories} / {dailyGoal} kcal
          </h3>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <MealCircle
              label="🍳"
              value={mealCalories.Breakfast}
              color="#06D6A0"
            />
            <MealCircle label="🍛" value={mealCalories.Lunch} color="#C6C013" />
            <MealCircle
              label="🌙"
              value={mealCalories.Dinner}
              color="#EF8A17"
            />
          </div>

          <div className="flex justify-between px-6 text-yellow-600">
            <span>{t("breakfast")}</span>
            <span>{t("lunch")}</span>
            <span>{t("dinner")}</span>
          </div>

          <div className="mt-6 space-y-2 max-h-[250px] overflow-y-auto">
            {foodList.length === 0 ? (
              <p className="text-gray-400 text-center">{t("noFood")}</p>
            ) : (
              foodList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{t(`foods.${getFoodKey(item.name)}`, item.name)}</span>
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
