
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";

export const ContextOfTheme = createContext();
export const useThemeContext = () => useContext(ContextOfTheme);

const ThemeContext = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );
  const toggleTheme = () => {
    setDarkMode((prevTheme) => {
      const newTheme = !prevTheme
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);


  return (
    <ContextOfTheme.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ContextOfTheme.Provider>
  )
}

export default ThemeContext;
