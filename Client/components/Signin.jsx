import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import Cookies from "js-cookie";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Signin = () => {
  const { setIsLoggedIn, checkToken } = useAuthContext();
  const userRef = useRef();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkToken()) {
      setIsLoggedIn(true);
      navigate("/user", { replace: true });
    }
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch.post("/signin", formData, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        Cookies.set("jwtToken", response.data.signinToken, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setIsLoggedIn(true);
        toast.success("Sign-in successful");
        navigate("/user", { replace: true });
      } else {
        setIsLoggedIn(false);
        setErrorMsg(response.message);
        toast.error(response.message || "Error during sign-on");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMsg("Invalid credentials. Please check your username and password.");
          toast.error("Invalid credentials. Please try again.");
        } else if (error.response.status === 400) {
          setErrorMsg("Bad request. Please check your input.");
          toast.error("Bad request. Please try again.");
        } else {
          setErrorMsg(`Error: ${error.message}`);
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        setErrorMsg(`Error: ${error.message}`);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (

    <div
      className="w-full h-screen flex items-center justify-center px-4

        /* LIGHT MODE */
        bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300

        /* DARK MODE */
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
      "
    >
      <div className="hidden md:block md:w-1/2 lg:w-1/2 mr-2">
        <DotLottieReact
          src="../assets/photoAnime.lottie"
          loop
          autoplay
        />
      </div>
      <div
        className="
          w-full max-w-md rounded-2xl p-8 shadow-2xl backdrop-blur-xl

          /* LIGHT MODE CARD */
          bg-white/80 border border-gray-300

          /* DARK MODE CARD */
          dark:bg-white/10 dark:border-white/20
        "
      >
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign in to continue
        </p>

        {errorMsg && (
          <p className="text-red-500 text-center mb-3">{errorMsg}</p>
        )}

        <form onSubmit={handleSignIn} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label
              htmlFor="exampleInputEmail1"
              className="block text-gray-900 dark:text-gray-200 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={inputHandler}
              id="exampleInputEmail1"
              ref={userRef}
              required
              placeholder="example@mail.com"
              className="
                w-full px-4 py-1 rounded-xl transition-all
                
                /* LIGHT MODE */
                bg-white border border-gray-300 text-gray-900 placeholder-gray-400
                focus:ring-2 focus:ring-blue-400
                
                /* DARK MODE */
                dark:bg-black/30 dark:border-white/20 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:ring-blue-500
              "
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="exampleInputPassword1"
              className="block text-gray-900 dark:text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={inputHandler}
              id="exampleInputPassword1"
              required
              placeholder="********"
              className="
                w-full px-4 py-1 rounded-xl transition-all

                /* LIGHT MODE */
                bg-white border border-gray-300 text-gray-900 placeholder-gray-400
                focus:ring-2 focus:ring-blue-400

                /* DARK MODE */
                dark:bg-black/30 dark:border-white/20 
                dark:text-white dark:placeholder-gray-400 
                dark:focus:ring-blue-500
              "
            />
          </div>

          {/* BUTTONS */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="
                w-full py-1 text-lg font-sm mb-2 font-light rounded-xl transition-all shadow-lg
                
                /* LIGHT MODE */
                bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-300
                
                /* DARK MODE */
                dark:bg-blue-600 dark:hover:bg-blue-700 
                dark:hover:shadow-blue-500/40
              "
            >
              Sign In
            </button>

            <Link to="/">
              <button
                type="button"
                className="
                  w-full py-1 rounded-xl font-sm transition-all

                  /* LIGHT MODE */
                  border border-gray-700 text-gray-900 hover:bg-gray-200

                  /* DARK MODE */
                  dark:border-white/30 dark:text-white dark:hover:bg-white/10
                "
              >
                Create an Account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;


