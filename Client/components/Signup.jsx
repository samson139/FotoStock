import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "../components/Camera"; // Your custom camera model
import RotatingCamera from "./RotatingCamera.jsx";
import { useEffect } from "react";
import { useAuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";

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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (checkToken()) {
      setIsLoggedIn(true);
      navigate("/user", { replace: true });
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("/signup", formData, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unknown error occurred");
    }
  };

  return (

    <div
      className="
        w-full h-screen flex items-center justify-around
        px-4 overflow-hidden
        bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
      "
    >
      {/* LEFT SIDE — SIGNUP FORM */}
      <div
        className="
          z-20 opacity-80 px-4 ml-20 w-full mx-auto md:w-1/3 max-w-md p-4 rounded-2xl shadow-xl backdrop-blur-xl
          bg-white/80 border border-gray-300
          dark:bg-white/10 dark:border-white/20
        "
      >
        <h1 className="text-2xl text-center font-semibold text-gray-900 dark:text-white mb-5">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Form Fields */}
          <div>
            <label htmlFor="firstName" className="block text-sm mb-1 text-gray-900 dark:text-white ">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              onChange={inputHandler}
              required
              className="w-full px-3 py-1 text-sm rounded-xl bg-white border border-gray-300 dark:text-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm mb-1 text-gray-900 dark:text-white ">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              onChange={inputHandler}
              required
              className="w-full px-3 py-1 text-sm rounded-xl bg-white border border-gray-300 dark:text-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-900 dark:text-white ">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={inputHandler}
              required
              className="w-full px-3 py-1 text-sm rounded-xl bg-white border border-gray-300 dark:text-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-900 dark:text-white ">Password</label>
            <input
              type="password"
              name="password"
              onChange={inputHandler}
              required
              className="w-full px-3 py-1 text-sm rounded-xl bg-white border border-gray-300 dark:text-white dark:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-900 dark:text-white ">Confirm Password</label>
            <input
              type="password"
              name="confirmedPassword"
              onChange={inputHandler}
              required
              className="w-full px-3 py-1 text-sm rounded-xl bg-white border border-gray-300 dark:text-white dark:bg-slate-900"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 space-y-4">
            <button
              type="submit"
              className="w-full mb-3 py-1 rounded-xl text-md font-semibold shadow-lg bg-blue-600 text-white"
            >
              Sign Up
            </button>

            <Link to="/signin">
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
                Sign In
              </button>
            </Link>
          </div>
        </form>
      </div>


      <Canvas style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={1} />
          <directionalLight position={[100, 100, 45]} intensity={5} />

          <Camera
            position={[5, -6, -15]}
            rotation={[-Math.PI / 20, -Math.PI / 20, -Math.PI / 20]}
          />
          <RotatingCamera />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Signup;

