import { toast } from "react-toastify";
import { createContext, useState, useEffect } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export const notificationContextApi = createContext();

export const Notificationprovider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await BasicAuthProvider("notification").getMethod();
      setNotifications(response);
    } catch (error) {
      toast.error(error);
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
      toast.error(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);
  console.log("Notificationprovider", notifications);
  return (
    <notificationContextApi.Provider
      value={{ notifications, updateNotification,getNotifications }}
    >
      {children}
    </notificationContextApi.Provider>
  );
};
