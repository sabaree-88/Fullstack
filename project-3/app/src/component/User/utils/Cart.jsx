import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";
const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/cart/get-cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data.items);
        setLoading(false);
      } catch (err) {
        alert()
        setError(err.message || "Failed to load cart items");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleRemoveFromCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:3000/cart/remove-from-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bookId._id !== bookId)
      );
    } catch (err) {
      console.error("Failed to remove item from cart", err);
    }
  };

  const handleQuantityChange = async (bookId, newQuantity) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:3000/cart/update-quantity`,
        { bookId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.bookId._id === bookId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.bookId.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <UserLayout>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.bookId._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:3000${item.bookId.imagePath}`}
                      alt={item.bookId.title}
                      className="h-20 w-20 object-contain"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-bold">{item.bookId.title}</h2>
                      <p>{item.bookId.author}</p>
                      <p>${item.bookId.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.bookId._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-300"
                    >
                      -
                    </button>
                    <p className="mx-2">{item.quantity}</p>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.bookId._id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveFromCart(item.bookId._id)}
                      className="px-4 py-2 bg-red-500 text-white"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h2 className="text-xl font-bold">
                Total: ${calculateTotal().toFixed(2)}
              </h2>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white font-bold">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default Cart;
