import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Utensils,
  Apple,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  const handleClick = (page) => {
    setPage(page);
    setActive(page);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { name: "Meal Plan", key: "mealplan", icon: Utensils },
    { name: "Calorie Tracker", key: "calorie", icon: Apple },
    { name: "Profile", key: "profile", icon: User },
  ];

  return (
    <>
      {/* Mobile Top */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-[#134611]">EatWise</h1>
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full ${
          collapsed ? "w-20" : "w-64"
        }
        bg-white border-r border-gray-200
        p-4 z-50 transform transition-all duration-300 shadow-lg flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* TOP */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h1 className="text-2xl font-extrabold text-[#134611]">
                EatWise
              </h1>
            )}

            <div className="flex items-center gap-2">
              <button
                className="hidden md:block"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </button>

              <button className="md:hidden" onClick={() => setIsOpen(false)}>
                <X size={26} />
              </button>
            </div>
          </div>

          {/* Menu */}
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition
                  ${
                    active === item.key
                      ? "bg-[#06D6A0] text-white"
                      : "text-gray-600 hover:bg-[#06D6A0]/10 hover:text-[#134611]"
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 🔻 Logout (PALETTE FIXED) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-[#06D6A0]/10 hover:text-[#134611] transition"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </>
  );
}
