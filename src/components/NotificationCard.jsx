import { FiUserPlus } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import DateHelper from "../GenerelHelper/DateHelper";

const NotificationCard = ({ notification }) => {
  const { type, senderId, createdAt } = notification;

  return (
    <div className="flex items-center px-3 py-2 rounded-md bg-white border shadow-sm hover:bg-gray-50 transition">
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
