import { useEffect } from "react";
import { toast } from "react-toastify";

function PushNotification({ notification }) {
  if (
    window.location.pathname === "/chat" &&
    notification?.type === "message"
  ) {
    return;
  }
  useEffect(() => {
    if (!notification) return;

    const toastId = `notif-${notification?._id || notification?.senderId?._id}`;

    if (!toast.isActive(toastId)) {
      toast(
        <div className="w-80 bg-white rounded-lg cursor-pointer flex items-start px-4 py-3 transition">
          <img
            src={notification?.senderId?.picture || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {notification?.senderId?.name}
            </p>
            <p className="text-sm text-gray-600 mt-0.5 leading-snug">
              {notification?.type === "message"
                ? `sent you a message ${notification?.message || ""}`
                : "started following you"}
            </p>
          </div>
        </div>,
        {
          toastId,
          autoClose: 4000,
          pauseOnHover: true,
        }
      );
    }
  }, [notification]);

  return null;
}

export default PushNotification;
