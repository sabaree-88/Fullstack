import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../AssetCopm/utils/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";

const Collections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/book", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 mt-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-2 sm:py-2 lg:max-w-none lg:py-2">
              <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
                {data.map((items) => (
                  <div key={items._id} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        alt={items.title}
                        src={`http://localhost:3000${items.imagePath}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-md font-bold text-gray-500">
                      <Link to={`/book-details/${items._id}`}>
                        <span className="absolute inset-0" />
                        {items.title}
                      </Link>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {items.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Collections;
