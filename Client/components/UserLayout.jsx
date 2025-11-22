import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import { useThemeContext } from "./ThemeContext";
import ChatSupport from './ChatSupport';

const UserLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("jwtToken");
      if (token) {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate('/signin');
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* 🌙 DARK MODE TOGGLE — always visible */}
      <label className="fixed top-24 right-10 z-50 inline-flex items-center cursor-pointer dark:text-amber-100">
        <input
          type="checkbox"
          checked={isDarkMode}
          className="sr-only peer"
          onChange={toggleTheme}
        />
        <div
          className="
            relative w-14 h-7 bg-gray-200 rounded-full peer
            peer-checked:after:translate-x-full
            after:content-[''] after:absolute after:top-[1px] after:left-[1px]
            after:bg-gray-800 after:border after:border-gray-500
            after:rounded-full after:h-6 after:w-6 after:transition-all
            border border-black dark:border-blue-500
            peer-checked:bg-gray-600 dark:peer-checked:bg-blue-600
          "
        ></div>
      </label>

      {/* MAIN LAYOUT */}
      <div className="w-full min-h-screen overflow-hidden">
        <Navbar />

        {/* Page Content */}
        <div className="z-20 min-h-screen pt-20 md:pt-24 bg-gray-100 dark:bg-slate-900 transition-all duration-300">
          <Outlet context={userData} />
        </div>

        {/* Chat Support */}
        <div className="fixed bottom-0 z-40">
          <ChatSupport />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

