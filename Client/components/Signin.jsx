import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loading from "./Loading";
import FormInput from "./FormInput";

const Signin = () => {
  const { loading, user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const userRef = useRef();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    if (!loading && user) {
      navigate("/user", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) return <Loading />;

  const handleInput = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await customFetch.post("/signin", formData, {
        withCredentials: true
      });

      if (res.status === 200) {
        setUser(res.data.user);
         localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );
        toast.success("res.data.message");
        navigate("/user", { replace: true });
      }
    } catch (error) {
      const message =
        error.response?.status === 401
          ? "Invalid credentials."
          : "Something went wrong.";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">

      <div className="hidden md:block md:w-1/2 lg:w-1/2 mr-2">
        <DotLottieReact src="/photoAnime.lottie" loop autoplay />
      </div>

      <div className="w-full max-w-md rounded-2xl p-8 shadow-2xl backdrop-blur-xl bg-white/80 border border-gray-300 dark:bg-white/10 dark:border-white/20">
        <h2 className="text-center text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Sign in to continue
        </p>

        {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}

        <form onSubmit={handleSignIn} className="space-y-5">
          <FormInput
            label="Email"
            name="email"
            type="email"
            onChange={handleInput}
            defaultValue={formData.email}
            placeholder="Email"
            ref={userRef}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            onChange={handleInput}
            defaultValue={formData.password}
            placeholder="Password"
          />

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2 my-1 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            >
              Sign In
            </button>
            <Link to="/signup">
              <button
                type="button"
                className="w-full my-2 py-2 rounded-xl border border-gray-700 text-gray-900 hover:bg-gray-200 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
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




