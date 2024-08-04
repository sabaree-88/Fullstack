import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import { FaRegEdit, FaRegEye, FaRegPlusSquare } from "react-icons/fa";
import Spinner from "../AssetCopm/utils/Spinner";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const {
    currentPage,
    totalPages,
    totalEntries,
    itemsPerPage,
    startEntry,
    endEntry,
    handlePageChange,
    setTotalPages,
    setTotalEntries,
  } = usePagination();

  useEffect(() => {
    if (user) {
      fetchData(currentPage);
    }
  }, [user, currentPage]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/book?page=${page}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data.books);
      setTotalPages(res.data.pages);
      setTotalEntries(res.data.total);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

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
              <form className="w-80 h-12" onSubmit={handleSearch}>
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
                    className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Book, Author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 top-[5px] bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-gray-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-center dark:bg-gray-800"
                    >
                      Book Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-slate-900 text-white"
                    >
                      Book Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Published Year
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-slate-900 text-white"
                    >
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
                  {data.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 flex justify-center items-center"
                      >
                        <a
                          href={`http://localhost:3000${item.imagePath}`}
                          target="blank"
                          className="flex justify-center align-middle"
                        >
                          <svg
                            fill="#000000"
                            className="h-6 w-6"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 487.5 487.5"
                            xmlSpace="preserve"
                          >
                            <g>
                              <g>
                                <path
                                  d="M437,12.3C437,5.5,431.5,0,424.7,0H126.3C84.4,0,50.4,34.1,50.4,75.9v335.7c0,41.9,34.1,75.9,75.9,75.9h298.5
			c6.8,0,12.3-5.5,12.3-12.3V139.6c0-6.8-5.5-12.3-12.3-12.3H126.3c-28.3,0-51.4-23.1-51.4-51.4S98,24.5,126.3,24.5h298.5
			C431.5,24.5,437,19,437,12.3z M126.3,151.8h286.2V463H126.3c-28.3,0-51.4-23.1-51.4-51.4V131.7
			C88.4,144.2,106.5,151.8,126.3,151.8z"
                                />
                                <path d="M130.5,64.8c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h280.1c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H130.5z" />
                                <path
                                  d="M178,397.7c6.3,2.4,13.4-0.7,15.8-7.1l17.9-46.8h62.7c0.5,0,0.9-0.1,1.3-0.1l17.9,46.9c1.9,4.9,6.5,7.9,11.4,7.9
			c1.5,0,2.9-0.3,4.4-0.8c6.3-2.4,9.5-9.5,7.1-15.8l-54-141.2c-3-7.9-10.4-13-18.8-13c-8.4,0-15.8,5.1-18.8,13l-54,141.2
			C168.5,388.2,171.7,395.2,178,397.7z M243.7,260l22.7,59.3h-45.3L243.7,260z"
                                />
                              </g>
                            </g>
                          </svg>
                        </a>
                      </th>
                      <td className="px-6 py-3 bg-slate-900 text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {item.year}
                      </td>
                      <td className="px-6 py-3 bg-slate-900 text-white">
                        {item.author}
                      </td>
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center mt-5">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {startEntry}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {endEntry}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalEntries}
                </span>{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllBooks;
