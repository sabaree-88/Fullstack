import React, { useState, useEffect, useCallback } from "react";
import UserLayout from "./AssetCopm/UserLayout/UserLayout";
import axios from "axios";
import debounce from "lodash.debounce";
import API_BASE_URL from "../config";

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
        <div className="w-full md:w-3/12 min-h-[100vh] bg-slate-400 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Filters</h3>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="block w-full p-2 text-sm border border-gray-300 rounded-md"
              placeholder="Enter category"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-900"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              value={filters.author}
              onChange={(e) => updateFilter("author", e.target.value)}
              className="block w-full p-2 text-sm border border-gray-300 rounded-md"
              placeholder="Enter author"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="w-1/2 p-2 text-sm border border-gray-300 rounded-md"
                placeholder="Min Price"
              />
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="w-1/2 p-2 text-sm border border-gray-300 rounded-md"
                placeholder="Max Price"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-900"
            >
              Sort By
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="block w-full p-2 text-sm border border-gray-300 rounded-md"
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
              className="block text-sm font-medium text-gray-900"
            >
              Sort Order
            </label>
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={(e) => updateFilter("sortOrder", e.target.value)}
              className="block w-full p-2 text-sm border border-gray-300 rounded-md"
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
                  results.map((item, index) =>
                    item && item._id ? (
                      <div
                        key={index}
                        className="w-full px-2 py-1 rounded-md shadow-md shadow-slate-600"
                      >
                        <h3 className="text-lg font-semibold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Author: {item.author}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Price: ${item.price}
                        </p>
                        <p className="text-gray-600">
                          Category: {item.category.name}
                        </p>
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
