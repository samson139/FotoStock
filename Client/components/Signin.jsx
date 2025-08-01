

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import Cookies from 'js-cookie';


const Signin = () => {
  const { setIsLoggedIn, checkToken } = useAuthContext()
  const userRef = useRef();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (checkToken()) {
      navigate("/user", { replace: true });
    }
  }, [navigate]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value
    });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch.post("/signin", formData, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status == 200) {
        Cookies.set("jwtToken", response.data.signinToken, { expires: 7, path: '/', secure: false, sameSite: 'None' });

        setIsLoggedIn(true);
        toast.success("Sign-in successful");
        navigate('/user', { replace: true });
      } else {

        setIsLoggedIn(false);
        setErrorMsg(response.message);
        toast.error(response.message || "Error during sign-on");
      }
    }
    catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMsg("Invalid credentials. Please check your username and password.");
          toast.error("Invalid credentials. Please try again.");
        }
        else if (error.response.status === 400) {
          setErrorMsg("Bad request. Please check your input.");
          toast.error("Bad request. Please try again.");
        }
        else {
          setErrorMsg(`Error: ${error.message}`);
          toast.error("An error occurred. Please try again later.");
        }
      }
      else {
        setErrorMsg(`Error: ${error.message}`);
        toast.error("An error occurred. Please try again later.");
      }
    };
  }


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-900">
      <form className="dark:text-white text-black  w-[80%] h-[80%] pt-10 flex flex-col justify-start sm:w-[60%] md:w-[55%] lg:w-[35%] mx-auto" onSubmit={handleSignIn}>
        <label htmlFor="exampleInputEmail1" className="dark:text-white dark:bg-slate-700 font-light bg-slate-50 border-slate-950 input input-bordered flex items-center gap-2 mb-4">Email address
          <input
            type="email"
            name="email"
            className="grow"
            onChange={inputHandler}
            id="exampleInputEmail1"
            ref={userRef}
            required
          />
        </label>

        <label htmlFor="exampleInputPassword1" className="dark:text-white dark:bg-slate-700 font-light bg-slate-100 border-slate-950 input input-bordered flex items-center gap-2 mb-4">Password
          <input
            type="password"
            name="password"

            onChange={inputHandler}
            id="exampleInputPassword1"
            required
          />
        </label>

        <div className="w-full flex flex-col p-5">
          <div>
            <button type="submit" className="w-[50%] block mx-auto sm:w-[50%] md:w-[60%] lg:w-[60%] text-lg mb-3 btn btn-primary" >Sign In</button>
          </div>
          <Link to="/">
            <button type="button" className="w-[50%] block mx-auto  sm:w-[50%] md:w-[60%] lg:w-[60%] text-lg btn btn-primary">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signin;
