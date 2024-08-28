import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "./categoryService.js";
import Layout from "../AssetCopm/AdminLayout/Layout.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://localhost:3000/category/get-categories"
      );
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="relative overflow-x-auto m-4">
        <div className="flex items-center gap-4 pb-4">
          <div>
            <Link
              to="/add-categories"
              className="py-2 px-4 bg-gray-800 font-semibold text-white text-center rounded-sm"
            >
              Add Category
            </Link>
          </div>
          <div className=" ">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
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
                    <Link
                      to={`/delete-categories/${item._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CategoryList;
