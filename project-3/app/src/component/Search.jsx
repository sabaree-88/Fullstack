import React, { useState } from "react";
import UserLayout from "./AssetCopm/UserLayout/UserLayout";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      setResults([]);

      const response = await axios.get(
        `http://localhost:3000/api/search?query=${query}`
      );
      const newBooks = response.data.results;

      setResults((prevData) => {
        const combinedData = [...prevData, ...newBooks];
        const uniqueData = combinedData.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b._id === book._id)
        );
        return uniqueData;
      });
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <UserLayout>
      <div>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        <div>
          <h2>Search Results for "{query}"</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
            {results.length > 0 ? (
              results.map((item, index) =>
                item && item._id ? (
                  <div
                    key={index}
                    className="w-full px-2 py-1 rounded-md shadow-md shadow-slate-600"
                  >
                    <h3 className="font-semibold text-xl">
                      {item.title ? item.title : item.name}
                    </h3>{" "}
                    {item.description && <p>{item.description}</p>}{" "}
                  </div>
                ) : null
              )
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default SearchBar;
