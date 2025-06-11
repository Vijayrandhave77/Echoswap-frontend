import toast from "react-hot-toast";
import { createContext, useState, useEffect, useContext } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "./AuthContextApi";

export const notificationContextApi = createContext();

export const Notificationprovider = ({ children }) => {
  const {user} = useContext(AuthContextApi);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await BasicAuthProvider("notification").getMethod();
      setNotifications(response);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };
  const updateNotification = async (Id) => {
    try {
      const response = await BasicAuthProvider(
        `notification/${Id}/read`
      ).putMethod({});
      toast.success(response.message);
      getNotifications();
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);
  return (
    <notificationContextApi.Provider
      value={{ notifications, updateNotification,getNotifications }}
    >
      {children}
    </notificationContextApi.Provider>
  );
};
