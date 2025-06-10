import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { wishlistContextApi } from "../contextProvider/WishlistContextApi";
import { NavLink } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

function Wishlists() {
  const { wishlists } = useContext(wishlistContextApi);

  return (
    <div className="w-full pt-[150px] sm:pt-[90px]">
      <div className="product-heading font-bold p-2 px-8 text-lg">
        Latest Suggestions
      </div>
      <div className="product-card-container w-full px-4 md:px-10 py-4 flex flex-wrap gap-4 justify-center">
        {wishlists?.length > 0 ? (
          <>
            {wishlists?.map((wish, index) => (
              <ProductCard products={wish?.product} key={index} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FiHeart className="text-red-400 text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-1">
              Looks like you haven’t added anything to your wishlist yet.
            </p>
            <NavLink
              to="/"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Browse Exchange Products
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlists;
