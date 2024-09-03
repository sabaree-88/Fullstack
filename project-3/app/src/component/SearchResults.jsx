import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserLayout from "./AssetCopm/UserLayout/UserLayout";
import { useAuth } from "../context/AuthContext";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = useQuery().get("query");
  const { user } = useAuth();
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
    <>
      <h1>hi</h1>
    </>
  );
};

export default SearchResults;
