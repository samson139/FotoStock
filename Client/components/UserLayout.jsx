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
    <div className='relative w-full min-h-screen overflow-hidden'>
      <Navbar />
      <div className="w-full h-full mx-auto scroll-smooth">
        <label className="dark:text-amber-100 py-2 absolute top-0 right-10 inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" checked={isDarkMode} className="sr-only peer" onChange={toggleTheme} />
          <div
            className={`fixed top-20 right-5 z-10 md:top-22 lg:top-24 md:right-10 w-14 h-7 bg-gray-200
      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
      dark:peer-focus:bg-gray-800 rounded-full peer
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
      peer-checked:after:border-white after:content-['']
      after:absolute  after:start-[0px] after:bg-white after:border-2 after:border-gray-500 
      after:rounded-full after:h-6 after:w-6 after:transition-all 
      dark:border-blue-500 border-2 border-black dark:peer-checked:bg-blue-600
      peer-checked:bg-gray-600`}
          ></div>
        </label>


        <div className='dark:bg-slate-900 h-[100%] min-h-screen pt-20 bg-gray-100 transition-all duration-300 ease-in-out'>
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
