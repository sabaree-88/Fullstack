import axios from "axios";
import React from "react";

const useOrders = () => {
  const token = localStorage.getItem("token");
  const fetchOrders = async (page = 1, limit = 5) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/payment/orders-admin?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const fetchOrderDetails = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/payment/orders-admin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const updateOrderStatus = async (id, status) => {
    const response = await axios.put(
      `http://localhost:3000/payment/orders/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  return {
    updateOrderStatus,
    fetchOrderDetails,
    fetchOrders,
  };
};

export default useOrders;
