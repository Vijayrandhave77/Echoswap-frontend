import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContextApi } from "./AuthContextApi";

export const socketContext = createContext();

export const Socketprovider = ({ children }) => {
  const { user, isLogin } = useContext(AuthContextApi);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!isLogin || !user?._id) return;

    const newSocket = io(import.meta.env.VITE_NODE_API, {
      auth: {
        userId: user._id,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    newSocket.on("message", (message) => {
      console.log("💬 New message:", message);
    });

    newSocket.on("getOnline", (users) => {
      setOnlineUsers(users);
      console.log("🟢 Online users:", users);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect(); // ✅ Proper cleanup
    };
  }, [isLogin, user?._id]); // ✅ Precise dependency

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
