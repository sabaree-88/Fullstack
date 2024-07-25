import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../AssetCopm/Spinner";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.map((product) => (
                <a key={product._id} className="group border p-2 rounded-md">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      alt={product.title}
                      src={`http://localhost:3000${product.imagePath}`}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="mt-4 text-md font-bold text-gray-700">
                        {product.title}
                      </h3>
                      <h3 className="mt-2 text-sm text-gray-700">
                        {product.author}
                      </h3>
                    </div>
                    <div>
                      <p className="mt-6 text-lg font-medium text-gray-900">
                        {product.year}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
