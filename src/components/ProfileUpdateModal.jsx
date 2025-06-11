import { useState, useRef, useContext } from "react";
import { FiCamera, FiSettings } from "react-icons/fi";
import { AuthContextApi } from "../contextProvider/AuthContextApi";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

function ProfileUpdateModal({ setShowModal }) {
  const { user, setIsLogin, fetchUser } = useContext(AuthContextApi);
  const [formData, setFormData] = useState({
    username: user?.name,
    email: user?.email,
    phone: user?.phone,
    city: user?.city,
    address: user?.address,
    pincode: user?.pincode,
    bio: user?.bio,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(user?.picture);
  const fileInputRef = useRef(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false); // ✅ dropdown visibility

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value);
      }
    });

    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    try {
      const response = await BasicAuthProvider("user/update").formMethod(form);
      if (response) {
        setShowModal(false);
        fetchUser();
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
        {/* ✅ Settings Icon */}
        <div className="absolute top-4 right-4">
          <FiSettings
            className="text-gray-600 hover:text-gray-800 cursor-pointer w-6 h-6"
            title="Settings"
            onClick={() => setShowSettingsDropdown((prev) => !prev)}
          />
          {showSettingsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
              <button
                onClick={() => {
                  setShowSettingsDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <NavLink to="/create-password">Create Password</NavLink>
              </button>
              <button
                onClick={() => {
                  setShowSettingsDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <NavLink to="/forgot-password">Forgot Password</NavLink>
              </button>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex gap-8 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border relative">
            <img
              src={preview || "/user.png"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className="absolute left-20 top-24 rounded-full p-2 cursor-pointer shadow-md flex items-center justify-center bg-white"
            >
              <FiCamera className="text-black w-5 h-5" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="w-2/3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="col-span-2 border px-3 py-2 rounded w-full"
              />
            </div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows={3}
              className="w-full border px-3 py-2 rounded"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-700 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ProfileUpdateModal;
