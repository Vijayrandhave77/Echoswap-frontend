import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkToken } from "../GenerelHelper/Token";
const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkToken()) {
      navigate("/");
    } else {
      navigate("/login-failed");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">
          Login Successful!
        </h2>
        <p className="text-gray-600 mb-4">You are now logged in.</p>
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default LoginSuccess;
