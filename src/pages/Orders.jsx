import { useEffect, useState } from "react";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await BasicAuthProvider("orders/all").getMethod();
      setOrders(response.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const common = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status?.toLowerCase()) {
      case "captured":
        return (
          <span className={`${common} text-green-700 bg-green-100`}>Paid</span>
        );
      case "created":
        return (
          <span className={`${common} text-yellow-700 bg-yellow-100`}>
            Created
          </span>
        );
      case "failed":
        return (
          <span className={`${common} text-red-700 bg-red-100`}>Failed</span>
        );
      default:
        return (
          <span className={`${common} text-gray-700 bg-gray-100`}>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        🧾 My Orders
      </h1>

      {loading ? (
        <div className="text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Amount (₹)</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 text-blue-600 font-medium">
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="hover:underline"
                    >
                      {order.orderId}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-5 py-3">₹{order.amount / 100}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
