import { FiUserPlus } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import DateHelper from "../GenerelHelper/DateHelper";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notification, setShowNotifications }) => {
  const navigate = useNavigate();
  const { type, senderId, createdAt } = notification;
  const gotoChat = (senderId, type) => {
    if (type == "message") {
      navigate(`/chat?user=${senderId}`);
      setShowNotifications(false);
    } else {
      navigate(`/profile/${senderId}`);
      setShowNotifications(false);
    }
  };
  return (
    <div
      className="flex items-center px-3 py-2 rounded-md bg-white border shadow-sm hover:bg-gray-50 transition cursor-pointer"
      onClick={() => {
        gotoChat(senderId?._id, type);
      }}
    >
      <img
        src={senderId?.picture || "/user.png"}
        alt={senderId?.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0 ml-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-800 font-medium truncate">
            {senderId?.name}
          </p>
          <p>started</p>
        </div>
        <div className="text-sm text-gray-600 truncate">
          {type} you
          <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
            {DateHelper(createdAt)}
          </span>
        </div>
      </div>

      <div className="ml-3 text-indigo-600">
        {type === "follow" ? (
          <FiUserPlus size={18} />
        ) : (
          <BsChatDots size={18} />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
