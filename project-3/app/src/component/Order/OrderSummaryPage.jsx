import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const OrderSummaryPage = () => {
  const [order, setOrder] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `http://localhost:3000/payment/orders/${user._id}`
      );
      setOrder(response.data.orders);
    };
    fetchOrders();
  }, [user._id]);

  if (!order.length) {
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
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-3 gap-2">
          {order.map((item) => (
            <div key={item._id} className="bg-slate-400 border p-4">
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Shipping Address</h3>
                <p>{item.addressId.fullname}</p>
                <p>{item.addressId.address}</p>
                <p>
                  {item.addressId.city}, {item.addressId.state}{" "}
                  {item.addressId.zipcode}
                </p>
                <p>{item.addressId.country}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Payment Method</h3>
                <p className="mt-1">Payment Status: {item.paymentStatus}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Items</h3>
                <ul className="space-y-4">
                  {item.items.map((product) => (
                    <li
                      key={product.bookId._id}
                      className="flex justify-between"
                    >
                      <span>
                        {product.bookId.title} (x{product.quantity})
                      </span>
                      <span>
                        ${(product.bookId.price * product.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 text-right">
                <span className="text-lg font-semibold">
                  Total: ${item.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Order Status</h3>
                <p>{item.orderStatus}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/cart" className="text-blue-500 underline">
          Continue Shopping
        </Link>
      </div>
    </UserLayout>
  );
};

export default OrderSummaryPage;
