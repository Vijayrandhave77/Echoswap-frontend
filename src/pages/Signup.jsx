import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "../contextProvider/AuthContextApi";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContextApi);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await BasicAuthProvider("user/signup").postMethod(
        formData
      );
      toast.success(response.message);
      console.log("Form submitted:", response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        server;
      } else {
        toast.error("Something went wrong");
      }
      console.error("Signup failed:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_NODE_API}/api/auth/google`;
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen pt-[104px] md:pt-20 px-4 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 mt-4 rounded-md hover:bg-blue-400 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-100 transition duration-300 gap-2"
          >
            <FcGoogle className="text-2xl" />
            <span>Login with Google</span>
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500">
              Login here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
