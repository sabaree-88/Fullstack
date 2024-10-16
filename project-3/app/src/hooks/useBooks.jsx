import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const useBooks = (user, limit, page) => {
  const [data, setData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const booksRes = await axios.get(
          `${API_BASE_URL}/book?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newBooks = booksRes.data.books;
        setHasMore(newBooks.length > 0);

        setData((prevData) => {
          const combinedData = [...prevData, ...newBooks];
          const uniqueData = combinedData.filter(
            (book, index, self) =>
              index === self.findIndex((b) => b._id === book._id)
          );
          return uniqueData;
        });

        const favRes = await axios.get(
          `${API_BASE_URL}/favourites/get-favourites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourites(favRes.data || []);

        const cartRes = await axios.get(`${API_BASE_URL}/cart/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(cartRes.data.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, limit, page]);

  const handleFavouriteClick = async (bookId) => {
    const token = localStorage.getItem("token");
    const isFav = isFavourite(bookId);

    try {
      if (isFav) {
        await axios.post(
          `${API_BASE_URL}/favourites/remove-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavourites((prevFavourites) =>
          prevFavourites.filter((fav) => fav._id !== bookId)
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/favourites/add-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavourites((prevFavourites) => [...prevFavourites, { _id: bookId }]);
      }
    } catch (err) {
      console.error("Failed to update favorites", err);
      setError("Failed to add/remove favorites.");
    }
  };

  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token");

    if (!bookId) {
      console.error("This product is out of stock");
      setError("This product is out of stock.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/cart/add-to-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prevCartItems) => [...prevCartItems, { _id: bookId }]);
    } catch (err) {
      console.error("Failed to add to cart", err);
      setError("Failed to add to cart.");
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE_URL}/cart/remove-from-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bookId && item.bookId._id !== bookId)
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
        `${API_BASE_URL}/cart/update-quantity`,
        { bookId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.bookId && item.bookId._id === bookId
            ? { ...item, quantity: newQuantity }
            : item
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
      .filter((item) => item.bookId && selectedItems.includes(item.bookId._id))
      .reduce((total, item) => total + item.bookId.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    const items = cartItems.filter(
      (item) => item.bookId && selectedItems.includes(item.bookId._id)
    );
    const userId = user._id;

    navigate("/checkout", {
      state: {
        items,
        userId,
      },
    });
  };

  const isFavourite = (bookId) => {
    return favourites && favourites.some((fav) => fav._id === bookId);
  };

  const isInCart = (bookId) => {
    return (
      cartItems &&
      cartItems.some((item) => item.bookId && item.bookId._id === bookId)
    );
  };

  return {
    data,
    favourites,
    cartItems,
    loading,
    error,
    hasMore,
    selectedItems,
    handleFavouriteClick,
    handleAddToCart,
    handleRemoveFromCart,
    handleQuantityChange,
    handleSelectItem,
    calculateTotal,
    handleProceedToCheckout,
    isFavourite,
    isInCart,
  };
};

export default useBooks;
