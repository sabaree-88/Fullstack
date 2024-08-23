import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import CardSkeleton from "../AssetCopm/utils/skeleton/CardSkeleton";

const Collections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const { user } = useAuth();
  const limit = 4;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        // Fetch books
        const booksRes = await axios.get(
          `http://localhost:3000/book?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(booksRes.data.books);

        // Fetch user favourites
        const favRes = await axios.get(`http://localhost:3000/get-favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavourites(favRes.data.favourites);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleFavouriteClick = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const isFav = isFavourite(bookId);

      if (isFav) {
        // Remove from favourites
        const res = await axios.post(
          `http://localhost:3000/remove-favourites`,
          { bookId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavourites(res.data.favourites);
      } else {
        // Add to favourites
        const res = await axios.post(
          `http://localhost:3000/add-favourites`,
          { bookId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavourites(res.data.favourites);
      }
    } catch (err) {
      console.error("Failed to update favourites", err);
    }
  };

  const isFavourite = (bookId) => favourites.some((fav) => fav._id === bookId);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {[...Array(limit)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
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
                      className={`w-6 h-6 -ms-2 me-2 ${
                        isFavourite(item._id) ? "text-red-500" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
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
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-5 h-5"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
