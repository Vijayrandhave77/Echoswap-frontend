import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await BasicAuthProvider("user/resetPassword").postMethod(
        {
          password,
          token,
        }
      );
      toast.success(response.message);
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center   px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 "
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
