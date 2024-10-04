import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useBooks = (user, limit, page) => {
  const [data, setData] = useState([]); // Store books data
  const [favourites, setFavourites] = useState([]); // Store user's favorite books
  const [cartItems, setCartItems] = useState([]); // Store items in the cart
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for API failures
  const [hasMore, setHasMore] = useState(true); // To manage pagination (if more books available)
  const [selectedItems, setSelectedItems] = useState([]); // Store selected items for checkout
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // If no user, exit early

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        // Fetch paginated books from the backend
        const booksRes = await axios.get(
          `http://localhost:3000/book?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newBooks = booksRes.data.books;
        setHasMore(newBooks.length > 0);

        // Combine new books with the previous ones and ensure no duplicates
        setData((prevData) => {
          const combinedData = [...prevData, ...newBooks];
          const uniqueData = combinedData.filter(
            (book, index, self) =>
              index === self.findIndex((b) => b._id === book._id)
          );
          return uniqueData;
        });

        // Fetch user's favorite books
        const favRes = await axios.get(
          `http://localhost:3000/favourites/get-favourites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourites(favRes.data || []);

        // Fetch items in the user's cart
        const cartRes = await axios.get(`http://localhost:3000/cart/get-cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if any cart item has a null bookId
        console.log(cartRes.data); // Log to inspect backend response
        setCartItems(cartRes.data.items || []);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, limit, page]);

  // Handle adding/removing books from favorites
  const handleFavouriteClick = async (bookId) => {
    const token = localStorage.getItem("token");
    const isFav = isFavourite(bookId);

    try {
      if (isFav) {
        // Remove from favorites
        await axios.post(
          `http://localhost:3000/favourites/remove-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavourites((prevFavourites) =>
          prevFavourites.filter((fav) => fav._id !== bookId)
        );
      } else {
        // Add to favorites
        await axios.post(
          `http://localhost:3000/favourites/add-favourites`,
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

  // Handle adding a book to the cart
  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token");

    // Ensure bookId is valid before proceeding
    if (!bookId) {
      console.error("This product is out of stock");
      setError("This product is out of stock.");
      return;
    }

    try {
      // Add the book to the cart on the backend
      await axios.post(
        `http://localhost:3000/cart/add-to-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update cart items in the state
      setCartItems((prevCartItems) => [...prevCartItems, { _id: bookId }]);
    } catch (err) {
      console.error("Failed to add to cart", err);
      setError("Failed to add to cart.");
    }
  };

  // Handle removing a book from the cart
  const handleRemoveFromCart = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:3000/cart/remove-from-cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update cart items while ensuring bookId is not null
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bookId && item.bookId._id !== bookId)
      );
      // Update selected items if necessary
      setSelectedItems((prevItems) =>
        prevItems.filter((itemId) => itemId !== bookId)
      );
    } catch (err) {
      console.error("Failed to remove item from cart", err);
    }
  };

  // Handle changing the quantity of an item in the cart
  const handleQuantityChange = async (bookId, newQuantity) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:3000/cart/update-quantity`,
        { bookId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the cart items, ensuring no null bookId
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

  // Handle selecting an item for checkout
  const handleSelectItem = (bookId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(bookId)
        ? prevSelectedItems.filter((item) => item !== bookId)
        : [...prevSelectedItems, bookId]
    );
  };

  // Calculate the total price for selected items
  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.bookId && selectedItems.includes(item.bookId._id))
      .reduce((total, item) => total + item.bookId.price * item.quantity, 0);
  };

  // Handle proceeding to checkout
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

  // Check if a book is in the user's favorites
  const isFavourite = (bookId) => {
    return favourites && favourites.some((fav) => fav._id === bookId);
  };

  // Check if a book is in the user's cart
  const isInCart = (bookId) => {
    return cartItems && cartItems.some((item) => item.bookId && item.bookId._id === bookId);
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
