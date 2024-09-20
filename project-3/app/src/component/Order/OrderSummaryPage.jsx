import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const OrderSummaryPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { orderId } = state || {};
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOrders = async () => {
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
          `http://localhost:3000/payment/ordersId/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data.order);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderId, token, navigate]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p className="text-red-500">{error}</p>
        <Link to="/cart" className="text-blue-500 underline">
          Go back to Cart
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p className="text-red-500">No order details available.</p>
        <Link to="/cart" className="text-blue-500 underline">
          Go back to Cart
        </Link>
      </div>
    );
  }

  return (
    <UserLayout>
      <div className="w-6/12 mx-auto p-6 bg-white rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="grid gap-2">
          <div className="border p-4">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
              <p>{order.addressId?.address || "Address not available"}</p>
              <p>
                {order.addressId?.state || "State not available"}{" "}
                {order.addressId?.zipcode || "ZIP code not available"}
              </p>
              <p>{order.addressId?.country || "Country not available"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Payment Method</h3>
              <p className="mt-1">
                Payment Status: {order.paymentStatus || "N/A"}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Items</h3>
              <ul className="space-y-4">
                {order.items?.length > 0 ? (
                  order.items.map((product) => (
                    <li key={product._id} className="flex justify-between">
                      <span>
                        {product.bookId?.title || "Product title not available"}{" "}
                        (x
                        {product.quantity})
                      </span>
                      <span>
                        $
                        {(
                          product.bookId?.price * product.quantity || 0
                        ).toFixed(2)}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No items available</li>
                )}
              </ul>
            </div>

            <div className="mb-6 text-right">
              <span className="text-lg font-semibold">
                Total: ${order.totalAmount || "0.00"}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Order Status</h3>
              <p>{order.orderStatus || "Status not available"}</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="text-blue-500 underline">
          Continue Shopping
        </Link>
      </div>
    </UserLayout>
  );
};

export default OrderSummaryPage;
