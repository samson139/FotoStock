/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useEffect, useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import customFetch from "../src/utils/utils";

export const AuthenticationContext = createContext();
export const useAuthContext = () => useContext(AuthenticationContext);

const Authentication = ({ children }) => {
 const [user, setUser] = useState(() => {
  const cachedUser = localStorage.getItem("user");
  return cachedUser ? JSON.parse(cachedUser) : null;
});
  const [loading, setLoading] = useState(false); // page-level loading


  const checkAuth = async () => {
    try {
      const res = await customFetch.get("/verify", { withCredentials: true });

      if (res.data.valid) {
        setUser(res.data.user);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        return true;
      }
      setUser(null);
      localStorage.removeItem("user");
      return false;
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user");
      return false;
    }
  };

  useEffect(() => {
   checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await customFetch.post("/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        handleLogout,
        isLoggedIn: user !== null,
        setLoading,
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


