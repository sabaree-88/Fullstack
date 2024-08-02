import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import { FaRegEdit, FaRegEye, FaRegPlusSquare } from "react-icons/fa";
import Spinner from "../AssetCopm/utils/Spinner";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/book/search?query=${searchQuery}`
      );
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="bg-slate-300 min-h-[100vh] p-10">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="mb-5 flex gap-4">
              <Link
                to="/add"
                className="flex gap-3 align-middle items-center self-center px-3 py-2 bg-slate-600 w-36 rounded-sm text-white"
              >
                <FaRegPlusSquare className="text-green-600 text-2xl" />{" "}
                <span className="font-semibold text-sm align-middle">
                  Add book
                </span>
              </Link>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search by title or author"
                  className="px-3 py-2 border rounded-sm"
                  value= {searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-gray-700 py-2 px-10 rounded-md font-semibold text-white ml-3">
                  Search
                </button>
              </form>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-gray-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Book Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Book Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Published Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center bg-gray-50"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => {
                    return (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 flex justify-center items-center"
                        >
                          <img
                            className="w-16"
                            src={`http://localhost:3000${item.imagePath}`}
                            alt={item.title}
                          />
                        </th>
                        <td className="px-6 py-4">{item.title}</td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {item.year}
                        </td>
                        <td className="px-6 py-4">{item.author}</td>
                        <td className="px-6 py-4 bg-gray-50">
                          <span className="flex gap-6 items-center justify-center">
                            <Link to={`/view/${item._id}`}>
                              <FaRegEye className="text-2xl text-green-600" />
                            </Link>
                            <Link to={`/edit/${item._id}`}>
                              <FaRegEdit className="text-2xl text-blue-600" />
                            </Link>
                            <Link to={`/delete/${item._id}`}>
                              <IoTrashBinSharp className="text-2xl text-red-600" />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllBooks;
