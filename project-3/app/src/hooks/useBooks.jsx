import { useState, useEffect } from "react";
import axios from "axios";
const useBooks = (user, limit) => {
  const [data, setData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const booksRes = await axios.get(
          `http://localhost:3000/book?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(booksRes.data.books);

        const favRes = await axios.get(
          `http://localhost:3000/favourites/get-favourites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourites(favRes.data || []);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, limit]);

  const handleFavouriteClick = async (bookId) => {
    const token = localStorage.getItem("token");
    const isFav = isFavourite(bookId);

    try {
      if (isFav) {
        await axios.post(
          `http://localhost:3000/favourites/remove-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavourites((prevFavourites) =>
          prevFavourites.filter((fav) => fav._id !== bookId)
        );
      } else {
        await axios.post(
          `http://localhost:3000/favourites/add-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavourites((prevFavourites) => [...prevFavourites, { _id: bookId }]);
      }
    } catch (err) {
      console.error("Failed to update favourites", err);
      setError("Failed to add/remove favorites.");
    }
  };

  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:3000/cart/add-to-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prevCartItems) => [...prevCartItems, { _id: bookId }]);
    } catch (err) {
      console.error("Failed to add to cart", err);
      setError("Failed to add to cart.");
    }
  };

  const isFavourite = (bookId) => {
    return favourites && favourites.some((fav) => fav._id === bookId);
  };

  const isInCart = (bookId) => {
    return cartItems && cartItems.some((item) => item._id === bookId);
  };

  return {
    data,
    favourites,
    cartItems,
    loading,
    error,
    handleFavouriteClick,
    handleAddToCart,
    isFavourite,
    isInCart,
  };
};

export default useBooks;
