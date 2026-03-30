import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("cm");

  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const [error, setError] = useState("");

  // ✅ PRE-FILL NAME FROM SIGNUP (important UX fix)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setName(user.name);
    }
  }, []);

  function next() {
    console.log("Clicked Continue"); // 🔥 debug

    if (!name || !gender) {
      setError("Please fill all details");
      return;
    }

    let finalHeight = "";

    if (unit === "cm") {
      if (!heightCm || Number(heightCm) <= 0) {
        setError("Please enter valid height in cm");
        return;
      }
      finalHeight = heightCm;
    } else {
      if (!feet || !inches) {
        setError("Please enter feet and inches");
        return;
      }

      const totalInches = Number(feet) * 12 + Number(inches);
      finalHeight = (totalInches * 2.54).toFixed(1);
    }

    setError("");

    // ✅ STORE DATA (important for backend later)
    localStorage.setItem("name", name);
    localStorage.setItem("gender", gender);
    localStorage.setItem("height", finalHeight);

    // ✅ Update user object (important for StepMedical)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.name = name;
      localStorage.setItem("user", JSON.stringify(user));
    }

    console.log("Navigating to next page..."); // 🔥 debug

    // ✅ NAVIGATION (your issue fix)
    navigate("/onboarding/goal");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Tell Us About You
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Help us personalize your experience
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-[#134611] font-semibold mb-2">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#06D6A0]"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-[#134611] font-semibold mb-2">
            Gender
          </label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-[#134611] font-semibold mb-2">
            Height
          </label>

          <div className="flex gap-4 mb-3">
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`px-4 py-2 rounded-lg border ${
                unit === "cm" ? "bg-[#134611] text-white" : "bg-white"
              }`}
            >
              cm
            </button>

            <button
              type="button"
              onClick={() => setUnit("ft")}
              className={`px-4 py-2 rounded-lg border ${
                unit === "ft" ? "bg-[#134611] text-white" : "bg-white"
              }`}
            >
              ft/in
            </button>
          </div>

          {/* CM */}
          {unit === "cm" && (
            <input
              type="number"
              placeholder="Enter height in cm"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          )}

          {/* FT/IN */}
          {unit === "ft" && (
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg p-3"
              />

              <input
                type="number"
                placeholder="Inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-lg p-3"
              />
            </div>
          )}
        </div>

        {/* Continue */}
        <button
          onClick={next}
          className="w-full bg-[#EF8A17] hover:bg-[#e07810]
          text-white py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
