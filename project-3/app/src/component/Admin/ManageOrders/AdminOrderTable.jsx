import React, { useEffect, useState } from "react";
import { updateOrderStatus } from "../services/adminOrderService.js";
import OrderDetailsModal from "./OrderDetailsModal";
import Layout from "../../AssetCopm/AdminLayout/Layout.jsx";
import { FaRegEye } from "react-icons/fa";
import usePagination from "../../../hooks/usePagination.jsx";
import axios from "axios";
// const {
//   currentPage,
//   totalPages,
//   totalEntries,
//   itemsPerPage,
//   startEntry,
//   endEntry,
//   handlePageChange,
//   setTotalPages,
//   setTotalEntries,
// } = usePagination();
const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statuses, setStatuses] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/payment/orders-admin?page=1&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setOrders(response.data.orders);
      // setTotalPages(response.data.pages);
      // setTotalEntries(response.data.total);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">
              {/* {startEntry}-{endEntry} */}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              {/* {totalEntries} */}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                // onClick={() => handlePageChange(currentPage - 1)}
                // disabled={currentPage === 1}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ...
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                100
              </a>
            </li>
            <li>
              <button
                // onClick={() => handlePageChange(currentPage + 1)}
                // disabled={currentPage === totalPages}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default AdminOrderTable;
