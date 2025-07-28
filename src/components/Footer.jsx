import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6  overflow-x-hidden mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 overflow-hidden">
          <div>
            <h3 className="text-lg font-semibold mb-4">POPULAR LOCATIONS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Kolkata</a>
              </li>
              <li>
                <a href="#">Mumbai</a>
              </li>
              <li>
                <a href="#">Chennai</a>
              </li>
              <li>
                <a href="#">Pune</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">TRENDING LOCATIONS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Bhubaneshwar</a>
              </li>
              <li>
                <a href="#">Hyderabad</a>
              </li>
              <li>
                <a href="#">Chandigarh</a>
              </li>
              <li>
                <a href="#">Nashik</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">About EchoSwap Group</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">EchoSwapPeople</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4 text-xl">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          <p className="leading-relaxed">
            Other Countries: Pakistan - South Africa - Indonesia
          </p>
          <p className="mt-2">© 2025 EchoSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
