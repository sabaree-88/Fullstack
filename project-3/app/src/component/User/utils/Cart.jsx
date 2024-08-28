import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";
import ProductLoading from "../../AssetCopm/utils/skeleton/ProductLoading";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

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
      setSelectedItems((prevItems) =>
        prevItems.filter((itemId) => itemId !== bookId)
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

  const handleSelectItem = (bookId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(bookId)
        ? prevSelectedItems.filter((item) => item !== bookId)
        : [...prevSelectedItems, bookId]
    );
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.bookId._id))
      .reduce((total, item) => total + item.bookId.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.includes(item.bookId._id)
    );

    // Proceed with the checkout process using itemsToCheckout
  };

  if (loading) {
    return <ProductLoading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <UserLayout>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.bookId._id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div>
                          <input
                            type="checkbox"
                            className="rounded-lg w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            checked={selectedItems.includes(item.bookId._id)}
                            onChange={() => handleSelectItem(item.bookId._id)}
                          />
                        </div>
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={`http://localhost:3000${item.bookId.imagePath}`}
                            alt={item.bookId.title}
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={`http://localhost:3000${item.bookId.imagePath}`}
                            alt={item.bookId.title}
                          />
                        </a>
                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.bookId._id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="counter-input"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              data-input-counter=""
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder=""
                              defaultValue={item.quantity}
                              value={item.quantity}
                              required=""
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.bookId._id,
                                  item.quantity + 1
                                )
                              }
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="counter-input"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              ${item.bookId.price}
                            </p>
                          </div>
                        </div>
                        <div className="md:order-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.bookId.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.bookId.author}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-4 pt-4 md:pt-6">
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item.bookId._id)}
                          className="inline-flex gap-2 text-sm font-medium text-primary-600 hover:text-primary-500"
                        >
                          <svg
                            className="h-4 w-4 text-red-600 dark:text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 6h-15M6.75 6V4.5a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V6m2.25 0v12.75A2.25 2.25 0 0115.75 21h-7.5a2.25 2.25 0 01-2.25-2.25V6h13.5z"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-w-42 flex flex-col items-center border border-gray-300 rounded-md p-4 gap-4 bg-white py-4 md:top-16 md:bg-gray-50 lg:top-28 xl:w-80 xl:flex-none xl:bg-transparent">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                    <p>Subtotal</p>
                    <p>${calculateTotal()}</p>
                  </div>
                  <Link
                    onClick={handleProceedToCheckout}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-primary-600 px-4 py-2 text-base font-medium shadow-sm transition-all hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="text-center text-sm font-medium text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <p className="text-center text-sm font-medium text-gray-500">
                    or{" "}
                    <Link
                      to="/user-dashboard"
                      className="text-primary-600 hover:text-primary-500 underline"
                    >
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default Cart;
