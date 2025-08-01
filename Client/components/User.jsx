import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useOutletContext } from "react-router-dom";
import Cards from "./Cards";
import { useAuthContext } from "./Authentication";


const User = () => {
  const { firstname, lastname } = useOutletContext();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    const checkJWTToken = async () => {
      const token = Cookies.get("jwtToken");
      if (token) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    }
    checkJWTToken();

  }, [setIsLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-full pt-2">
          <div className="w-full flex justify-between items-center">
            <p className="dark:text-amber-100 inline text-2xl font-mono ml-6 text-lime-950"> Welcome! {firstname} {lastname}</p>
          </div>
          <Cards />
        </div>
      ) : (
        <p>Please Login, <Link to="/signin">Signin</Link></p>
      )
      }
    </>
  );
}

export default User; 