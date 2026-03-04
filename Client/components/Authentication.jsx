/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useEffect, useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext();
export const useAuthContext = () => useContext(AuthenticationContext);

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
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
      localStorage.removeItem("user");
      setUser(null);
      navigate("/signin", { replace: true });
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


