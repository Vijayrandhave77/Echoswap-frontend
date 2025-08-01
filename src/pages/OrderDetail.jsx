import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await BasicAuthProvider(
          `orders/orderId/${orderId}`
        ).getMethod();
        setOrder(res?.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status?.toLowerCase()) {
      case "captured":
        return (
          <span className={`${base} text-green-700 bg-green-100`}>Paid</span>
        );
      case "created":
        return (
          <span className={`${base} text-yellow-700 bg-yellow-100`}>
            Created
          </span>
        );
      case "failed":
        return (
          <span className={`${base} text-red-700 bg-red-100`}>Failed</span>
        );
      default:
        return (
          <span className={`${base} text-gray-700 bg-gray-100`}>{status}</span>
        );
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  const subtotal = order?.products?.reduce((sum, p) => sum + p.totalAmount, 0);
  const tax = 0;
  const grandTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border">
        <div className="p-6 border-b text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Order Summary
          </h1>
          <p className="text-sm text-gray-500">
            Details for Order #{order.orderId}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Order Info
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Status:</strong> {getStatusBadge(order.status)}
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.amount / 100} {order.currency}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Customer Info
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.user.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.user.address}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Items</h2>
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item, i) => (
                <tr
                  key={item.product._id}
                  className="hover:bg-gray-50 border-b"
                >
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.gallery[0] || "/placeholder.png"}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.product.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border">{item.quantity}</td>
                  <td className="p-3 border">₹{item.product.price}</td>
                  <td className="p-3 border">₹{item.totalAmount}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="p-3 text-right font-semibold">
                  Subtotal
                </td>
                <td className="p-3">₹{subtotal}</td>
              </tr>
              <tr>
                <td colSpan="4" className="p-3 text-right font-semibold">
                  Tax
                </td>
                <td className="p-3">₹{tax}</td>
              </tr>
              <tr className="bg-gray-100">
                <td colSpan="4" className="p-3 text-right font-bold">
                  Grand Total
                </td>
                <td className="p-3 font-bold text-green-700">₹{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 pb-6 text-center">
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            ← Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
}
