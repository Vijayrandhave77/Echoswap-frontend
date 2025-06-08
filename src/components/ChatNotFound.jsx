import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const ChatNotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <FiMessageSquare className="text-6xl text-gray-400 mx-auto mb-6" />
        <h1 className="text-3xl font-semibold text-gray-700 mb-2">
          No messages, yet?
        </h1>
        <p className="text-gray-500 text-lg">
          We’ll keep messages for any item you’re selling in here.
        </p>
      </div>
    </div>
  );
};

export default ChatNotFound;
