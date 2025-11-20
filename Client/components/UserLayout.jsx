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
  console.log(
    "hello", isDarkMode, toggleTheme); // Just for debugging, you can remove this
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
    <div className={`${isDarkMode ? "dark" : ""} w-full min-h-screen overflow-hidden`}>
      <Navbar />

      <div className="z-20 relative w-full h-full mx-auto scroll-smooth">
        {/* Dark Mode Toggle */}
        <label className="dark:text-amber-100 top-24 absolute right-10 inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkMode}
            className="sr-only peer"
            onChange={toggleTheme}
          />
          <div
            className={`
    relative w-14 h-7 bg-gray-200
    rounded-full peer
    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
    after:content-[''] after:absolute after:top-[1px] after:left-[1px]
    after:bg-gray-800   /* changed from white to gray */
    after:border after:border-gray-500 after:rounded-full
    after:h-6 after:w-6 after:transition-all
    dark:border-blue-500 border border-black
    peer-checked:bg-gray-600 dark:peer-checked:bg-blue-600
  `}
          ></div>
        </label>

        {/* Main Content */}
        <div className='dark:bg-slate-900 h-[100%] min-h-screen pt-20 md-pt-24
 bg-gray-100 transition-all duration-300 ease-in-out'>
          <Outlet context={userData} />
        </div>

        <div className='fixed bottom-0 z-50 border'>
          <ChatSupport />
        </div>
      </div>
    </div>

  );
};

export default UserLayout;
