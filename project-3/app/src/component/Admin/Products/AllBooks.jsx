import React, { useEffect, useState } from "react";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import { FaRegEdit, FaRegEye, FaRegPlusSquare } from "react-icons/fa";
import Spinner from "../../AssetCopm/utils/Spinner";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import useAdminBooks from "../../../hooks/useAdminBooks";
import Pagination from "../../AssetCopm/utils/Pagination";
import SearchBox from "../../AssetCopm/utils/SearchBox";
import API_BASE_URL from "../../../config";

const AllBooks = () => {
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
  } = usePagination(1, 5);

  const { books, loading, error, fetchBooks, deleteBook, searchBook } =
    useAdminBooks();
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { totalPages, totalEntries } = await fetchBooks(
          currentPage,
          itemsPerPage
        );
        setTotalPages(totalPages);
        setTotalEntries(totalEntries);
      };
      fetchData();
    }
  }, [user, currentPage, itemsPerPage]);

  const handleDelete = (id) => {
    deleteBook(id);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    searchBook(searchQuery);
  };
  if (error) {
    return (
      <>
        <p className="text-red-500">{error}</p>
      </>
    );
  }
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
              <SearchBox
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
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
                    <th scope="col" className="px-6 py-3 bg-gray-50 ">
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-slate-900 text-white"
                    >
                      Price
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
                      className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-slate-900 text-white"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        <a
                          href={`${API_BASE_URL}${item.imagePath}`}
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
                      </td>
                      <td className="px-6 py-3 bg-slate-900 text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-3 bg-gray-50 ">
                        {item.category?.name}
                      </td>
                      <td className="px-6 py-4 bg-slate-900 dark:bg-gray-800 text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-3 bg-gray-50">{item.year}</td>
                      <td className="px-6 py-4 bg-slate-900 dark:bg-gray-800 text-white">
                        {item.author}
                      </td>
                      <td className="px-6 py-3 bg-gray-50">
                        {item.description.substring(0, 80) + "..."}
                      </td>
                      <td className="px-6 py-4 bg-slate-900 dark:bg-gray-800 text-white">
                        <span className="flex gap-6 items-center justify-center">
                          <Link to={`/view/${item._id}`}>
                            <FaRegEye className="text-2xl text-green-600" />
                          </Link>
                          <Link to={`/edit/${item._id}`}>
                            <FaRegEdit className="text-2xl text-blue-600" />
                          </Link>
                          <button onClick={() => handleDelete(item._id)}>
                            <IoTrashBinSharp className="text-2xl text-red-600" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              startEntry={startEntry}
              endEntry={endEntry}
              totalEntries={totalEntries}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllBooks;
