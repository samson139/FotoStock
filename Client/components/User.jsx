
import { useAuthContext } from "./Authentication";
import Cards from "./Cards";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { isLoggedIn, user } = useAuthContext();
  const navigate = useNavigate();
  // Optional: redirect or effect logic can go here if needed
  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect logic can be added here if necessary
      navigate("/signin", { replace: true });
    }
  }, [isLoggedIn]);
  const { firstname, lastname } = user;
  return (
    <div className="w-full h-full pt-2">
      <div className="w-full flex justify-between items-center mb-4">
        <p className="dark:text-amber-100 inline text-2xl font-mono ml-6 text-lime-950">
          Welcome! {firstname} {lastname}
        </p>
      </div>
      <Cards />
    </div>
  );
};

export default User;
