import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoMdHeartEmpty,
  IoIosNotificationsOutline,
  IoIosChatbubbles,
} from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import { MdNotificationsOff, MdOutlineAddAPhoto } from "react-icons/md";
import {
  FaSearch,
  FaUserCircle,
  FaStar,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { wishlistContextApi } from "../contextProvider/WishlistContextApi";
import NotificationCard from "./NotificationCard";
import { notificationContextApi } from "../contextProvider/NotificationContextApi";
import { socketContext } from "../contextProvider/SocketContext";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import { CartContextApi } from "../contextProvider/CartContextApi";
import { BsBox2 } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();
  const { socket } = useContext(socketContext);
  const { isLogin, user, setIsLogin } = useContext(AuthContextApi);
  const { wishlists } = useContext(wishlistContextApi);
  const { notifications, getNotifications, setPushNotification } = useContext(
    notificationContextApi
  );
  const { cart } = useContext(CartContextApi);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const response = await BasicAuthProvider("user/logout").postMethod({});
      setIsLogin(false);
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        server;
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      setPushNotification(data?.notification);
      getNotifications();
    };

    const handleNewMessage = (message) => {
      setPushNotification({ ...message, type: "message" });
    };

    socket.on("getNotification", handleNotification);
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("getNotification", handleNotification);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  return (
    <>
      <header className="sticky top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
          <NavLink
            to="/"
            className="text-2xl font-bold text-blue-600 shrink-0 logo"
          >
            Echoswap
          </NavLink>

          <SearchBar />

          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {isLogin ? (
              <>
                <NavLink to="/cart" className="relative">
                  <PiShoppingCartSimple size={22} />
                  <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                    {cart?.length}
                  </span>
                </NavLink>
                <NavLink to="/wishlist" className="relative">
                  <IoMdHeartEmpty size={22} />
                  {wishlists.length > 0 && (
                    <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                      {wishlists?.length || 0}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/chat">
                  <IoIosChatbubbles size={22} />
                </NavLink>

                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    className="relative"
                  >
                    <IoIosNotificationsOutline size={22} />
                    {notifications?.length > 0 && (
                      <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                        {notifications?.length || 0}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="px-4 py-3 text-sm text-gray-500 text-center flex flex-col gap-2 overflow-y-scroll max-h-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300">
                        {notifications?.length > 0 ? (
                          notifications.map((notification) => (
                            <NotificationCard
                              key={notification._id}
                              notification={notification}
                              setShowNotifications={setShowNotifications}
                            />
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                            <MdNotificationsOff size={36} className="mb-2" />
                            <span>No notifications</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                  >
                    <img
                      src={user?.picture || "/user.png"}
                      alt="profile"
                      className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                    />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                      >
                        <FaUserCircle /> Profile
                      </NavLink>
                      <NavLink
                        to="/rating"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                      >
                        <FaStar /> Rating
                      </NavLink>
                      <NavLink
                        to="/orders"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                      >
                        <BsBox2 /> Orders
                      </NavLink>
                      <NavLink
                        to="/exchange"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm gap-2"
                      >
                        <FaExchangeAlt /> My Exchange
                      </NavLink>
                      <button
                        onClick={handleLogOut}
                        className="w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>

                <NavLink
                  to="/post"
                  className="flex items-center gap-1 bg-gradient-to-tr from-red-500 via-yellow-400 to-green-400 text-yellow-900 font-semibold px-3 py-1.5 rounded-md shadow"
                >
                  <MdOutlineAddAPhoto size={18} />
                  <span className="text-sm">Exchange</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-blue-600 font-semibold text-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden ml-auto">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 mt-2 pb-2">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-1 px-2 text-sm focus:outline-none"
            />
            <button className="ml-2 bg-blue-600 p-2 rounded-full text-white">
              <FaSearch size={14} />
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-40 shadow-md transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            <span className="text-xl font-bold text-blue-600">Echoswap</span>
            <button onClick={() => setMobileOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-4">
            {isLogin ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-3 items-center"
                >
                  <img
                    src={user?.picture || "/user.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                  />
                  <span className="font-medium">Profile</span>
                </NavLink>

                <NavLink
                  to="/rating"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center"
                >
                  <FaStar /> Rating
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center relative"
                >
                  <PiShoppingCartSimple size={22} /> Cart
                  {cart.length > 0 && (
                    <span className="absolute left-4 -top-1 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                      {cart?.length || 0}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center relative"
                >
                  <BsBox2 /> Orders
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center relative"
                >
                  <IoMdHeartEmpty size={22} /> Wishlist
                  {wishlists.length > 0 && (
                    <span className="absolute left-4 -top-1 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                      {wishlists?.length || 0}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/chat"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center"
                >
                  <IoIosChatbubbles /> Chat
                </NavLink>
                <NavLink
                  to="/notifications"
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-2 items-center relative"
                >
                  {notifications?.length > 0 && (
                    <span className="absolute left-4 -top-1 text-xs bg-red-600 text-white w-3 h-3 flex items-center justify-center rounded-full">
                      {notifications?.length || 0}
                    </span>
                  )}
                  <IoIosNotificationsOutline size={22} /> Notifications
                </NavLink>
                <NavLink
                  to="/post"
                  onClick={() => setMobileOpen(false)}
                  className="bg-gradient-to-tr from-red-500 via-yellow-400 to-green-400 text-yellow-900 font-semibold px-4 py-2 rounded-lg shadow flex gap-2"
                >
                  <MdOutlineAddAPhoto size={20} /> Exchange
                </NavLink>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogOut();
                  }}
                  className="text-left text-red-600 font-semibold px-4 py-2 rounded-lg flex gap-2 items-center"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </header>
    </>
  );
}
