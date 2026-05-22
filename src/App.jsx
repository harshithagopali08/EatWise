import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

/* MEMBER 1 PAGES */
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";

/* ONBOARDING */
import StepGoal from "./Onboarding/StepGoal";
import StepAge from "./Onboarding/StepAge";
import StepLocation from "./Onboarding/StepLocation";
import StepLanguage from "./Onboarding/StepLanguage";
import StepWeight from "./Onboarding/StepWeight";
import StepTargetWeight from "./Onboarding/StepTargetWeight";
import StepSpeed from "./Onboarding/StepSpeed";
import StepMedical from "./Onboarding/StepMedical";

/* COMPONENTS */
import Sidebar from "./components/Sidebar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Chatbot from "./components/Chatbot";

/* MEMBER 2 & 3 PAGES */
import Profile from "./pages/Profile";
import MealPlan from "./pages/MealPlan";
import CaloriePage from "./pages/CaloriePage";
import BMIPage from "./pages/BMIPage";

/* ================== DASHBOARD LAYOUT ================== */

function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* GLOBAL FEATURES */}
      <LanguageSwitcher />
      <Chatbot />

      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar setPage={(page) => navigate(`/${page}`)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mealplan" element={<MealPlan />} />
          <Route path="calorie" element={<CaloriePage />} />
          <Route path="bmi" element={<BMIPage />} />
        </Routes>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow md:hidden flex justify-around p-3">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/mealplan")}>Meal</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
      </div>
    </div>
  );
}

/* ================== MAIN APP ================== */

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* USER DETAILS */}
        <Route path="/user-details" element={<UserDetails />} />

        {/* ONBOARDING */}
        <Route path="/onboarding/goal" element={<StepGoal />} />
        <Route path="/onboarding/age" element={<StepAge />} />
        <Route path="/onboarding/location" element={<StepLocation />} />
        <Route path="/onboarding/language" element={<StepLanguage />} />
        <Route path="/onboarding/weight" element={<StepWeight />} />
        <Route
          path="/onboarding/target-weight"
          element={<StepTargetWeight />}
        />
        <Route path="/onboarding/speed" element={<StepSpeed />} />
        <Route path="/onboarding/medical" element={<StepMedical />} />

        {/* DASHBOARD */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}
