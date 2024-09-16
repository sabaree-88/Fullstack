import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { items = [], userId = null } = state || {};
  const [shippingAddress, setShippingAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
        }
      );
      console.log(addressResponse);
      const addressId = addressResponse.data.newAddress._id;
      if (addressResponse.status === 200 && addressId) {
        const totalAmount = Array.isArray(items)
          ? items.reduce(
              (sum, item) => sum + item.bookId.price * item.quantity,
              0
            )
          : 0;

        const orderResponse = await axios.post(
          "http://localhost:3000/payment/create-order",
          {
            items,
            userId,
            addressId,
            amount: totalAmount * 100,
            currency: "INR",
          }
        );

        const { order_id, amount, currency } = orderResponse.data;
        const options = {
          key: "rzp_test_sahwpb5TiARJQe",
          amount: amount,
          currency: currency,
          name: "BOOKSTORE",
          description: "Book Purchase",
          order_id: order_id,
          handler: async function (response) {
            const paymentId = response.razorpay_payment_id;
            const order_id = response.razorpay_order_id;
            const signature = response.razorpay_signature;
            try {
              await axios.post("http://localhost:3000/payment/verify-payment", {
                paymentId,
                order_id,
                signature,
                userId,
                items,
              });
              navigate("/order-summary");
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
      } else {
        setError("Failed to store the address. Please try again.");
      }
    } catch (err) {
      setError("Failed to process checkout. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="fullname"
                value={shippingAddress.fullname}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                required
                placeholder="Address"
                className="border border-gray-300 p-2 rounded-md"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="flex-1 border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="flex-1 border border-gray-300 p-2 rounded-md"
                />
              </div>
              <input
                type="text"
                name="zip"
                value={shippingAddress.zip}
                onChange={handleChange}
                required
                placeholder="ZIP Code"
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                required
                placeholder="Country"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default CheckoutPage;
