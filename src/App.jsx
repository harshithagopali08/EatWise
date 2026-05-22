import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


/* PAGES */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";

/* ONBOARDING */
import StepLanguage from "./Onboarding/StepLanguage";
import StepGoal from "./Onboarding/StepGoal";
import StepAge from "./Onboarding/StepAge";
import StepLocation from "./Onboarding/StepLocation";

import StepWeight from "./Onboarding/StepWeight";
import StepTargetWeight from "./Onboarding/StepTargetWeight";
import StepSpeed from "./Onboarding/StepSpeed";
import StepMedical from "./Onboarding/StepMedical";

/* COMPONENTS */
import Sidebar from "./components/Sidebar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Chatbot from "./components/Chatbot";

/* OTHER PAGES */
import Profile from "./pages/Profile";
import MealPlan from "./pages/MealPlan";
import CaloriePage from "./pages/CaloriePage";
import BMIPage from "./pages/BMIPage";
/*=========LANGUAGE SWITCHER===================*/
import { useEffect } from "react";
import { useTranslation } from "react-i18next";



/* ================== LAYOUT ================== */

function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <LanguageSwitcher />
      <Chatbot />

      <div className="hidden md:block">
        <Sidebar setPage={(page) => navigate(`/${page}`)} />
      </div>

      <div className="flex-1 p-6">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mealplan" element={<MealPlan />} />
          <Route path="calorie" element={<CaloriePage />} />
          <Route path="bmi" element={<BMIPage />} />
        </Routes>
      </div>
    </div>
  );
}

/* ================== MAIN APP ================== */

export default function App() {
  const { i18n } = useTranslation();

useEffect(() => {
  const savedLang = localStorage.getItem("language");

  // ❌ Only apply if onboarding is completed
  const isOnboarded = localStorage.getItem("onboarded");

  if (savedLang && isOnboarded === "true") {
    let langCode = "en";

    if (savedLang === "Hindi") langCode = "hi";
    if (savedLang === "Telugu") langCode = "te";

    i18n.changeLanguage(langCode);
  }
}, []);

  return (
    <Router> {/* 🔥 MAIN FIX */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding/language" element={<StepLanguage />} />
        <Route path="/user-details" element={<UserDetails />} />

        <Route path="/onboarding/goal" element={<StepGoal />} />
        <Route path="/onboarding/age" element={<StepAge />} />
        <Route path="/onboarding/location" element={<StepLocation />} />
        <Route path="/onboarding/language" element={<StepLanguage />} />
        <Route path="/onboarding/weight" element={<StepWeight />} />
        <Route path="/onboarding/target-weight" element={<StepTargetWeight />} />
        <Route path="/onboarding/speed" element={<StepSpeed />} />
        <Route path="/onboarding/medical" element={<StepMedical />} />

        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}