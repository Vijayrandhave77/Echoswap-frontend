export function Razorpay(orderId, amount) {
  var options = {
    key: import.meta.env.VITE_REZORPAY_KEY,
    amount: amount,
    currency: "INR",
    name: "Vijay Randhave",
    description: "Vijay Randhave",
    order_id: orderId,
    image: "https://example.com/your_logo",
    callback_url: `${import.meta.env.VITE_NODE_API}/api/orders/verification`,
    redirect: true,
    prefill: {
      name: "Vijay Randhave",
      email: "vijayrandhave75@gmail.com",
      contact: "+919165204250",
    },
    notes: {
      address: "Bicholi mardana indore",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp = new window.Razorpay(options);
  rzp.open();
}
