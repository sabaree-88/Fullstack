import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/payment/track-order/${orderId}`
        );
        console.log(response.data.order.addressId.city);
        setOrder(response.data.order);
      } catch (err) {
        setError("Failed to fetch order details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-10">No order found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Track Order #{order._id}</h2>

      <div className="border p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-medium">
              Order Status: {order.orderStatus}
            </h3>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Items</h4>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.bookId._id} className="flex justify-between">
                <span>
                  {item.bookId.title} (x{item.quantity})
                </span>
                <span>${(item.bookId.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Shipping Address</h4>

          <p>
            {order.addressId.city}, {order.addressId.state}
            {order.addressId.zipCode}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Total Amount</h4>
          <p className="text-lg font-semibold">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Order Progress</h4>
          <p>Current status: {order.orderStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
