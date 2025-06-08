import { FaTools } from "react-icons/fa";

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <FaTools size={60} className="text-blue-500 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Feature in Progress
      </h1>
      <p className="text-gray-600 text-sm max-w-md">
        We're working hard to bring you this feature. Please check back soon!
      </p>
    </div>
  );
}
