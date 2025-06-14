import toast from "react-hot-toast";
import { createContext, useState, useEffect, useContext } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "./AuthContextApi";

export const notificationContextApi = createContext();

export const Notificationprovider = ({ children }) => {
  const { user } = useContext(AuthContextApi);
  const [notifications, setNotifications] = useState([]);
  const [pushNotification, setPushNotification] = useState(null);
  
  const getNotifications = async () => {
    try {
      const response = await BasicAuthProvider("notification").getMethod();
      setNotifications(response);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [user]);
  return (
    <notificationContextApi.Provider
      value={{ notifications, updateNotification, getNotifications,pushNotification, setPushNotification }}
    >
      {children}
    </notificationContextApi.Provider>
  );
};
