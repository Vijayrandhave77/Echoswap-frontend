import { createContext, useContext, useEffect, useState } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { AuthContextApi } from "./AuthContextApi";
import toast from "react-hot-toast";

export const CartContextApi = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContextApi);
  const [cart, setCart] = useState([]);

  const getCartData = async () => {
    try {
      const response = await BasicAuthProvider("cart").getMethod();
      setCart(response?.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await BasicAuthProvider("cart/create").postMethod({
        productId: productId,
      });
      toast.success(response.message);
      getCartData();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const incQuantity = async (quantity, id) => {
    try {
      const response = await BasicAuthProvider(
        "cart/quantity/increase"
      ).postMethod({
        quantity: quantity,
        id: id,
      });
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  const decQuantity = async (quantity, id) => {
    try {
      const response = await BasicAuthProvider(
        "cart/quantity/decrease"
      ).postMethod({
        quantity: quantity,
        id: id,
      });
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (id) => {
    try {
      const response = await BasicAuthProvider("cart/delete").deleteMethod({
        cartId: id,
      });
      getCartData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [user]);

  const subTotal = cart?.reduce((total, item) => {
    return total + item?.totalAmount;
  }, 0);

  const products = cart.map((pro) => {
    return {
      product: pro.product._id,
      quantity: pro.quantity,
      totalAmount: pro.totalAmount,
    };
  });

  return (
    <>
      <CartContextApi.Provider
        value={{
          cart,
          setCart,
          addToCart,
          incQuantity,
          decQuantity,
          deleteCart,
          subTotal,
          products,
        }}
      >
        {children}
      </CartContextApi.Provider>
    </>
  );
}
