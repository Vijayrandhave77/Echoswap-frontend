import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contextProvider/AuthContextApi.jsx";
import { Wishlistprovider } from "./contextProvider/WishlistContextApi.jsx";
import "./index.css";
import "./App.css";

import "../public/fonts/TIMESS__.ttf";
import "../public/fonts/osaka-re.ttf";
import App from "./App.jsx";
import { Socketprovider } from "./contextProvider/SocketContext.jsx";
import { Notificationprovider } from "./contextProvider/NotificationContextApi.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <Socketprovider>
      <Wishlistprovider>
        <Notificationprovider>
          <App />
        </Notificationprovider>
      </Wishlistprovider>
    </Socketprovider>
  </AuthProvider>
  // </StrictMode>
);
