import React, { useEffect, useState } from "react";
import Layout from "../../AssetCopm/AdminLayout/Layout.jsx";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory.jsx";
import Spinner from "../../AssetCopm/utils/Spinner.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
import {
  notifyError,
  notifySuccess,
} from "../../AssetCopm/utils/toastNotification";
const CategoryList = () => {
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
  const {
    loading,
    error,
    categories,
    fetchCategory,
    deleteCategory,
    searchCategory,
  } = useCategory();

  const [query, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      const { totalPages, totalEntries } = await fetchCategory(
        currentPage,
        itemsPerPage
      );
      setTotalPages(totalPages);
      setTotalEntries(totalEntries);
    };
    fetchCategories();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      notifySuccess("Category deleted successfully!");
    } catch (error) {
      notifyError("Failed to delete the category. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    searchCategory(query);
  };
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Layout>
      <div className="relative overflow-x-auto m-4">
        <div className="flex items-center gap-4 pb-4">
          <div className="flex items-center gap-4">
            <div>
              <Link
                to="/add-categories"
                className="py-2 px-4 bg-gray-800 font-semibold text-white text-center rounded-sm"
              >
                Add Category
              </Link>
            </div>
            <div>
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
                    value={query}
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
          </div>
        </div>
        <table className="w-100 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-12 py-3">
                Category name
              </th>
              <th scope="col" className="px-12 py-3">
                Category image
              </th>
              <th scope="col" className="px-12 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-12 py-4 flex-1 justify-center items-center">
                  <img
                    src={`http://localhost:3000/${item.imagePath}`}
                    alt={item.name}
                    className="w-10 h-10 object-cover bg-gray-500 p-1 rounded-full"
                  />
                </td>
                <td className="px-12 py-4">
                  <div className="flex gap-3">
                    <Link
                      to={`/edit-categories/${item._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {startEntry}-{endEntry}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalEntries}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex items-center justify-center text-sm h-full py-1.5 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1 ? "font-bold text-blue-600" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default CategoryList;
