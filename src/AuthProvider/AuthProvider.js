import axios from "axios";
import Cookies from "js-cookie";
export function BasicAuthProvider(endpoint) {
  const token = Cookies.get("EchoswapTokenCookies");
  const API_URL = `${import.meta.env.VITE_NODE_API}/api/${endpoint}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const formconfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return {
    getMethod: async () => {
      try {
        const res = await axios.get(API_URL, config);
        return res.data;
      } catch (err) {
        throw err;
      }
    },

    postMethod: async (data) => {
      try {
        const res = await axios.post(API_URL, data, config);
        return res.data;
      } catch (err) {
        throw err;
      }
    },

    putMethod: async (data) => {
      try {
        const res = await axios.put(API_URL, data, config);
        return res.data;
      } catch (err) {
        throw err;
      }
    },

    formMethod: async (data) => {
      try {
        const res = await axios.post(API_URL, data, formconfig);
        return res.data;
      } catch (err) {
        throw err;
      }
    },

    deleteMethod: async (data) => {
      try {
        const res = await axios.delete(API_URL, { ...config, data: data });
        return res.data;
      } catch (err) {
        throw err;
      }
    },
  };
}
