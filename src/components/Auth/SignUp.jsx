"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios";

const Signup = () => {
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

  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset the error message for the field being edited
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
      newErrors.name = "Name should be valid alphabets.";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
        >
          &larr; Home
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign Up
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Create an account to get started.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
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
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.name && (
              <span className="text-red-600 text-xs">{errors.name}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.email && (
              <span className="text-red-600 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
            />
            {/* Show eye icon only if password field is not empty */}
            {formData.password && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
            {errors.password && (
              <span className="text-red-600 text-xs">{errors.password}</span>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
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
              className="text-sm text-black w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
            />
            {/* Show eye icon only if confirmPassword field is not empty */}
            {formData.confirmPassword && (
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
            {errors.confirmPassword && (
              <span className="text-red-600 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium shadow-md transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
