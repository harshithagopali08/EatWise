import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );
  const [showAvatar, setShowAvatar] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) {
      setName(saved.name || "");
      setAge(saved.age || "");
      setWeight(saved.weight || "");
      setHeight(saved.height || "");
      setAvatar(saved.avatar || avatar);
    }
  }, []);

  const bmi =
    weight && height
      ? (weight / ((height / 100) * (height / 100))).toFixed(1)
      : 0;

  const handleSave = () => {
    const data = { name, age, weight, height, avatar };
    localStorage.setItem("profile", JSON.stringify(data));
    window.dispatchEvent(new Event("profileUpdated"));

    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
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
          Profile
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
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#06D6A0]"
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#06D6A0]"
          />
        </div>

        {/* BMI */}
        <div className="mt-6 bg-[#134611] text-white p-4 rounded-xl text-center">
          <p>Your BMI</p>
          <h2 className="text-2xl font-bold">{bmi}</h2>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-[#06D6A0] text-white py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Save Profile
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