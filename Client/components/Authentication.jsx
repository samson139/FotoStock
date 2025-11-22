import { useEffect, useContext, createContext, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import customFetch from "../src/utils/utils";

export const AuthenticationContext = createContext();
export const useAuthContext = () => useContext(AuthenticationContext);

const Authentication = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = () => {
    const token = Cookies.get("jwtToken");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Token validation error", error);
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const isValid = checkToken();
      setIsLoggedIn(isValid);
      setLoading(false); // only stop loading after check
    };
    validateToken();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await customFetch.post('/logout', { withCredentials: true });
      if (response.status === 200) {
        setIsLoggedIn(false);
        Cookies.remove('jwtToken');
      }
    } catch (error) {
      console.error('Logout error:', error.response || error.message || error);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout, checkToken, loading, setLoading }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authentication;

