import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useOrders = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async (page = 1, limit = 5) => {
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
    try {
      const response = await axios.get(
        `http://localhost:3000/payment/orders-admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        `http://localhost:3000/payment/orders/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          "http://localhost:3000/address/add",
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        addressId = addressResponse.data.newAddress._id;
      }

      const totalAmount = items.reduce(
        (sum, item) => sum + item.bookId.price * item.quantity,
        0
      );

      // Create order in the backend
      const orderResponse = await axios.post(
        "http://localhost:3000/payment/create-order",
        {
          items,
          userId,
          addressId,
          amount: totalAmount * 100,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Initiate Razorpay payment
      const {
        order_id: razorpayOrderId,
        amount,
        currency,
      } = orderResponse.data;
      const orderId = orderResponse.data.newOrder._id;
      const options = {
        key: "rzp_test_sahwpb5TiARJQe", // Use your own Razorpay test key
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
              "http://localhost:3000/payment/verify-payment",
              {
                paymentId: razorpay_payment_id,
                order_id: razorpay_order_id,
                signature: razorpay_signature,
                userId,
                items,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
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
      const response = await axios.get(`http://localhost:3000/address/get`);
      setAddresses(response.data);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    fetchOrders,
    fetchOrderDetails,
    updateOrderStatus,
    handleCheckout,
    addresses,
    fetchAddresses,
  };
};

export default useOrders;
