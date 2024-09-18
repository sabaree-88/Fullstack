import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>User:</strong> {order.userId.name} ({order.userId.email})
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{order.totalAmount}
        </p>
        <p>
          <strong>Status:</strong> {order.orderStatus}
        </p>
        <h4 className="mt-4 font-semibold">Items:</h4>
        <ul className="list-disc pl-5">
          {order.items.map((item) => (
            <li key={item.bookId._id}>
              {item.bookId.title} - {item.quantity} x ₹{item.bookId.price}
            </li>
          ))}
        </ul>
        <h4 className="mt-4 font-semibold">Shipping Address:</h4>
        <p>
          {order.addressId.street}, {order.addressId.city},{" "}
          {order.addressId.zipcode}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
