
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import Cookies from 'js-cookie';

const Signin = () => {
  const { setIsLoggedIn, checkToken } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const userRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = checkToken();
    if (token) {
      setIsLoggedIn(true);
      navigate("/user", { replace: true });
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await customFetch.post("/signin", formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Signin successful:", response);
        Cookies.set("jwtToken", response.signinToken, {
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'None'
        });

        setIsLoggedIn(true);
        toast.success("Sign-in successful");
        navigate("/user");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setIsLoggedIn(false);

      const status = error.response?.status;
      const message =
        status === 401
          ? "Invalid credentials"
          : status === 400
            ? "Bad request. Check input."
            : "An error occurred. Try again.";

      setErrorMsg(message);
      toast.error(errorMsg || message);
    }
  };

  if (loading) return <p>Loading...</p>;

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

