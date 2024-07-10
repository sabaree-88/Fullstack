import React, { useEffect, useState } from "react";
import Validate from "./validation/validate";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthContext";

const EditBook = () => {
  const [values, setValues] = useState({
    title: "",
    author: "",
    year: "",
    image: null,
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const book = res.data;
        setValues({
          title: book.title,
          author: book.author,
          year: book.year,
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const validationErrors = Validate(values);
    setError(validationErrors);

    if (error.title === "" && error.author === "" && error.year === "") {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("year", values.year);

      if (values.image) {
        formData.append("image", values.image);
      }

      const token = localStorage.getItem("token");
      axios
        .put(`http://localhost:3000/book/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="bg-gray-800 min-h-[100vh] w-full flex justify-center items-center flex-col">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-6/12 bg-white p-5 rounded shadow-lg">
          <div className="flex justify-end">
            <Link to="/home">
              <FaWindowClose className="text-red-600 text-2xl" title="close" />
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
  );
};

export default EditBook;
