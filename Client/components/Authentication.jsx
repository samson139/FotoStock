/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useEffect, useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
export const AuthenticationContext = createContext();
export const useAuthContext = () => useContext(AuthenticationContext);

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });// You can replace with decoded info

    }
  }, []);


  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        setUser({ token });
        return true;
      }
      setUser(null);
      return false;
    } catch (err) {
      setUser(null);
      return false;
    }

  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        checkAuth,
        handleLogout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authentication;


