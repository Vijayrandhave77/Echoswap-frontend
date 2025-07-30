import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/Chat";
import MainPage from "./pages/MainPage";
import Post from "./pages/Post";
import ProductDetails from "./pages/ProductDetails ";
import Profile from "./pages/Profile";
import Wishlists from "./pages/Wishlists";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginFailed from "./pages/LoginFailed";
import CreatePassword from "./pages/CreatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import Rating from "./pages/Rating";
import NotFoundPage from "./pages/NotFoundPage";
import ResetPassword from "./pages/ResetPassword";
import NotificationPage from "./pages/NotificationPage";
import { useContext } from "react";
import { notificationContextApi } from "./contextProvider/NotificationContextApi";
import PushNotification from "./components/PushNotification";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  const { pushNotification } = useContext(notificationContextApi);
  console.log("Push Notification:", pushNotification);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="wishlist" element={<Wishlists />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="details/:id" element={<ProductDetails />} />
            <Route path="post" element={<Post />} />
            <Route path="chat" element={<Chat />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="rating" element={<Rating />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="/login-failed" element={<LoginFailed />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <PushNotification notification={pushNotification} />
    </div>
  );
}

export default App;
