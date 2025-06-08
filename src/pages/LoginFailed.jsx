import React from "react";
import { useNavigate } from "react-router-dom";

const LoginFailed = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-6">
          Login Failed!
        </h2>
        <p className="text-gray-600 mb-4">There was an issue logging you in.</p>
        <button
          onClick={handleRedirect}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default LoginFailed;
