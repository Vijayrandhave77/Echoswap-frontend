import { useContext, useEffect } from "react";
import { FiBell, FiRefreshCw, FiUserPlus } from "react-icons/fi";
import { notificationContextApi } from "../contextProvider/NotificationContextApi";
import DateHelper from "../GenerelHelper/DateHelper";
import { BsChatDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const getIconByType = (type) => {
  switch (type) {
    case "follow":
      return <FiUserPlus className="text-indigo-600" />;
    case "message":
      return <BsChatDots className="text-indigo-600" size={18} />;
    case "exchange":
      return <FiRefreshCw className="text-indigo-600" />;
    default:
      return <FiBell className="text-gray-500" />;
  }
};

const NotificationPage = () => {
  const { notifications, getNotifications } = useContext(
    notificationContextApi
  );
  const navigate = useNavigate();

  const gotoChat = (senderId, type) => {
    if (type == "message") {
      navigate(`/chat?user=${senderId}`);
    } else {
      navigate(`/profile/${senderId}`);
    }
  };

  return (
    <div className="min-h-screen pt-[150px] sm:pt-[90px] px-4 flex justify-center">
      <div className="w-full max-w-2xl  ">
        {notifications?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No notifications yet.
          </div>
        ) : (
          notifications?.map((notif, index) => (
            <div
              key={notif._id || index}
              className={`flex items-start gap-4 px-4 py-4 transition-all ${
                notif.isRead ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
              onClick={() => gotoChat(notif.senderId?._id, notif.type)}
            >
              <div className="text-xl mt-1">{getIconByType(notif.type)}</div>

              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {notif.type === "follow" &&
                    `${notif.senderId?.name || "Someone"} followed you.`}
                  {notif.type === "message" &&
                    `New message from ${notif.senderId?.name || "someone"}.`}
                  {notif.type === "exchange" &&
                    `${
                      notif.senderId?.name || "Someone"
                    } accepted your exchange request.`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {DateHelper(notif?.createdAt)}
                </p>
              </div>

              {!notif.isRead && (
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
