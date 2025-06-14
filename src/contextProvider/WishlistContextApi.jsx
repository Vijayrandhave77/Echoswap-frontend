import toast from "react-hot-toast";
import { createContext, useState, useEffect, useContext } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "./AuthContextApi";

export const wishlistContextApi = createContext();

export const Wishlistprovider = ({ children }) => {
  const { user } = useContext(AuthContextApi);
  const [wishlists, setWishlists] = useState([]);

  const getWishlists = async () => {
    try {
      const response = await BasicAuthProvider("wishlist").getMethod();
      setWishlists(response.wishlists);
    } catch (error) {
      console.error(error);
    }
  };
  const addToWishlist = async (productId) => {
    try {
      const response = await BasicAuthProvider("wishlist/create").postMethod({
        productId,
      });
      toast.success(response.message);
      getWishlists();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlists();
  }, [user]);
  return (
    <wishlistContextApi.Provider value={{ wishlists, addToWishlist }}>
      {children}
    </wishlistContextApi.Provider>
  );
};
