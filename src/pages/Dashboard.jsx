import { useEffect, useState } from "react";

export default function Dashboard() {
  const [profile, setProfile] = useState({});
  const [water, setWater] = useState(5);
  const [sleep, setSleep] = useState(7);

  const weeklyCalories = [1800, 2000, 1500, 2200, 2100, 1900, 2300];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const loadProfile = () => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setProfile(saved);
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  const bmi =
    profile.weight && profile.height
      ? (
          profile.weight /
          ((profile.height / 100) * (profile.height / 100))
        ).toFixed(1)
      : 0;

  const Circle = ({ value, max, label, color }) => {
    const percent = (value / max) * 100;
    const stroke = 2 * Math.PI * 40;

    return (
      <div className="flex flex-col items-center hover:scale-105 transition">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={stroke}
            strokeDashoffset={stroke - (stroke * percent) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <p className="font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    );
  };

  return (
    <div
      className="p-4 md:p-6 min-h-screen 
    bg-[#F9FAFB] dark:bg-[#0f172a] transition-colors duration-300"
    >
      {/* Greeting */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.avatar}
          className="w-16 h-16 rounded-full border-4 border-[#06D6A0]"
        />
        <h1 className="text-3xl font-bold text-[#134611] dark:text-white">
          Hello, {profile.name || "User"} 👋
        </h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-[#06D6A0]">
          <p className="text-gray-500 dark:text-gray-400">Height</p>
          <h2 className="text-xl font-bold text-[#134611] dark:text-white">
            {profile.height || "--"} cm
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-[#EF8A17]">
          <p className="text-gray-500 dark:text-gray-400">Weight</p>
          <h2 className="text-xl font-bold text-[#134611] dark:text-white">
            {profile.weight || "--"} kg
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow hover:shadow-lg transition border-l-4 border-[#C6C013]">
          <p className="text-gray-500 dark:text-gray-400">BMI</p>
          <h2 className="text-xl font-bold text-[#134611] dark:text-white">
            {bmi}
          </h2>
        </div>
      </div>

      {/* Circles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Circle value={water} max={10} label="Water" color="#06D6A0" />
        <Circle value={sleep} max={10} label="Sleep" color="#EF8A17" />
        <Circle value={bmi} max={40} label="BMI" color="#C6C013" />
      </div>

      {/* Calories */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-4 text-[#134611] dark:text-white">
          Weekly Calories
        </h2>

        <div className="flex items-end gap-4 h-40">
          {weeklyCalories.map((cal, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className="w-6 bg-[#06D6A0] rounded-t"
                style={{ height: `${cal / 20}px` }}
              ></div>

              <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                {days[i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow">
          <p className="text-gray-600 dark:text-gray-400">Water Intake</p>
          <input
            type="range"
            min="0"
            max="10"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="w-full accent-[#06D6A0]"
          />
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow">
          <p className="text-gray-600 dark:text-gray-400">Sleep</p>
          <input
            type="range"
            min="0"
            max="10"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="w-full accent-[#EF8A17]"
          />
        </div>
      </div>
    </div>
  );
}
