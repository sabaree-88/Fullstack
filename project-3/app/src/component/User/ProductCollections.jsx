import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import CardSkeleton from "../AssetCopm/utils/skeleton/CardSkeleton";
import {
  notifySuccess,
  notifyError,
} from "../AssetCopm/utils/toastNotification.js";
import UserLayout from "../AssetCopm/UserLayout/UserLayout.jsx";

const ProductCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const booksRes = await axios.get(`http://localhost:3000/book`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [user]);

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
        notifyError("Book removed from favorites");
        setFavourites((prevFavourites) =>
          prevFavourites.filter((fav) => fav._id !== bookId)
        );
      } else {
        await axios.post(
          `http://localhost:3000/favourites/add-favourites`,
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        notifySuccess("Book added to favorites");
        setFavourites((prevFavourites) => [...prevFavourites, { _id: bookId }]);
      }
    } catch (err) {
      console.error("Failed to update favourites", err);
      notifyError("Failed to add favorites.");
      setFavourites((prevFavourites) =>
        isFav
          ? [...prevFavourites, { _id: bookId }]
          : prevFavourites.filter((fav) => fav._id !== bookId)
      );
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
    }
  };

  const isFavourite = (bookId) => {
    return favourites && favourites.some((fav) => fav._id === bookId);
  };

  const isInCart = (bookId) => {
    return cartItems && cartItems.some((item) => item._id === bookId);
  };

  if (error) {
    return (
      <div className="mt-4 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <UserLayout>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="mt-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
              <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

              <div className="mt-6 space-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:space-y-0">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="group relative border-2 p-3 rounded-md"
                  >
                    <div className="absolute z-10 top-4 right-2">
                      <label className="sr-only">Favourite</label>
                      <button
                        onClick={() => handleFavouriteClick(item._id)}
                        aria-label={`${
                          isFavourite(item._id) ? "Remove from" : "Add to"
                        } favourites`}
                      >
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill={isFavourite(item._id) ? "red" : "white"}
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative h-40 w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-40">
                      <img
                        alt={item.title}
                        src={`http://localhost:3000${item.imagePath}`}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <h3 className="text-md font-bold text-gray-500">
                        <Link to={`/book-details/${item._id}`}>
                          <span className="absolute inset-0" />
                          {item.title}
                        </Link>
                      </h3>
                      <h5 className="font-bold">${item.price}</h5>
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      {item.author}
                    </p>
                    <p className="font-normal text-sm text-gray-900">
                      {item.description.substring(0, 80) + "....."}
                    </p>
                    <div className="flex justify-between mt-3">
                      <button className="text-white font-semibold bg-slate-800 px-3 py-1 rounded-sm">
                        Buy Now
                      </button>
                      <button
                        className="relative z-10"
                        onClick={() => handleAddToCart(item._id)}
                        disabled={isInCart(item._id)}
                      >
                        <svg
                          className="-ms-2 me-2 h-7 w-7"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={28}
                          height={28}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default ProductCollections;
