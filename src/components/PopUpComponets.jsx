import { FaUserEdit } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaStarSolid } from "react-icons/lia";
import { MdOutlineMyLocation } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiPackage } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import toast from "react-hot-toast";

function PopUpComponets({ locpop, profileDrop, notiPop }) {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContextApi);
  const handleLogOut = async () => {
    try {
      const response = await BasicAuthProvider("user/logout").postMethod({});
      setIsLogin(false);
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        server;
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div
        className="absolute location-popup w-[14rem] h-60 bg-white drop-shadow-md overflow-y-auto"
        style={{ display: locpop.display }}
      >
        <ul className="w-full h-full">
          <li className="text-blue-500 font-bold flex items-center justify-center text-nowrap gap-1 h-12">
            <MdOutlineMyLocation className="text-xl" />
            <span>Use Current Location</span>
          </li>
          <hr />
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Vijay Nagar</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Palasia</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Rau</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Scheme No. 78</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Bhanwar Kuwa</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Rajendra Nagar</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Mhow</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Sudama Nagar</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Khajrana</span>
            </div>
            <div className="right"></div>
          </li>
          <li>
            <div className="left flex items-center gap-4">
              <GoLocation />
              <span>Bhicholi Mardana</span>
            </div>
            <div className="right"></div>
          </li>
        </ul>
      </div>

      <div
        className="absolute profile-popup w-[14rem] h-60 bg-white drop-shadow-md overflow-y-auto"
        style={{ display: profileDrop }}
      >
        <ul className="w-full h-full">
          <div className="flex items-center justify-center gap-2 mb-2 font-bold mt-4">
            <FaRegCircleUser />
            <span className="cursor-pointer">Vijay Randhave</span>
          </div>
          <hr />
          <li>
            {" "}
            <FaUserEdit />
            <NavLink to="/profile">
              <span>My Profile</span>
            </NavLink>
          </li>
          <li>
            <IoMdHeartEmpty />
            <NavLink to="/wishlist">
              <span>Wishlist</span>
            </NavLink>
          </li>
          <li>
            <TfiPackage /> <span>My Exchange</span>
          </li>
          <li>
            <LiaStarSolid /> <span>Ratings</span>
          </li>
          <li onClick={handleLogOut}>
            <RiLogoutBoxRLine /> <span>LogOut</span>
          </li>
        </ul>
      </div>

      <div
        className="absolute no-notification-popup w-[14rem] h-60 bg-white drop-shadow-md overflow-y-auto"
        style={{ display: notiPop }}
      >
        <div className="no-notification w-full h-full text-center">
          <h5>No notifications</h5>
          <p className="text-xs">Check back here for updates!</p>
          <img src="./notifications.webp" alt="" className="w-40" />
        </div>
      </div>
    </>
  );
}

export default PopUpComponets;
