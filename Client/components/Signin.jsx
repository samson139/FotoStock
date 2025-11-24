import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import Cookies from "js-cookie";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loading from "./Loading";
import FormInput from "./FormInput";

const Signin = () => {
  const { setIsLoggedIn, checkToken, loading, setLoading } = useAuthContext();
  const userRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!loading) {
      if (checkToken()) {
        setIsLoggedIn(true);
        setLoading(false);
        navigate("/user", { replace: true });
      }
    }
  }, [loading, setLoading, checkToken, navigate, setIsLoggedIn]);

  if (loading) return <Loading />;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await customFetch.post("/signin", formData, {
        headers: { "Content-type": "application/json" },
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
      const message =
        error.response?.status === 401
          ? "Invalid credentials. Please try again."
          : error.response?.status === 400
            ? "Bad request. Please check your input."
            : "An error occurred. Please try again later.";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">

      {/* Lottie Animation */}
      <div className="hidden md:block md:w-1/2 lg:w-1/2 mr-2">
        <DotLottieReact src="/photoAnime.lottie" loop autoplay />
      </div>

      {/* Signin Form */}
      <div className="w-full max-w-md rounded-2xl p-8 shadow-2xl backdrop-blur-xl bg-white/80 border border-gray-300 dark:bg-white/10 dark:border-white/20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Sign in to continue</p>

        {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}

        <form onSubmit={handleSignIn} className="space-y-5">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            onChange={inputHandler}
            defaultValue={formData.email}
            placeholder="Email"
            ref={userRef}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            onChange={inputHandler}
            defaultValue={formData.password}
            placeholder="Password"
          />

          {/* Buttons */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="w-full py-1 text-lg font-sm mb-2 font-light rounded-xl transition-all shadow-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:shadow-blue-500/40"
            >
              Sign In
            </button>

            <Link to="/signup">
              <button className="w-full py-1 rounded-xl font-sm transition-all border border-gray-700 text-gray-900 hover:bg-gray-200 dark:border-white/30 dark:text-white dark:hover:bg-white/10">
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



