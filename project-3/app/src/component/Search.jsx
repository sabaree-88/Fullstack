import React, { useState, useEffect, useCallback } from "react";
import UserLayout from "./AssetCopm/UserLayout/UserLayout";
import axios from "axios";
import debounce from "lodash.debounce";
import API_BASE_URL from "../config";
import useBooks from "../hooks/useBooks";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    author: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    sortOrder: "asc",
  });
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const limit = 4;
  const { handleFavouriteClick, handleAddToCart, isFavourite, isInCart } =
    useBooks(user, limit);
  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setResults([]);

      const response = await axios.get(`${API_BASE_URL}/api/search`, {
        params: filters,
      });
      setResults(response.data.results);
      setShowResult(true);
    } catch (error) {
      setError("Error fetching search results");
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const debounceSearch = useCallback(debounce(handleSearch, 500), [filters]);

  useEffect(() => {
    debounceSearch();
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <UserLayout>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Sidebar */}
        <div className="w-full md:w-3/12  bg-slate-800 p-4 rounded-md">
          <h3 className="font-semibold mb-2 text-white">Filters</h3>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white mb-3"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="block w-full p-2 text-sm border border-white rounded-sm bg-transparent"
              placeholder="Enter category"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-white mb-3"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={filters.author}
              onChange={(e) => updateFilter("author", e.target.value)}
              className="block w-full p-2 text-sm border border-white rounded-sm bg-transparent"
              placeholder="Enter author"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-3">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="w-1/2 p-2 text-sm border border-white rounded-sm bg-transparent"
                placeholder="Min Price"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="w-1/2 p-2 text-sm border border-white rounded-sm bg-transparent"
                placeholder="Max Price"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-white mb-3"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="block w-full p-2 text-sm border border-white rounded-sm bg-transparent"
            >
              <option value="">Select</option>
              <option value="price">Price</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="sortOrder"
              className="block text-sm font-medium text-white mb-3"
            >
              Sort Order
            </label>
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={(e) => updateFilter("sortOrder", e.target.value)}
              className="block w-full p-2 text-sm border border-white rounded-sm bg-transparent"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full md:w-8/12">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Books, Category..."
              value={filters.query}
              onChange={(e) => updateFilter("query", e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {showResult && !loading && !error && (
            <div>
              <h2>Search Results for "{filters.query}"</h2>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-3">
                {results.length > 0 ? (
                  results.map((item) =>
                    item && item._id ? (
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
                    ) : null
                  )
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default SearchBar;
