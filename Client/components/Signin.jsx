
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import Cookies from 'js-cookie';

const Signin = () => {
  const { setIsLoggedIn, checkToken, isLoggedIn } = useAuthContext();
  const userRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    if (checkToken()) {
      navigate("/user", { replace: true });
    }
  }, [checkToken, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("/signin", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status == 200) {
        Cookies.set("jwtToken", response.data.signinToken, { expires: 7, path: '/', secure: false, sameSite: 'None' });
        setIsLoggedIn(true);
        toast.success("Sign-in successful");
        navigate('/user',);
      } else {
        setIsLoggedIn(false);
        setErrorMsg(response.message || "Unknown error during sign-in");
        toast.error(response.message || "Error during sign-in");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setIsLoggedIn(false);

      if (error.response?.status === 401) {
        setErrorMsg("Invalid credentials");
        toast.error("Invalid credentials");
      } else if (error.response?.status === 400) {
        setErrorMsg("Bad request. Check input.");
        toast.error("Bad request");
      } else {
        setErrorMsg("An error occurred. Try again later.");
        toast.error("An error occurred. Try again.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-900">
      <form
        className="dark:text-white text-black w-[80%] sm:w-[60%] md:w-[55%] lg:w-[35%] pt-10 h-[80%] flex flex-col justify-start mx-auto"
        onSubmit={handleSignIn}
      >
        <label className="dark:bg-slate-700 bg-slate-50 border-slate-950 input input-bordered flex items-center gap-2 mb-4">
          Email address
          <input
            type="email"
            name="email"
            className="grow"
            onChange={inputHandler}
            ref={userRef}
            required
          />
        </label>

        <label className="dark:bg-slate-700 bg-slate-100 border-slate-950 input input-bordered flex items-center gap-2 mb-4">
          Password
          <input
            type="password"
            name="password"
            onChange={inputHandler}
            required
          />
        </label>

        <div className="w-full flex flex-col p-5">
          <button type="submit" className="w-[50%] mx-auto mb-3 text-lg btn btn-primary">
            Sign In
          </button>

          <Link to="/">
            <button type="button" className="w-[50%] mx-auto text-lg btn btn-primary">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;

