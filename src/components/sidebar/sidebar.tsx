import React, { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import { ReactComponent as HamburgerIcon } from "../../assets/hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import { logoutService } from "../../services/login.service";

interface NavItem {
  label: string;
  icon: string | JSX.Element;
  route: string;
  badge?: string;
  notificationCount?: number;
}

interface SidebarProps {
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logoutService();
      localStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <HamburgerIcon />
              </button>
              <Link to={"/"} className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  BudgetBee
                </span>
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <button
                className="h-8 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                onClick={handleLogout}
              >
                {loading ? "Loggin out" : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform pt-14  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-white `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.route}
                  className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-gray-300 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  style={
                    window.location.pathname == item.route
                      ? { background: "#D5EDFF", color: "black" }
                      : undefined
                  }
                >
                  {/* {item.icon} */}
                  <span className="ml-3">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-blue-500 text-white dark:text-gray-300 px-2 py-1 text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.notificationCount && (
                    <span className="ml-auto bg-red-500 text-white dark:text-gray-300 px-2 py-1 text-xs rounded-full">
                      {item.notificationCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
