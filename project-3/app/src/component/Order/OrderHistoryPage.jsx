import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user's orders from backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.post(`/api/orders/${orderId}/cancel`);
      // Update the order status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Canceled" } : order
        )
      );
    } catch (err) {
      alert("Failed to cancel the order.");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-medium">Order #{order._id}</h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Items */}
                <div>
                  <h4 className="font-medium mb-2">Items</h4>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.bookId} className="flex justify-between">
                        <span>
                          {item.title} (x{item.quantity})
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total */}
                <div>
                  <h4 className="font-medium mb-2">Total</h4>
                  <p className="text-lg font-semibold">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/track-order/${order._id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Track Order
                  </button>
                  {order.orderStatus === "Processing" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
