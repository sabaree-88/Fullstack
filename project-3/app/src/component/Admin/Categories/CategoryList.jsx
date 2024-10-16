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
import Pagination from "../../AssetCopm/utils/Pagination.jsx";
import SearchBox from "../../AssetCopm/utils/SearchBox.jsx";
import API_BASE_URL from "../../../config.js";
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
              <SearchBox
                handleSearch={handleSearch}
                searchQuery={query}
                setSearchQuery={setSearchQuery}
              />
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
                    src={`${API_BASE_URL}/${item.imagePath}`}
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
        <Pagination
          startEntry={startEntry}
          endEntry={endEntry}
          totalEntries={totalEntries}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default CategoryList;
