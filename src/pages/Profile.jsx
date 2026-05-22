import { useState, useEffect } from "react";
import BMICalculator from "../components/BMICalculator";

import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  );
  const [showAvatar, setShowAvatar] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) return;

        const res = await fetch(
          `https://eatwise-backend-39j2.onrender.com/api/user/profile/${user.id}`,
        );

        const data = await res.json();

        setName(data.name || "");
        setAge(data.age || "");
        setWeight(data.weight || "");
        setHeight(data.height || "");
        setAvatar(data.avatar || avatar);

        // ✅ ADD THIS (sync with localStorage for dashboard)
        localStorage.setItem("profile", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const updatedData = {
        name,
        age,
        weight,
        height,
        avatar,
      };

      const res = await fetch(
        `https://eatwise-backend-39j2.onrender.com/api/user/profile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (res.ok) {
        // ✅ ADD THIS (KEY FIX)
        localStorage.setItem("profile", JSON.stringify(updatedData));

        // ✅ ADD THIS (REAL-TIME UPDATE)
        window.dispatchEvent(new Event("profileUpdated"));

        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const avatars = [
    "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center p-4">
      <div className="w-full max-w-md md:max-w-2xl bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#134611]">
          {t("profile")}
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center relative group">
          <img
            src={avatar}
            className="w-24 h-24 rounded-full border-4 border-[#06D6A0] shadow-md transition group-hover:scale-110"
          />

          <button
            onClick={() => setShowAvatar(!showAvatar)}
            className="absolute bottom-0 right-1 bg-[#EF8A17] text-white p-2 rounded-full hover:scale-125 shadow"
          >
            ✏️
          </button>
        </div>

        {showAvatar && (
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {avatars.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => {
                  setAvatar(img);
                  setShowAvatar(false);
                }}
                className="w-14 h-14 rounded-full cursor-pointer border-2 hover:scale-125 hover:border-[#06D6A0]"
              />
            ))}
          </div>
        )}

        {/* Inputs */}
        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#EF8A17]"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#EF8A17]"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#EF8A17]"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#EF8A17]"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <BMICalculator weight={weight} height={height} />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-[#06D6A0] text-white py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          {t("saveProfile")}
        </button>

        {savedMsg && (
          <p className="text-[#134611] text-center mt-3 font-semibold">
            Saved Successfully ✅
          </p>
        )}
      </div>
    </div>
  );
}
