import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import CardSkeleton from "../../AssetCopm/utils/skeleton/CardSkeleton";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";
import useBooks from "../../../hooks/useBooks";
import useFav from "../../../hooks/useFav";
import API_BASE_URL from "../../../config";

const FavouritesPage = () => {
  const { user } = useAuth();
  const { loading, favourites, error, removeFavourite } = useFav(user);
  const { handleAddToCart, isInCart } = useBooks(user);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
          <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {[...Array(4)].map((_, index) => (
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
    <UserLayout>
      <div className="mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
            <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>

            {favourites.length === 0 ? (
              <p className="text-center text-gray-500">
                No favorites added yet.
              </p>
            ) : (
              <div className="mt-6 space-y-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:space-y-0">
                {favourites.map((item, index) => (
                  <div
                    key={index}
                    className="group relative border-2 p-3 rounded-md"
                  >
                    <div className="absolute z-10 top-4 right-2">
                      <label className="sr-only">Remove Favorite</label>
                      <button
                        onClick={() => removeFavourite(item._id)}
                        aria-label="Remove from favourites"
                      >
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="red"
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
                        src={`${API_BASE_URL}${item.imagePath}`}
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
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default FavouritesPage;
