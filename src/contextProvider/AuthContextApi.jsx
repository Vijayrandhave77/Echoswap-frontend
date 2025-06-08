import { createContext, useEffect, useState } from "react";
import { checkToken } from "../GenerelHelper/Token";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export const AuthContextApi = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = checkToken();
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await BasicAuthProvider("user").getMethod();
      setUser(response.user);
    } catch (error) {
      console.error("User fetch failed:", error);
      setIsLogin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = checkToken();
    if (token) {
      fetchUser();
    }
  }, [isLogin]);

  return (
    <AuthContextApi.Provider
      value={{ user, setUser, isLogin, setIsLogin, fetchUser }}
    >
      {children}
    </AuthContextApi.Provider>
  );
};
