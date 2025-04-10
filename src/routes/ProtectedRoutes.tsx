import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Sidebar from "../components/sidebar/sidebar";
import ThemeToggle from "../components/theme-toggle/theme-toggle";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const navigationItems = [
    { label: "Dashboard", icon: "dashboard", route: "/" },
    { label: "Expenses", icon: "", route: "/all-expenses" },
    { label: "Budgets", icon: "", route: "/budgets" },
  ];

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div className="flex gap-1 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-full dark:text-gray-300 overflow-hidden">
      <Sidebar items={navigationItems} />
      <div className="flex flex-1 p-4 rounded-[40px] mt-16 mb-2 mr-2 bg-blue-100 pt-[4rem] lg:pt-4 dark:bg-gray-600 sm:ml-[15.75rem] overflow-scroll">
        {children}
      </div>
    </div>
  ) : null;
};

export default ProtectedRoute;
