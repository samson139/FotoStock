/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useEffect, useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import customFetch from "../src/utils/utils";

export const AuthenticationContext = createContext();
export const useAuthContext = () => useContext(AuthenticationContext);

const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // page-level loading


  const checkAuth = async () => {
    try {
      const res = await customFetch.get("/verify", { withCredentials: true });

      if (res.data.valid) {
        setUser(res.data.user);
        console.log("Authenticated user:", res.data.user);
        return true;
      }
      setUser(null);
      return false;
    } catch (err) {
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    try {
      await customFetch.post("/logout", {}, { withCredentials: true });
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


