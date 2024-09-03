import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserLayout from "./AssetCopm/UserLayout/UserLayout";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = useQuery().get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/search?query=${query}`
        );
        console.log(response.data.results);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <UserLayout>
      <div>
        <h2>Search Results for "{query}"</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item._id}
                className="w-full px-2 py-1 rounded-md shadow-md shadow-slate-600"
              >
                <h3 className="font-semibold text-xl">
                  {item.title ? item.title : item.name}
                </h3>{" "}
                {/* Title for books, name for categories */}
                {item.description && <p>{item.description}</p>}{" "}
                {/* Description only for books */}
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default SearchResults;
