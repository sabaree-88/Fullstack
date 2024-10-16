import React, { useEffect, useState } from "react";
import Validate from "../../../validation/validate";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import Spinner from "../../AssetCopm/utils/Spinner";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import {
  notifySuccess,
  notifyError,
} from "../../AssetCopm/utils/toastNotification";
import useAdminBooks from "../../../hooks/useAdminBooks";
import API_BASE_URL from "../../../config";
const EditBook = () => {
  const [values, setValues] = useState({
    title: "",
    author: "",
    year: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState({});
  const [fetchingBook, setFetchingBook] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const { editBook, fetchBookById, loading, book } = useAdminBooks();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/category/get-categories`
        );
        setCategories(res.data.categories);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBook = async () => {
      try {
        const { data } = await fetchBookById(id);
        setValues({
          title: data?.title || "",
          author: data?.author || "",
          year: data?.year || "",
          price: data?.price || "",
          description: data?.description || "",
          category: data?.category?._id || "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setFetchingBook(false);
      }
    };

    fetchCategories();
    fetchBook();
  }, [id]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setValues((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const validationErrors = Validate(values);
    setError(validationErrors);

    if (
      error.title === "" &&
      error.author === "" &&
      error.year === "" &&
      error.price === "" &&
      error.description === "" &&
      error.category === ""
    ) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("price", values.price);
      formData.append("year", values.year);
      formData.append("description", values.description);
      formData.append("category", values.category);
      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        await editBook(id, formData);
        notifySuccess("Book updated successfully!");
        navigate("/all-books");
      } catch (err) {
        notifyError("Failed to update the book.");
        console.log(err);
      }
    }
  };

  return (
    <Layout>
      <div className="bg-slate-300 min-h-[100vh] w-full flex justify-center items-center flex-col">
        {loading || fetchingBook ? (
          <Spinner />
        ) : (
          <div className="w-6/12 bg-white p-5 rounded shadow-lg">
            <div className="flex justify-end">
              <Link to="/all-books">
                <FaWindowClose
                  className="text-red-600 text-2xl"
                  title="close"
                />
              </Link>
            </div>
            <h1 className="max-w-md mx-auto font-bold text-2xl mb-2">
              Edit Book
            </h1>
            <form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="title"
                  id="floating_title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputs}
                  value={values.title}
                />
                <label
                  htmlFor="floating_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Book Title
                </label>
                {error.title && (
                  <span className="text-red-500 text-sm">{error.title}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="author"
                  id="floating_author"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputs}
                  value={values.author}
                />
                <label
                  htmlFor="floating_author"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Author
                </label>
                {error.author && (
                  <span className="text-red-500 text-sm">{error.author}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="year"
                  id="year"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputs}
                  value={values.year}
                />
                <label
                  htmlFor="year"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Year
                </label>
                {error.year && (
                  <span className="text-red-500 text-sm">{error.year}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputs}
                  value={values.price}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
                {error.price && (
                  <span className="text-red-500 text-sm">{error.price}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  name="description"
                  id="description_author"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleInputs}
                  value={values.description}
                >
                  {" "}
                </textarea>
                <label
                  htmlFor="description_author"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
                {error.author && (
                  <span className="text-red-500 text-sm">{error.author}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="select_category" className="sr-only">
                  Select Category
                </label>
                <select
                  id="select_category"
                  name="category"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  value={values.category}
                  onChange={handleInputs}
                >
                  <option value="">Choose a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {error.category && (
                  <span className="text-red-500 text-sm">{error.category}</span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="image"
                  id="floating_image"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImage}
                />
                <label
                  htmlFor="floating_image"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Upload Book Image
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditBook;
