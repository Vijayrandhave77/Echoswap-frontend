import React, { useContext, useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { FiShare2, FiHeart } from "react-icons/fi";
import ProductImageSlider from "../components/ProductImageSlider";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { wishlistContextApi } from "../contextProvider/WishlistContextApi";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import toast from "react-hot-toast";
import { MMYY } from "../GenerelHelper/DateHelper";
import AddToCartButton from "../components/AddToCartButton";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { wishlists, addToWishlist } = useContext(wishlistContextApi);
  const { user } = useContext(AuthContextApi);
  const [product, setProduct] = useState({});
  const [wishState, setWishState] = useState(false);

  const handleShare = (product) => {
    const shareData = {
      title: product?.title,
      text: `Check out this product: ${product?.title}`,
      url: `${import.meta.env.VITE_BASE_URL}/details/${product?._id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error(err));
    } else {
      toast.error("Web Share not supported on this device.");
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await BasicAuthProvider(
          `product/show/${id}`
        ).getMethod();
        setProduct(response.product);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductById();
  }, []);

  useEffect(() => {
    const isWished = wishlists?.some(
      (wish) =>
        wish?.product === product?._id || wish?.product?._id === product?._id
    );
    setWishState(isWished);
  }, [wishlists, product?._id]);

  return (
    <div className="w-full min-h-screen flex justify-center px-4 pt-[150px] sm:pt-[90px] sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-5">
          <ProductImageSlider gallery={product?.gallery} />

          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Description</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white p-5 rounded-lg shadow-md relative">
            <div className="absolute top-4 right-4 flex gap-4">
              <button
                className="text-gray-600 hover:text-black"
                title="Share"
                onClick={() => handleShare(product)}
              >
                <FiShare2 size={20} />
              </button>
              {user?._id !== product?.postedBy?._id && (
                <button
                  className={`text-gray-600 hover:text-red-500 ${
                    wishState ? "text-red-500" : "text-gray-600"
                  }`}
                  onClick={() => addToWishlist(product?._id)}
                  title="Add to Wishlist"
                >
                  <FiHeart size={20} />
                </button>
              )}
            </div>

            <h2 className="text-2xl font-semibold">
              {product?.currency || "₹"}
              {product?.price}
            </h2>
            <p className="text-lg mt-1">{product?.title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
                <GoLocation />
                <span>{product?.address}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {product?.createdAt && MMYY(product.createdAt)}
              </p>
            </div>
          </div>

          {user?._id !== product?.postedBy?._id && (
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Seller Description</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full">
                  <img
                    src={product?.postedBy?.picture || "/user.png"}
                    alt="profile"
                    className="w-full h-full rounded-full border border-gray-300 object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{product?.postedBy?.name}</p>
                  <NavLink
                    to={`/profile/${product?.postedBy?._id}`}
                    className="text-blue-600 text-sm hover:underline mt-1 block"
                  >
                    View Profile
                  </NavLink>
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-3 mt-5 item-center">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition duration-200"
                  onClick={() => {
                    navigate(`/chat?user=${product?.postedBy?._id}`);
                  }}
                >
                  Chat with Seller
                </button>

                <div className="w-full flex items-center">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-md font-semibold mb-3">Location</h4>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-300">
              <iframe
                title="Seller Location"
                src={`https://www.google.com/maps?q=${product?.location?.lat},${product?.location?.lon}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
