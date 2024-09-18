import React, { useState, useEffect } from "react";
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

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editAddress, setEditAddress] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/address/get`);
        console.log(response.data);
        setAddresses(response.data);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };
    fetchAddresses();
  }, [userId]);

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
          }
        );
        addressId = addressResponse.data.newAddress._id;
      }

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

      const {
        order_id: razorpayOrderId,
        amount,
        currency,
      } = orderResponse.data;
      const orderId = orderResponse.data.newOrder._id;
      // console.log("OrderId", orderId);
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
            await axios.post("http://localhost:3000/payment/verify-payment", {
              paymentId: razorpay_payment_id,
              order_id: razorpay_order_id,
              signature: razorpay_signature,
              userId,
              items,
            });
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
        {addresses.length > 0 && !editAddress ? (
          <>
            <h3 className="text-xl font-medium mb-2">
              Select Shipping Address
            </h3>
            {addresses.map((address) => (
              <div key={address._id} className="mb-4">
                <input
                  type="radio"
                  id={address._id}
                  name="selectedAddress"
                  value={address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  checked={selectedAddress === address._id}
                />
                <label htmlFor={address._id} className="ml-2">
                  {address.fullname}, {address.address}, {address.city},{" "}
                  {address.state}, {address.zip}, {address.country}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShippingAddress(address);
                    setEditAddress(true);
                    setSelectedAddress(null);
                  }}
                  className="ml-4 text-blue-500"
                >
                  Edit
                </button>
              </div>
            ))}
            <button
              onClick={() => setEditAddress(true)}
              className="text-blue-500 mt-4"
            >
              Add New Address
            </button>

            {selectedAddress && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">
                {editAddress ? "Update Address" : "Add New Address"}
              </h3>
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
        )}
      </div>
    </UserLayout>
  );
};

export default CheckoutPage;
