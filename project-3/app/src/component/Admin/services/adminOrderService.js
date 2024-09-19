import axios from "axios";

const token = localStorage.getItem("token");
export const fetchOrders = async () => {
  const response = await axios.get(
    "http://localhost:3000/payment/orders-admin",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchOrderDetails = async (id) => {
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

export const updateOrderStatus = async (id, status) => {
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
