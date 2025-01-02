"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for showing password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset the error message for the field being edited
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          formData
        );
        console.log(response.data.token);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-neutral-700 rounded-lg shadow-lg p-8">
        <Link
          href="/"
          className="text-black hover:text-black transition hover:scale-125 mb-4 inline-block"
        >
          &larr; Home
        </Link>
        <h2 className="text-4xl font-bold text-white text-center">Log In</h2>
        <p className="text-sm text-white opacity-75 text-center mt-4">
          Enter your credentials to access your account.
        </p>
        <form className="mt-6 space-y-7 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
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
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none"
            />
            {errors.email && (
              <span className="text-red-600 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none appearance-none"
            />
            {/* Show eye icon only if password field is not empty */}
            {formData.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-neutral-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
            {errors.password && (
              <span className="text-red-600 text-xs">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-opacity-75 text-white py-2 rounded-lg font-medium shadow-md transition"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-white opacity-75 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-black hover:underline font-bold">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
