import Cookies from "js-cookie";

export const checkToken = () => {
  return Cookies.get("EchoswapTokenCookies");
};
