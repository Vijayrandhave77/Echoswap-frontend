import { useContext, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { wishlistContextApi } from "../contextProvider/WishlistContextApi";

function ProductCard({ products }) {
  const { wishlists, addToWishlist } = useContext(wishlistContextApi);
  const navigate = useNavigate();
  const [wishState, setWishState] = useState(false);
  const handleProductDetails = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const isWished = wishlists?.some(
      (wish) =>
        wish?.product === products?._id || wish?.product?._id === products?._id
    );
    setWishState(isWished);
  }, [wishlists, products?._id]);

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden relative w-64">
      <button
        onClick={() => addToWishlist(products?._id)}
        title="Add to Wishlist"
        className={`absolute top-2 right-2 z-10  hover:text-red-500 bg-white bg-opacity-80 rounded-full p-1 transition-colors duration-200 ${
          wishState ? "text-red-500" : "text-gray-600"
        }`}
      >
        <FiHeart size={20} />
      </button>

      <div className="card-image overflow-hidden">
        <img
          src={products?.gallery[0] ? products?.gallery[0] : "/no_image.jpg"}
          alt="iPhone 12 Pro Max"
          className="cursor-auto w-full h-40 object-cover"
        />
      </div>

      <div className="information px-4 py-2 flex flex-col justify-evenly text-sm text-black cursor-pointer">
        <div
          onClick={() => {
            handleProductDetails(products?._id);
          }}
        >
          <div>
            <p className="font-bold text-lg">{products?.price}</p>
            <p className="truncate">{products?.title}</p>
          </div>
          <div className="userInfo text-xs text-gray-700 mt-2 flex justify-between">
            <NavLink
              to={`/profile/${products?.postedBy?._id}`}
              className="flex gap-2 items-center"
            >
              <img
                src={products?.postedBy?.picture || "/user.png"}
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-300 object-cover"
              />
              <p>{products?.postedBy?.name}</p>
            </NavLink>
            <p className="flex items-center">
              {products?.createdAt &&
                new Date(products?.createdAt).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
