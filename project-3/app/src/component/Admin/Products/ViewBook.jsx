import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import Spinner from "../../AssetCopm/utils/Spinner";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import useAdminBooks from "../../../hooks/useAdminBooks";
import API_BASE_URL from "../../../config";
const ViewBook = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState({});
  const { fetchBookById, loading } = useAdminBooks();
  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      const { data } = await fetchBookById(id);
      setItem(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="bg-slate-300 min-h-[100vh] w-full flex justify-center items-center flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <div
            key={item._id}
            className="w-6/12 bg-white min-h-[50vh] p-5 rounded shadow-lg"
          >
            <div className="flex justify-end">
              <Link to="/all-books">
                <FaWindowClose className="text-red-600 text-2xl" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
            <h2 className="text-xl mb-2">{item.author}</h2>
            <h3 className="text-lg">{item.year}</h3>
            {item.imagePath && (
              <img
                src={`${API_BASE_URL}${item.imagePath}`}
                alt={item.title}
                className="max-w-40"
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewBook;
