import { useNavigate, useSearchParams } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const getOrderData = async () => {
    try {
      const response = await BasicAuthProvider(`orders/${orderId}`).getMethod();
      setOrder(response?.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return (
          <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            Paid
          </span>
        );
      case "created":
        return (
          <span className="px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
            Created
          </span>
        );
      case "attempted":
        return (
          <span className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
            Attempted
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  const subtotal = order?.products?.reduce(
    (sum, product) => sum + product?.totalAmount,
    0
  );
  const tax = 0;
  const grandTotal = subtotal + tax;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-gray-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 text-center border-b">
          <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Oops! Something went wrong with your payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Order Summary
            </h2>
            <p className="mb-1">
              <span className="font-medium">Order ID:</span> {order.orderId}
            </p>
            <p className="mb-1">
              <span className="font-medium">Amount:</span> ₹{order.amount / 100}{" "}
              {order.currency}
            </p>
            <p className="mb-1 flex items-center gap-2">
              <span className="font-medium">Status:</span>{" "}
              {getStatusBadge(order.status)}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Customer Info
            </h2>
            <p className="mb-1">
              <span className="font-medium">Name:</span> {order.user.name}
            </p>
            <p className="mb-1">
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
            <p className="mb-1">
              <span className="font-medium">Phone:</span> {order.user.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {order.user.address}
            </p>
          </div>
        </div>

        <div className="p-8 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Invoice</h2>
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={product.product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.product.gallery[0]}
                        alt={product.product.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div>
                        <p className="font-medium">{product.product.title}</p>
                        <p className="text-xs text-gray-500">
                          {product.product.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 border">{product.quantity}</td>
                  <td className="px-4 py-3 border">₹{product.product.price}</td>
                  <td className="px-4 py-3 border">₹{product.totalAmount}</td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-2 text-right font-semibold border"
                >
                  Subtotal
                </td>
                <td className="px-4 py-2 border">₹{subtotal}</td>
              </tr>
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-2 text-right font-semibold border"
                >
                  Tax
                </td>
                <td className="px-4 py-2 border">₹{tax}</td>
              </tr>
              <tr className="bg-gray-100">
                <td
                  colSpan="4"
                  className="px-4 py-2 text-right font-bold border"
                >
                  Grand Total
                </td>
                <td className="px-4 py-2 border font-bold text-red-700">
                  ₹{grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-8 pb-8 text-center flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg font-medium transition"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
}
