import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContextApi } from "../contextProvider/CartContextApi";

export default function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContextApi);
  const handleAddToCart = () => {
    addToCart(product?._id);
  };
  return (
    <button
      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white text-sm sm:text-base transition-all duration-200 bg-blue-500 hover:bg-blue-600 w-full"
      onClick={handleAddToCart}
    >
      <FiShoppingCart className="text-lg" />
      Add to Cart
    </button>
  );
}
