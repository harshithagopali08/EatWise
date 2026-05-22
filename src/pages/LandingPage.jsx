import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6fff8] via-[#fffaf0] to-[#e9f5ee] text-[#344e41]">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-5 bg-[#f6fff8] border-b border-[#e6f2ec]">
        <h1 className="text-2xl font-bold text-[#134611]">EatWise</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="border border-[#2d6a4f] text-[#2d6a4f] px-5 py-2 rounded-lg hover:bg-[#e9f5ee]"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-[#f4a261] text-white px-5 py-2 rounded-lg hover:bg-[#e76f51]"
          >
            Create Account
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex items-center justify-between px-12 py-16 gap-10">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight text-[#134611]">
            Eat Smarter
            <span className="text-[#f4a261]"> Live Healthier</span>
          </h1>

          <p className="mt-6 text-lg">
            EatWise helps you track your nutrition, monitor meals and receive
            smart health recommendations tailored to your lifestyle.
          </p>

          <div className="flex gap-5 mt-10">
            <button
              onClick={() => navigate("/signup")}
              className="bg-[#2d6a4f] text-white px-8 py-3 rounded-xl hover:bg-[#1b4332]"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-[#95d5b2] text-[#134611] px-8 py-3 rounded-xl hover:bg-[#74c69d]"
            >
              Login
            </button>
          </div>
        </div>

        <img
          src="hero.png"
          alt="Healthy meal"
          className="w-full max-w-lg"
        />
      </section>

      {/* FEATURES */}
      <section className="px-12 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#134611]">
            Your Personal Nutrition Companion
          </h2>

          <p className="mt-4 text-gray-600">
            Track meals, monitor nutrition and stay on top of your health goals
            with EatWise.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="bg-[#e9f5ee] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#2d6a4f]">
              Smart Meal Tracking
            </h3>
            <p className="mt-3 text-gray-600">
              Log meals and monitor your daily calorie intake.
            </p>
          </div>

          <div className="bg-[#fffaf0] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#f4a261]">
              Nutrition Insights
            </h3>
            <p className="mt-3 text-gray-600">
              Understand the nutritional value of your meals.
            </p>
          </div>

          <div className="bg-[#f0fdf7] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#40916c]">
              Health Progress
            </h3>
            <p className="mt-3 text-gray-600">
              Track progress toward your weight and fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="flex items-center justify-between px-12 py-16 gap-10">
        <img
          src="app-preview.png"
          alt="EatWise App"
          className="w-full max-w-md"
        />

        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-[#134611]">
            Track Your Meals
            <span className="text-[#f4a261]"> Effortlessly</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            EatWise helps you monitor calories, nutrition and meal habits to
            maintain a healthier lifestyle.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#134611] text-white px-12 py-12">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold">EatWise</h2>
            <p className="mt-4 text-gray-300 text-sm">
              Your smart nutrition companion helping you build better eating
              habits.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Meal Tracking</li>
              <li>Nutrition Insights</li>
              <li>Health Progress</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Health Blog</li>
              <li>Fitness Tips</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">support@eatwise.com</p>
            <p className="text-sm mt-2">+91 9000000000</p>
          </div>
        </div>

        <div className="border-t border-[#2d6a4f] mt-8 pt-5 text-center text-sm text-gray-400">
          © 2026 EatWise
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
