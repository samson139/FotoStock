import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { useAuthContext } from "./Authentication";
import ChatSupport from "./ChatSupport";

const Signup = () => {
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const { setIsLoggedIn, checkToken } = useAuthContext();
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("/signup", formData, {
        headers: {
          'Content-type': 'application/json'
        },
      });
      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unknown error occurred');
    }
  }


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-slate-900 transition-all duration-300 ease-in-out">
      <h1 className="dark:text-amber-100 text-4xl text-gray-900 font-mono tracking-wider w-[100%] text-center mt-8 mb-8 sm:text-5xl">Welcome to the Photopedia!</h1>
      <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
        <form className="dark:text-amber-50  text-black w-100 text-sm" onSubmit={handleSubmit}>
          <label htmlFor="exampleInputFirstName" className="dark:text-white dark:bg-slate-700 font-light input bg-slate-100 border-slate-950 input-bordered flex items-center gap-2 mb-3">
            First name
            <input
              type="text"
              name="firstname"
              onChange={inputHandler}

              id="exampleInputFirstName"
              required />
          </label>

          <label htmlFor="exampleInputLastName" className="dark:text-white dark:bg-slate-700 font-light input bg-slate-100 border-slate-950  input-bordered flex items-center gap-2 mb-3">Last name
            <input
              type="text"
              name="lastname"
              onChange={inputHandler}

              id="exampleInputLastName"
              required />
          </label>


          <label htmlFor="exampleInputEmail1" className="dark:text-white dark:bg-slate-700 font-light input bg-slate-100 border-slate-950  input-bordered flex items-center gap-2 mb-3">Email address
            <input
              type="email"
              name="email"
              onChange={inputHandler}
              id="exampleInputEmail1"
              required
            />
          </label>


          <label htmlFor="exampleInputPassword1" className="dark:text-white dark:bg-slate-700 font-light input bg-slate-100 border-slate-950  input-bordered flex items-center gap-2 mb-3">Password
            <input
              type="password"
              name="password"
              onChange={inputHandler}

              id="exampleInputPassword1"
              required
            />
          </label>

          <label htmlFor="exampleInputPassword2" className="dark:text-white dark:bg-slate-700 font-light input bg-slate-100 border-slate-950  input-bordered flex items-center gap-2 mb-3" >
            Confirmed Password
            <input type="password"
              name="confirmedPassword"
              onChange={inputHandler}
              id="exampleInputPassword2" />
          </label>

          <div className="w-[100%]">
            <button type="submit" className="btn btn-primary mx-auto mt-4 mb-2 w-[30%] text-lg block">Sign Up</button>
            <Link to="/signin">
              <button className="btn btn-primary mx-auto mt-4 mb-2 w-[30%] text-lg block" type="button" >Sign In</button>
            </Link>
          </div>
        </form>
      </div>
      <ChatSupport />
    </div>
  );
};

export default Signup;