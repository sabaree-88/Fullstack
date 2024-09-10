import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("stripe");
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
      const response = await axios.post("http://localhost:3000/address/add", {
        fullname: shippingAddress.fullname,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipcode: shippingAddress.zip,
        country: shippingAddress.country,
        paymentMethod,
      });

      if (response.status === 200) {
        navigate("/payment", { state: { shippingAddress, paymentMethod } });
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
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                required
                placeholder="Address"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                name="zip"
                value={shippingAddress.zip}
                onChange={handleChange}
                required
                placeholder="ZIP Code"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                required
                placeholder="Country"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Payment Method</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Stripe</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">PayPal</span>
              </label>
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
