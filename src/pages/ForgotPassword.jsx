import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await BasicAuthProvider(
        "user/forgotPassword"
      ).postMethod({ email });
      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-full mb-2">
            <FaEnvelopeOpenText className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter your registered email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
