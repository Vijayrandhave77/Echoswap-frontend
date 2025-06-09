import { createContext, useEffect, useState } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export const AuthContextApi = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, []);
  const fetchUser = async () => {
    try {
      const response = await BasicAuthProvider("user").getMethod();
      console.log("User fetched:", response);
      setUser(response.user);
      setIsLogin(true);
    } catch (error) {
      console.error("User fetch failed:", error);
      setIsLogin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isLogin]);

  return (
    <AuthContextApi.Provider
      value={{ user, setUser, isLogin, setIsLogin, fetchUser }}
    >
      {children}
    </AuthContextApi.Provider>
  );
};
