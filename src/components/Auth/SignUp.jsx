"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { getAllProviders } from "@features/authSlice";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@components/Loader";
import { motion } from "framer-motion";

const Signup = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("path") || "";
  // console.log(path);

  const router = useRouter();

  const providers = useSelector(getAllProviders);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const containsLetters = (str) => /[a-zA-Z]/.test(str);
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (!containsLetters(formData.name)) {
      newErrors.name = "Name should contain valid alphabets.";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    } else if (!/[A-Za-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter.";
      valid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (validateForm() && !signingUp) {
      setSigningUp(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
          formData
        );
        if (response.status === 201) {
          toast.success(response.data);

          router.push("/login");
        }
      } catch (error) {
        console.error(error.response.data);
        setServerError(error.response.data);
        setTimeout(() => {
          setServerError(null);
        }, 4000);
      }
      setSigningUp(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 transition-all duration-300 ease-in-out hover:shadow-3xl">
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-all duration-200 mb-6 inline-block transform hover:scale-125"
          >
            &larr; Home
          </Link>
          <h2 className="text-4xl font-bold text-white text-center mb-2">
            Sign Up
          </h2>
          <p className="text-sm text-gray-300 text-center mb-8">
            Create an account to get started.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
              {errors.password && (
                <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 transition-colors duration-200"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.confirmPassword}
                </p>
              )}
              {serverError && (
                <p className="mt-7 text-red-500 text-base">{serverError}</p>
              )}
            </div>
            <button
              type="submit"
              className={`${
                signingUp
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:scale-105"
              } bg-blue-600 w-full text-white py-2 rounded-lg font-medium shadow-md transition-all duration-200 transform`}
            >
              {signingUp ? "Signing Up" : "Sign Up"}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-gray-400 text-center mb-4">
              Or sign up with
            </p>
            <div className="flex space-x-4">
              {/* Google */}
              <button
                onClick={() =>
                  providers &&
                  signIn("google", {
                    callbackUrl: `${
                      path
                        ? process.env.NEXT_PUBLIC_API_URL + path
                        : process.env.NEXT_PUBLIC_API_URL
                    }`, // Redirect to the current page after login
                  })
                }
                className="flex-1 flex items-center justify-center bg-white text-gray-800 py-2 rounded-lg font-medium shadow-md transition-all duration-200 hover:bg-gray-100 transform hover:scale-105"
              >
                <FaGoogle className="mr-2" />
                Google
              </button>

              {/* Github */}
              <button
                onClick={() =>
                  signIn("github", {
                    callbackUrl: `${
                      path
                        ? process.env.NEXT_PUBLIC_API_URL + path
                        : process.env.NEXT_PUBLIC_API_URL
                    }`, // Redirect to the current page after login
                  })
                }
                className="flex-1 flex items-center justify-center bg-gray-800 text-white py-2 rounded-lg font-medium shadow-md transition-all duration-200 hover:bg-gray-700 transform hover:scale-105"
              >
                <FaGithub className="mr-2" />
                GitHub
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 hover:underline font-bold transition-colors duration-200"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
