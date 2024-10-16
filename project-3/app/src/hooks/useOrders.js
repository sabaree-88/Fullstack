import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const useOrders = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const fetchOrders = async (page = 1, limit = 5) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment/orders-admin?page=${page}&limit=${limit}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment/orders-admin/${id}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/payment/orders/status/${id}`,
        { status },
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const handleCheckout = async (
    items,
    userId,
    shippingAddress,
    selectedAddress,
    editAddress
  ) => {
    try {
      let addressId = selectedAddress;
      if (!selectedAddress || editAddress) {
        const addressResponse = await axios.post(
          `${API_BASE_URL}/address/add`,
          {
            userId,
            fullname: shippingAddress.fullname,
            address: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipcode: shippingAddress.zip,
            country: shippingAddress.country,
          },
          {
            headers,
          }
        );
        addressId = addressResponse.data.newAddress._id;
      }

      const totalAmount = items.reduce(
        (sum, item) => sum + item.bookId.price * item.quantity,
        0
      );

      const orderResponse = await axios.post(
        `${API_BASE_URL}/payment/create-order`,
        {
          items,
          userId,
          addressId,
          amount: totalAmount * 100,
          currency: "INR",
        },
        {
          headers,
        }
      );

      const {
        order_id: razorpayOrderId,
        amount,
        currency,
      } = orderResponse.data;
      const orderId = orderResponse.data.newOrder._id;
      const options = {
        key: "rzp_test_sahwpb5TiARJQe",
        amount,
        currency,
        name: "BOOKSTORE",
        description: "Book Purchase",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          try {
            await axios.post(
              `${API_BASE_URL}/payment/verify-payment`,
              {
                paymentId: razorpay_payment_id,
                order_id: razorpay_order_id,
                signature: razorpay_signature,
                userId,
                items,
              },
              {
                headers,
              }
            );
            navigate("/order-summary", { state: { orderId } });
          } catch (error) {
            console.error("Payment verification failed", error);
          }
        },
        prefill: {
          name: shippingAddress.fullname,
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Checkout process failed:", err);
      throw err;
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/address/get`);
      setAddresses(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const trackOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment/track-order/${orderId}`
      );
      setOrder(response.data.order);
    } catch (err) {
      setError("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const orderSummery = async (orderId) => {
    if (!orderId) {
      setError("Order ID is missing. Redirecting to cart...");
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/payment/ordersId/${orderId}`,
        {
          headers,
        }
      );
      setOrder(response.data.order);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const orderHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment/orders`, {
        headers,
      });
      setOrderData(response.data.orders);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.post(
        `${API_BASE_URL}/payment/cancel-order/${orderId}`,
        {
          headers,
        }
      );
      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Canceled" } : order
        )
      );
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  return {
    loading,
    error,
    addresses,
    order,
    orderData,
    fetchOrders,
    fetchOrderDetails,
    updateOrderStatus,
    handleCheckout,
    fetchAddresses,
    trackOrder,
    orderHistory,
    cancelOrder,
    orderSummery,
  };
};

export default useOrders;
