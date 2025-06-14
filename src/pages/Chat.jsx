import { useContext, useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import { socketContext } from "../contextProvider/SocketContext";
import { notificationContextApi } from "../contextProvider/NotificationContextApi";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContextApi);
  const { socket, onlineUsers } = useContext(socketContext);
  const { setPushNotification } = useContext(notificationContextApi);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const lastMessageRef = useRef();
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load all past conversations
  const fetchUsers = async () => {
    try {
      const response = await BasicAuthProvider(
        "message/conversations"
      ).getMethod();
      console.log("Fetched users:", response);
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Load messages with a specific user
  const fetchMessages = async (userId) => {
    try {
      const response = await BasicAuthProvider(
        `message/get/${userId}`
      ).getMethod();
      console.log("Fetched messages:", response);
      setMessages(response || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Send message
  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    try {
      const response = await BasicAuthProvider(
        `message/send/${selectedUser?._id || selectedUser?.user?._id}`
      ).postMethod({ message: input });
      setMessages((prev) => [...prev, response.newMessage]);

      // If first time chat, add user to conversation list
      if (!users.find((u) => u._id === selectedUser._id)) {
        setUsers((prev) => [selectedUser, ...prev]);
      }

      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user from ?user=ID param
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user");

    const loadUser = async () => {
      if (!userId) {
        setSelectedUser(null);
        setMessages([]);
        return;
      }

      let matchedUser = users.find((u) => u._id === userId);

      if (!matchedUser) {
        // 👇 Try to fetch user detail directly if not in conversation list
        try {
          const response = await BasicAuthProvider(
            `user/findbyid/${userId}`
          ).getMethod();
          matchedUser = response;
        } catch (err) {
          console.error("User not found:", err);
        }
      }

      if (matchedUser) {
        setSelectedUser(matchedUser?.user);
        fetchMessages(matchedUser?.user?._id);
      }
    };

    loadUser();
  }, [location.search, users]);

  // Listen for new messages from socket
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (
        (message.senderId._id === selectedUser?._id &&
          message.reciverId._id === user._id) ||
        (message.senderId._id === user._id &&
          message.reciverId._id === selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }else {
        setPushNotification({ ...message, type: "message" });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedUser, user?._id]);

  // Show all users including temporary selectedUser
  const allUsers =
    selectedUser && !users.find((u) => u._id === selectedUser._id)
      ? [selectedUser, ...users]
      : users;

  return (
    // <div className="fixed top-[75px] bottom-0 left-0 right-0 px-4 flex bg-white">
    //   {/* Left Panel */}
    //   <div className="w-full md:w-1/3 border-r border-gray-300 bg-white flex flex-col">
    //     <div className="p-4 border-b">
    //       <h2 className="text-xl font-bold mb-3">Chats</h2>
    //       <input
    //         type="text"
    //         placeholder="Search users..."
    //         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //       />
    //     </div>

    //     <ul className="overflow-y-auto flex-1">
    //       {allUsers.map((u) => (
    //         <li
    //           key={u._id}
    //           className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
    //             selectedUser?._id === u._id ? "bg-indigo-100" : ""
    //           }`}
    //           onClick={() => {
    //             setSelectedUser(u);
    //             fetchMessages(u._id);
    //             navigate(`/chat?user=${u._id}`);
    //           }}
    //         >
    //           <div className="relative">
    //             <img
    //               src={u.picture}
    //               className="w-12 h-12 rounded-full"
    //               alt={u.name}
    //             />
    //             <span
    //               className={`absolute bottom-0 right-0 w-3 h-3 ${
    //                 onlineUsers?.includes(u._id)
    //                   ? "bg-green-500"
    //                   : "bg-gray-400"
    //               } border-2 border-white rounded-full`}
    //             />
    //           </div>
    //           <div className="flex-1 min-w-0">
    //             <div className="flex justify-between items-center">
    //               <span className="font-semibold truncate">{u.name}</span>
    //             </div>
    //             <div className="text-sm text-gray-500 truncate">
    //               {u.lastMessage || ""}
    //             </div>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* Right Panel */}
    //   <div className="flex-1 flex flex-col">
    //     {selectedUser ? (
    //       <>
    //         {/* Chat Header */}
    //         <div className="p-4 bg-white border-b flex items-center gap-3 relative">
    //           <img
    //             src={selectedUser.picture || "/default-avatar.png"}
    //             alt={selectedUser.name}
    //             className="w-10 h-10 rounded-full"
    //           />
    //           <span
    //             className={`absolute top-11 left-12 w-3 h-3 ${
    //               onlineUsers?.includes(selectedUser._id)
    //                 ? "bg-green-500"
    //                 : "bg-gray-400"
    //             } border-2 border-white rounded-full`}
    //           />
    //           <div className="text-lg font-semibold text-gray-800">
    //             {selectedUser.name}
    //             <div className="text-sm">
    //               {onlineUsers?.includes(selectedUser._id) ? (
    //                 <span className="text-green-500">Online</span>
    //               ) : (
    //                 <span className="text-gray-400">Offline</span>
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //         {/* Chat Messages */}
    //         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
    //           {messages.map((msg, idx) => {
    //             const isLastMessage = idx === messages.length - 1;
    //             return (
    //               <div
    //                 key={msg._id || idx}
    //                 ref={isLastMessage ? lastMessageRef : null}
    //                 className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
    //                   msg.senderId === user._id
    //                     ? "ml-auto bg-indigo-500 text-white"
    //                     : "bg-white text-gray-800"
    //                 }`}
    //               >
    //                 {msg.message}
    //               </div>
    //             );
    //           })}
    //         </div>

    //         {/* Input Field */}
    //         <div className="p-4 border-t bg-white flex items-center">
    //           <input
    //             type="text"
    //             placeholder="Type your message..."
    //             value={input}
    //             onChange={(e) => setInput(e.target.value)}
    //             className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //             onKeyDown={(e) => e.key === "Enter" && handleSend()}
    //           />
    //           <button
    //             onClick={handleSend}
    //             className="ml-3 text-indigo-600 hover:text-indigo-800"
    //             aria-label="Send Message"
    //           >
    //             <FiSend size={22} />
    //           </button>
    //         </div>
    //       </>
    //     ) : (
    //       <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
    //         <BiChat size={80} className="text-gray-300 mb-4" />
    //         <p className="text-gray-500 text-lg font-medium text-center">
    //           Select a conversation to start chatting
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <>
      <div className="pt-[75px] h-[calc(100vh-75px)] flex flex-col md:flex-row bg-gray-100">
        {/* Sidebar: Chat List */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full border-r bg-white shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="mt-3 w-full px-4 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <ul className="overflow-y-auto flex-1">
            {allUsers.map((u) => (
              <li
                key={u._id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  selectedUser?._id === u._id
                    ? "bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedUser(u);
                  fetchMessages(u._id);
                  navigate(`/chat?user=${u._id}`);
                }}
              >
                <div className="relative">
                  <img
                    src={u.picture || "/user.png"}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={u.name}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 ${
                      onlineUsers?.includes(u._id)
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } border-2 border-white rounded-full`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900 truncate">
                      {u.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {u.lastMessage || "No messages yet"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Chat Area */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white flex items-center gap-4 shadow-sm">
                <div className="relative">
                  <img
                    src={selectedUser.picture || "/user.png"}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={selectedUser.name}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 ${
                      onlineUsers?.includes(selectedUser._id)
                        ? "bg-green-500"
                        : "bg-gray-400"
                    } border-2 border-white rounded-full`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {onlineUsers?.includes(selectedUser._id)
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, idx) => {
                  const isLast = idx === messages.length - 1;
                  const isMine = msg.senderId === user._id;
                  return (
                    <div
                      key={msg._id || idx}
                      ref={isLast ? lastMessageRef : null}
                      className={`max-w-[80%] md:max-w-sm px-4 py-2 rounded-xl shadow-sm text-sm break-words ${
                        isMine
                          ? "ml-auto bg-indigo-600 text-white"
                          : "mr-auto bg-white text-gray-900"
                      }`}
                    >
                      {msg.message}
                    </div>
                  );
                })}
              </div>

              {/* Input Field */}
              <div className="p-4 border-t bg-white flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
                  aria-label="Send Message"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center px-4">
              <BiChat size={80} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
