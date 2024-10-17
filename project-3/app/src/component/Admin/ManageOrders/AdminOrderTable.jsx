import React, { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import Layout from "../../AssetCopm/AdminLayout/Layout.jsx";
import { FaRegEye } from "react-icons/fa";
import usePagination from "../../../hooks/usePagination.jsx";
import useOrders from "../../../hooks/useOrders.js";
import Pagination from "../../AssetCopm/utils/Pagination.jsx";
const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    currentPage,
    totalPages,
    totalEntries,
    itemsPerPage,
    startEntry,
    endEntry,
    handlePageChange,
    setTotalPages,
    setTotalEntries,
  } = usePagination(1, 5);

  const { updateOrderStatus, fetchOrderDetails, fetchOrders } = useOrders();
  useEffect(() => {
    loadOrders();
  }, [currentPage]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders(currentPage, itemsPerPage);
      setOrders(data.orders || []);
      setTotalEntries(data.total);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };
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
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin Order Management</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      User
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Update Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b dark:border-gray-700 bg-slate-300"
                    >
                      <td className="px-4 py-3">{order._id}</td>
                      <td className="px-4 py-3">
                        {order.userId.name} ({order.userId.email})
                      </td>
                      <td className="px-4 py-3">₹{order.totalAmount}</td>
                      <td className="px-4 py-3">{order.orderStatus}</td>
                      <td className="px-4 py-3">
                        <select
                          className="px-4 py-2 rounded-md"
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
                          className="bg-slate-600 text-white ml-2 px-4 py-2 rounded-md"
                        >
                          Update
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedOrder(order)}>
                          <FaRegEye className="text-2xl text-green-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              startEntry={startEntry}
              endEntry={endEntry}
              totalEntries={totalEntries}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />

            {selectedOrder && (
              <OrderDetailsModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminOrderTable;
