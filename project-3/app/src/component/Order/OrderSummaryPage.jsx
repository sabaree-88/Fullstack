import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSummaryPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p className="text-red-500">No order details available.</p>
        <Link to="/cart" className="text-blue-500 underline">
          Go back to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      {/* Order Details */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.zip}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Payment Method</h3>
        <p>
          {order.paymentMethod.charAt(0).toUpperCase() +
            order.paymentMethod.slice(1)}
        </p>
        <p className="mt-1">Payment Status: {order.paymentStatus}</p>
      </div>

      {/* Ordered Items */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Items</h3>
        <ul className="space-y-4">
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

      {/* Total Amount */}
      <div className="mb-6 text-right">
        <span className="text-lg font-semibold">
          Total: ${order.totalAmount.toFixed(2)}
        </span>
      </div>

      {/* Order Status */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Order Status</h3>
        <p>{order.orderStatus}</p>
      </div>

      <Link to="/" className="text-blue-500 underline">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSummaryPage;
