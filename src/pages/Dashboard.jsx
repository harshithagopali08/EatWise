import { useEffect, useState } from "react";
import RecommendationPage from "./RecommendationPage";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState({});
  const [water, setWater] = useState(5);
  const [sleep, setSleep] = useState(7);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        const res = await fetch(
          `https://eat-wise-phi.vercel.app/_/backend/api/user/profile/${user.id}`,
        );
        const data = await res.json();

        setProfile(data);
        localStorage.setItem("profile", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    };

    const loadLocalProfile = () => {
      const saved = JSON.parse(localStorage.getItem("profile"));
      if (saved) setProfile(saved);
    };

    loadLocalProfile();
    fetchProfile();

    window.addEventListener("profileUpdated", loadLocalProfile);
    window.addEventListener("focus", fetchProfile);

    return () => {
      window.removeEventListener("profileUpdated", loadLocalProfile);
      window.removeEventListener("focus", fetchProfile);
    };
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
        <p className="font-semibold text-gray-700">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#F9FAFB]">
      {/* Greeting */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            profile.avatar ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          className="w-16 h-16 rounded-full border-4 border-[#06D6A0]"
        />
        <h1 className="text-3xl font-bold text-[#134611]">
          {t("hello")}, {profile.name || t("user")} 👋
        </h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-[#06D6A0]">
          <p className="text-gray-500">{t("height")}</p>
          <h2 className="text-xl font-bold text-[#134611]">
            {profile.height || "--"} cm
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-[#EF8A17]">
          <p className="text-gray-500">{t("weight")}</p>
          <h2 className="text-xl font-bold text-[#134611]">
            {profile.weight || "--"} kg
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-[#C6C013]">
          <p className="text-gray-500">{t("bmi")}</p>
          <h2 className="text-xl font-bold text-[#134611]">{bmi}</h2>
        </div>
      </div>

      {/* Circles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Circle value={water} max={10} label={t("water")} color="#06D6A0" />
        <Circle value={sleep} max={10} label={t("sleep")} color="#EF8A17" />
        <Circle value={bmi} max={40} label={t("bmi")} color="#C6C013" />
      </div>

      {/* AI Recommendation */}
      <div className="mt-6">
        <RecommendationPage />
      </div>

      {/* Controls */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-600">{t("waterIntake")}</p>
          <input
            type="range"
            min="0"
            max="10"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="w-full accent-[#06D6A0]"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-600">{t("sleep")}</p>
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
