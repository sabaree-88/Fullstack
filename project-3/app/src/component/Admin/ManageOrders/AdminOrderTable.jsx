import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  updateOrderStatus,
} from "../services/adminOrderService.js";
import OrderDetailsModal from "./OrderDetailsModal";

const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { orders } = await fetchOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    const status = statuses[orderId];
    if (!status) return;
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Order Management</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Update Status</th>
              <th className="border px-4 py-2">View Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">
                  {order.userId.name} ({order.userId.email})
                </td>
                <td className="border px-4 py-2">₹{order.totalAmount}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
                <td className="border px-4 py-2">
                  <select
                    className="border p-2 rounded-md"
                    value={statuses[order._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(order._id)}
                    className="bg-blue-500 text-white ml-2 px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminOrderTable;
