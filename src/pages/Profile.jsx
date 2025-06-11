import { useContext, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaIdBadge,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import ProductCard from "../components/ProductCard";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DateHelper from "../GenerelHelper/DateHelper";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
const Profile = () => {
  const { user } = useContext(AuthContextApi);
  const navigate = useNavigate();
  const params = useParams();
  let location = useLocation();
  const { id } = params;
  const [profile, setProfile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [follow, setFollow] = useState({});
  const [product, setProduct] = useState([]);

  const rating = 3.5;

  const getFollowFollowing = async () => {
    try {
      const response = await BasicAuthProvider(
        `follow/following/all`
      ).getMethod();
      setFollow(response.data);
      if (id || user?._id) {
        const isFollowingNow = response.data.followingCount.some(
          (entry) => entry.following === user._id || entry.following === id
        );
        setIsFollowing(isFollowingNow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const userId = id || user?._id;
        const response = await BasicAuthProvider(
          `user/findbyid/${userId}`
        ).getMethod();
        setProfile(response.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserById();
    getFollowFollowing();
  }, [user, id]);

  const handleFollowUnfollow = async () => {
    try {
      const followingId = id || user?._id;
      const response = await BasicAuthProvider(`follow/followuser`).postMethod({
        followingId,
      });
      getFollowFollowing();
      if (followingId === response?.follow?.following) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
      toast.success(response.message);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = id || user?._id;
        const response = await BasicAuthProvider(
          `product/userProduct/${userId}`
        ).getMethod();
        getFollowFollowing();
        setProduct(response.product);
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    };

    fetchProducts();
  }, [user, id]);

  useEffect(() => {
    if (location.pathname === "/profile" && !user) {
      navigate("/");
    }
  }, []);

  const handleShare = () => {
    const url = id
      ? `${import.meta.env.VITE_BASE_URL}/profile/${id}`
      : `${import.meta.env.VITE_BASE_URL}/profile`;
    const shareData = {
      title: "Profile",
      text: `Check out this Profile`,
      url: url,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error(err));
    }
  };

  return (
    <div className="min-h-screen pt-[150px] sm:pt-[90px] px-4 flex justify-center relative">
      <div className="w-full p-6 flex flex-col md:flex-row gap-2">
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          <div className="w-24 h-24 rounded-full  flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-2 border-gray-400">
            <img
              src={profile?.picture || "/user.png"}
              alt="picture not found"
              referrerPolicy="no-referrer"
              className="object-cover rounded-full w-full h-full"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <h2 className="text-xl font-semibold">{profile?.name}</h2>
            {id && id !== user?._id && (
              <button
                onClick={() => {
                  handleFollowUnfollow();
                }}
                className={`px-3 py-1 text-sm font-semibold rounded ${
                  isFollowing
                    ? "bg-gray-300 text-black"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => {
              if (rating >= i + 1) {
                return <FaStar key={i} className="text-yellow-500" />;
              } else if (rating >= i + 0.5) {
                return <FaStarHalfAlt key={i} className="text-yellow-500" />;
              } else {
                return <FaRegStar key={i} className="text-yellow-500" />;
              }
            })}
            <span className="ml-2 text-sm text-gray-600">({rating})</span>
          </div>

          <div className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <FaCalendarAlt />
            <span>Member since {DateHelper(profile?.createdAt)}</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <FaUsers className="inline mr-1" />
            {follow?.followerCount?.length} Followers |{" "}
            {follow?.followingCount?.length}
            {""}
            Following
          </div>
          <p className="mt-4 text-sm font-medium">User verified with</p>
          <div className="flex gap-3 mt-1 text-blue-500">
            <FaGlobe size={18} />
            <FaIdBadge size={18} />
          </div>
          {(!id || id === user?._id) && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded flex items-center gap-2"
            >
              <FaIdBadge /> Edit Profile
            </button>
          )}

          <button
            className="mt-2 text-blue-700 font-bold underline text-sm"
            onClick={handleShare}
          >
            Share Profile
          </button>
        </div>

        <div className="w-full flex flex-wrap gap-6 justify-start">
          {product?.map((product, index) => (
            <ProductCard products={product} key={index} />
          ))}
        </div>
      </div>

      {showModal && <ProfileUpdateModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Profile;
