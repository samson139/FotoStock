/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../src/utils/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Camera from "../components/Camera";
import RotatingCamera from "./RotatingCamera.jsx";
import { useAuthContext } from "./Authentication";
import FormInput from "./FormInput";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });


  const { user } = useAuthContext();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user) {
      navigate("/user", { replace: true });
    }
  }, [user, navigate]);

  // 👉 REGEX VALIDATION RULES
  const nameRegex = /^[A-Za-z]{2,25}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // 👉 VALIDATION FUNCTION
  const validateInputs = () => {
    const { firstname, lastname, email, password, confirmedPassword } = formData;

    if (!nameRegex.test(firstname)) {
      toast.error("First name should contain only letters (2–25 chars).");
      return false;
    }

    if (!nameRegex.test(lastname)) {
      toast.error("Last name should contain only letters (2–25 chars).");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be 8+ chars, include uppercase, lowercase & a number.");
      return false;
    }

    if (password !== confirmedPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // ⛔ stop if validation fails

    try {
      const response = await customFetch.post("/signup", formData, {
        headers: { "Content-type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unknown error occurred");
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">

      {/* Canvas Background */}
      <Canvas className="absolute w-full h-full z-0">
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={1} />
          <directionalLight position={[100, 100, 45]} intensity={5} />
          <Camera position={[5, -6, -15]} rotation={[-Math.PI / 20, -Math.PI / 20, -Math.PI / 20]} />
          <RotatingCamera />
        </Suspense>
      </Canvas>

      {/* Signup Form */}
      <div className="z-20 opacity-90 px-4 w-full mx-auto md:w-1/3 max-w-md p-6 rounded-2xl shadow-xl backdrop-blur-xl bg-white/80 border border-gray-300 dark:bg-white/10 dark:border-white/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

        <h1 className="text-2xl text-center font-semibold text-gray-900 dark:text-white mb-5">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">

          <FormInput
            label="First Name"
            name="firstname"
            type="text"
            onChange={inputHandler}
            placeholder="Firstname"
          />

          <FormInput
            label="Last Name"
            name="lastname"
            type="text"
            onChange={inputHandler}
            placeholder="Lastname"
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            onChange={inputHandler}
            placeholder="Email"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            onChange={inputHandler}
            placeholder="Password"
          />

          <FormInput
            label="Confirm Password"
            name="confirmedPassword"
            type="password"
            onChange={inputHandler}
            placeholder="Confirm Password"
          />

          <div className="pt-4 space-y-4">
            <button type="submit" className="w-full mb-3 py-2 rounded-xl text-md font-semibold shadow-lg bg-blue-600 text-white">
              Sign Up
            </button>

            <Link to="/">
              <button type="button" className="w-full py-2 rounded-xl font-sm transition-all border border-gray-700 text-gray-900 hover:bg-gray-200 dark:border-white/30 dark:text-white dark:hover:bg-white/10">
                Sign In
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
