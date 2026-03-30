import { useState, useRef } from "react";

export default function MealPlan() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [viewHistory, setViewHistory] = useState(false);
  const [visibleStart, setVisibleStart] = useState(0);
  const [mealHistory, setMealHistory] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  const fileRefs = {
    breakfast: useRef(),
    lunch: useRef(),
    snack: useRef(),
    dinner: useRef(),
  };

  const getNutrition = () => ({
    calories: Math.floor(Math.random() * 300 + 100),
    protein: Math.floor(Math.random() * 20 + 5),
    carbs: Math.floor(Math.random() * 50 + 20),
    fats: Math.floor(Math.random() * 15 + 5),
  });

  const mealImages = {
    breakfast: "https://assets.gqindia.com/photos/5edf9ea70f82d6d3cee5f0b1/16:9/w_1920,c_limit/5-delicious-South-Indian-breakfast-recipes-that-you-can-easily-make-at-home.jpg",
    lunch: "https://img.freepik.com/premium-photo/traditional-south-indian-meal-food-served-big-banana-leaf-food-platter-complete-thali-selective-focus_466689-50856.jpg?w=2000",
    snack: "https://static.toiimg.com/photo/msid-59217136/59217136.cms",
    dinner: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/vegetarian-indian-dinner-recipes.jpg",
  };

  const mealData = [
    { key: "breakfast", title: "Breakfast" },
    { key: "lunch", title: "Lunch" },
    { key: "snack", title: "Snacks" },
    { key: "dinner", title: "Dinner" },
  ];

  const getDateKey = (date) =>
    new Date(date).toISOString().split("T")[0];

  const changeDay = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDay(day);
    setCurrentDate(newDate);
  };

  // ✅ FIXED UPLOAD (added dateKey)
  const handleUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const dateKey = getDateKey(currentDate);
    const existing = mealHistory[dateKey]?.[key] || [];

    if (existing.length >= 5) {
      alert("Maximum 5 uploads allowed per category");
      return;
    }

    const entry = {
      id: Date.now(),
      img: URL.createObjectURL(file),
      name: file.name,
      date: currentDate.toDateString(),
      dateKey: dateKey, // ✅ IMPORTANT FIX
      time: new Date().toLocaleTimeString(),
      nutrition: getNutrition(),
    };

    const updated = {
      ...mealHistory,
      [dateKey]: {
        ...(mealHistory[dateKey] || {}),
        [key]: [...existing, entry],
      },
    };

    setMealHistory(updated);
    alert("Image uploaded successfully");
  };

  // ✅ FIXED DELETE (WORKING)
  const handleDelete = (dateKey, mealKey, id) => {
    const updated = { ...mealHistory };

    if (!updated[dateKey] || !updated[dateKey][mealKey]) return;

    updated[dateKey][mealKey] = updated[dateKey][mealKey].filter(
      (item) => item.id !== id
    );

    setMealHistory(updated);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDay(1);
    setVisibleStart(0);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const visibleDays = days.slice(visibleStart, visibleStart + 5);

  const nextDays = () => {
    if (visibleStart + 5 < days.length)
      setVisibleStart(visibleStart + 5);
  };

  const prevDays = () => {
    if (visibleStart - 5 >= 0)
      setVisibleStart(visibleStart - 5);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#134611]">
          MealTracker
        </h1>

        <button
          onClick={() => setViewHistory(!viewHistory)}
          className="bg-[#EF8A17] text-white px-5 py-2 rounded-full"
        >
          {viewHistory ? "Back" : "History"}
        </button>
      </div>

      {/* CALENDAR */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-6 mb-3">
          <button onClick={() => changeMonth(-1)}>‹</button>

          <h2 className="text-lg font-medium text-[#134611]">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button onClick={() => changeMonth(1)}>›</button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={prevDays}>‹</button>

          {visibleDays.map((d) => (
            <div
              key={d}
              onClick={() => changeDay(d)}
              className={`px-3 py-2 rounded-full text-sm cursor-pointer ${
                selectedDay === d
                  ? "bg-[#06D6A0] text-white"
                  : "bg-white shadow"
              }`}
            >
              {d}
            </div>
          ))}

          <button onClick={nextDays}>›</button>
        </div>
      </div>

      {/* MAIN */}
      {!viewHistory ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto">
          {mealData.map((meal) => (
            <div key={meal.key} className="bg-white p-4 rounded-xl shadow">
              <img
                src={mealImages[meal.key]}
                className="h-36 w-full object-cover rounded-lg"
              />
              <h2 className="mt-2 text-[#134611] font-semibold">
                {meal.title}
              </h2>

              <button
                onClick={() => fileRefs[meal.key].current.click()}
                className="mt-2 bg-[#06D6A0] text-white px-3 py-1 rounded"
              >
                + Add
              </button>

              <input
                type="file"
                hidden
                ref={fileRefs[meal.key]}
                onChange={(e) => handleUpload(e, meal.key)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">

          {mealData.map((meal) => {
            const allItems = Object.values(mealHistory).flatMap(
              (m) => m[meal.key] || []
            );

            return (
              <div key={meal.key} className="mb-6">

                <h3 className="text-[#134611] font-semibold mb-2">
                  {meal.title}
                </h3>

                {allItems.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No records yet
                  </p>
                ) : (
                  <div className="flex gap-3">

                    {allItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-32 bg-white p-2 rounded shadow"
                      >
                        <img
                          src={item.img}
                          className="h-20 w-full object-cover rounded cursor-pointer"
                          onClick={() => setSelectedItem(item)}
                        />

                        {/* ✅ FIXED DELETE BUTTON */}
                        <button
                          onClick={() =>
                            handleDelete(item.dateKey, meal.key, item.id)
                          }
                          className="text-red-500 text-xs mt-1"
                        >
                          Delete
                        </button>

                      </div>
                    ))}

                  </div>
                )}
              </div>
            );
          })}

        </div>
      )}

      {/* POPUP */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-72">

            <img
              src={selectedItem.img}
              className="w-full h-28 object-cover rounded"
            />

            <p className="mt-2 font-semibold">{selectedItem.name}</p>
            <p className="text-sm">{selectedItem.date}</p>
            <p className="text-sm">{selectedItem.time}</p>

            <div className="text-sm mt-2">
              🔥 {selectedItem.nutrition.calories} kcal <br />
              💪 {selectedItem.nutrition.protein}g protein <br />
              🍞 {selectedItem.nutrition.carbs}g carbs <br />
              🧈 {selectedItem.nutrition.fats}g fats
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-3 bg-[#EF8A17] text-white px-4 py-1 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}