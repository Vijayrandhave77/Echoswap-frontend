import { toast } from "react-toastify";
import { createContext, useState, useEffect } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export const wishlistContextApi = createContext();

export const Wishlistprovider = ({ children }) => {
  const [wishlists, setWishlists] = useState([]);

  const getWishlists = async () => {
    try {
      const response = await BasicAuthProvider("wishlist").getMethod();
      setWishlists(response.wishlists);
    } catch (error) {
      toast.error(error);
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
      toast.error(error);
    }
  };

  useEffect(() => {
    getWishlists();
  }, []);
  return (
    <wishlistContextApi.Provider value={{ wishlists, addToWishlist }}>
      {children}
    </wishlistContextApi.Provider>
  );
};
