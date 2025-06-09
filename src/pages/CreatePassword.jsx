import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "../contextProvider/AuthContextApi";

function CreatePassword() {
  const navigate = useNavigate();
   const { user } = useContext(AuthContextApi);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.warning("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const response = await BasicAuthProvider(
        "user/createPassword"
      ).postMethod({ password, confirmPassword });
      toast.success("Password created successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center   px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-full mb-2">
            <FaLock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Password</h2>
          <p className="text-sm text-gray-500">
            Set a strong password to secure your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition duration-300"
          >
            {loading ? "Creating..." : "Create Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePassword;
