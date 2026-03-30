import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LayoutDashboard,
  Utensils,
  Apple,
  User,
} from "lucide-react";

export default function Sidebar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (page) => {
    setPage(page);
    setActive(page);
    setIsOpen(false);
  };

  // 🔥 Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // 🔥 Toggle theme
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { name: "Meal Plan", key: "mealplan", icon: Utensils },
    { name: "Profile", key: "profile", icon: User },
  ];

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
        <h1 className="text-xl font-bold text-[#134611] dark:text-white">
          EatWise
        </h1>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* 🔹 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full ${
          collapsed ? "w-20" : "w-64"
        }
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        p-4 z-50 transform transition-all duration-300 shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h1 className="text-2xl font-extrabold text-[#134611] dark:text-white">
              EatWise
            </h1>
          )}

          <div className="flex items-center gap-2">
            {/* 🔥 THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Collapse */}
            <button
              className="hidden md:block"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            {/* Mobile close */}
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <X size={26} />
            </button>
          </div>
        </div>

        {/* 🔹 Menu */}
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.key}
                onClick={() => handleClick(item.key)}
                className={`group flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all duration-300
                ${
                  active === item.key
                    ? "bg-[#06D6A0] text-white font-semibold shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-[#06D6A0]/10 hover:text-[#134611] dark:hover:text-white"
                }`}
              >
                <Icon size={20} className="group-hover:scale-110 transition" />

                {!collapsed && (
                  <span className="tracking-wide">{item.name}</span>
                )}
              </li>
            );
          })}
        </ul>

        {/* 🔹 Bottom */}
        {!collapsed && (
          <div className="mt-10 text-sm text-gray-500 dark:text-gray-400 text-center">
            Stay Healthy
            <div className="mt-2 h-1 w-16 mx-auto bg-[#06D6A0] rounded-full"></div>
          </div>
        )}
      </div>
    </>
  );
}
