import axios from "axios";
import React, { useState, useEffect } from "react";

const useFav = (user) => {
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("token");

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

    fetchFavourites();
  }, [user]);

  const removeFavourite = async (bookId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:3000/favourites/remove-favourites`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavourites((prevFavourites) =>
        prevFavourites.filter((fav) => fav._id !== bookId)
      );
    } catch (err) {
      console.error("Failed to remove favourite", err);
    }
  };
  return {
    loading,
    favourites,
    error,
    removeFavourite,
  };
};

export default useFav;