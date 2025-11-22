import { useThemeContext } from "../components/ThemeContext";  // Make sure your context is imported
import { Outlet } from "react-router-dom";  // Assuming you're using react-router for page routing
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ChatSupport from '../components/ChatSupport';
const MainLayout = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  // Just for debugging, you can remove this

  return (

    <>

      <div className="fixed top-4 left-4 z-50 flex items-center">
        <h1
          className={`text-3xl font-semibold drop-shadow-lg ${isDarkMode ? "text-white" : "text-black"}`}
        >
          ρнσтσρє∂ια
        </h1>

        <div className="w-12 h-14">
          <DotLottieReact src="../assets/Photographer.lottie" loop autoplay />
        </div>

      </div>

      <div
        className={`relative ${isDarkMode ? "dark" : ""} transition-colors duration-200`}
      >
        {/* Dark Mode Toggle */}
        <label className="z-50 dark:text-amber-100 absolute top-8 right-10 inline-flex items-center cursor-pointer">
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


          <span className={`ml-3 font-serif text-sm ${isDarkMode ? "text-white" : "text-black"}`}>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </label>



        {/* Main Content */}
        <div className="dark:bg-gray-800 dark:text-amber-50 w-full bg-gray-100 transition-colors duration-200">
          {/* Render the page content (outlet for routing) */}
          <Outlet />
        </div>
        <ChatSupport />
      </div>
    </>
  );
};

export default MainLayout;

