import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Razorpay } from "../GenerelHelper/PaymentHelper";
import { BasicAuthProvider } from "../AuthProvider/AuthProvider";
import { CartContextApi } from "../contextProvider/CartContextApi";

export default function CartPage() {
  const { cart, incQuantity, decQuantity, deleteCart, subTotal, products } =
    useContext(CartContextApi);

  const handelOrders = async (e) => {
    try {
      const response = await BasicAuthProvider(`orders/checkout`).postMethod({
        amount: Number(subTotal),
        products: products,
      });
      if (response.orderResponse.amount) {
        Razorpay(response.orderResponse.orderId, response.orderResponse.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-10 px-4 sm:px-8">
      <div className="px-4 py-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-150px)]">
            <div className="md:col-span-2 overflow-y-auto pr-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product?._id}
                  className="flex items-center justify-between bg-white shadow-sm p-4 rounded-xl border"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={
                        item?.product?.gallery[0]
                          ? item?.product?.gallery[0]
                          : "/no_image.jpg"
                      }
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex justify-between w-full items-center">
                      <div>
                        <h2 className="text-base md:text-lg font-medium">
                          {item?.product?.title}
                        </h2>
                        <p className="text-sm font-semibold">
                          ₹{item?.totalAmount}
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 border rounded hover:bg-blue-100 text-sm"
                            onClick={() => {
                              decQuantity(1, item?._id);
                            }}
                          >
                            -
                          </button>
                          <span className="min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 border rounded hover:bg-blue-100 text-sm"
                            onClick={() => {
                              incQuantity(1, item?._id);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 text-xl ml-4"
                    title="Remove item"
                    onClick={() => {
                      deleteCart(item._id);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-md p-6 rounded-xl h-fit sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <hr className="mb-4" />
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>₹{subTotal}</span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={handelOrders}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
