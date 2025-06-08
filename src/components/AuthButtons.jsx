import { NavLink } from "react-router-dom";

const AuthButtons = () => {
  return (
    <div className="flex space-x-4">
      {/* Login Button */}
      <NavLink
        to="/login"
        className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-400 transition duration-300"
      >
        Login
      </NavLink>

      {/* Signup Button */}
      <NavLink
        to="/signup"
        className="bg-transparent border-2 border-blue-500 text-gray-500 px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
      >
        Signup
      </NavLink>
    </div>
  );
};

export default AuthButtons;
