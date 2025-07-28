import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import TextEditor from "../components/TextEditor";

const Post = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [cordinates, setCordinates] = useState({ latitude: "", longitude: "" });

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    country: "",
    state: "",
    city: "",
    category: "",
    address: "",
    pincode: "",
    location: undefined,
  });
  console.log(formData.description);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCordinates({ latitude, longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!res.ok) throw new Error("Failed to fetch location data");
          const data = await res.json();
          const address = data.display_name || `${latitude}, ${longitude}`;

          setFormData((prev) => ({
            ...prev,
            address,
            country: data.address?.country || "",
            state: data.address?.state || "",
            city: data.address?.city || "",
            location: { lat: latitude, lon: longitude },
          }));
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleFetchLocationByPincode = async () => {
    const { pincode } = formData;

    if (!pincode) {
      toast.error("Please enter a pincode");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
      );

      if (!response.ok) throw new Error("Failed to fetch location");

      const data = await response.json();

      if (data.length === 0) {
        toast.error("No location found for this pincode");
        return;
      }

      const { lat, lon, display_name } = data[0];

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const locationData = await res.json();

      setFormData((prev) => ({
        ...prev,
        address: display_name,
        city: locationData.address?.city || locationData.address?.town || "",
        state: locationData.address?.state || "",
        country: locationData.address?.country || "",
        location: { lat, lon },
      }));

      toast.success("Location updated from pincode");
    } catch (error) {
      console.error("Error fetching location from pincode:", error);
      toast.error("Could not fetch location");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });

    if (images && images.length > 0) {
      images.forEach((img) => {
        form.append("gallery", img.file);
      });
    }

    try {
      const response = await BasicAuthProvider("product/create").formMethod(
        form
      );
      toast.success(response.message);
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[150px] sm:pt-[90px] px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 border-b pb-4 font-mono">
          Post Your Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. iPhone 12 Pro Max"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Price (INR)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="499"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>
          <TextEditor setFormData={setFormData} />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">Select Category</option>
            <option value="Women">Women</option>
            <option value="Toys">Toys</option>
            <option value="Health">Health</option>
            <option value="Sports">Sports</option>
            <option value="Bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Accessories">Accessories</option>
            <option value="Watches">Watches</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Upload Photos
          </label>

          <div
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition"
            onClick={() => document.getElementById("imageInput").click()}
          >
            <FiUploadCloud className="text-4xl text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Click to upload or drag & drop</p>
            <p className="text-sm text-gray-400">You can add multiple images</p>
          </div>

          <input
            id="imageInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative w-32 h-32 group">
                  <img
                    src={img.preview}
                    alt={`upload-${index}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="India"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              State
            </label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Madhya Pradesh"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Indore"
            />
          </div>
        </div>

        {/* <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
          <button
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
            onClick={handleGetLocation}
          >
            Get Current Location
          </button>
        </div> */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Address & Pincode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 col-span-2"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div className="flex gap-4 mt-3 flex-wrap">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
              onClick={handleGetLocation}
            >
              Get Current Location
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
              onClick={handleFetchLocationByPincode}
              type="button"
            >
              Get Location by Pincode
            </button>
          </div>
        </div>

        <div className="text-right">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md flex items-center justify-center gap-2 disabled:opacity-70 float-right"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Product Exchange"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
