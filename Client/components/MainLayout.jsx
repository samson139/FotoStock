import { Outlet } from "react-router-dom";
import { useThemeContext } from "./ThemeContext";
import ChatSupport from "./ChatSupport";

const MainLayout = () => {

  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <div className="relative dark:text-gray-950 transition-colors duration-200">
      <label className="absolute top-10 right-8 font-bold inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" checked={isDarkMode} className="sr-only peer" onChange={toggleTheme} />
        <div className="relative w-14 h-6 bg-gray-400 border-2 p-3 border-gray-600 
        peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
         dark:peer-focus:bg-gray-800 rounded-full peer
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
          after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border
          after:rounded-full after:h-5 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800 dark:peer-checked:bg-gray-800"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </label>
      <div className="dark:bg-gray-800 dark:text-amber-50 w-full bg-gray-100 transition-colors duration-200">
        <Outlet />
      </div>
      <ChatSupport />
    </div>
  )
}

export default MainLayout
