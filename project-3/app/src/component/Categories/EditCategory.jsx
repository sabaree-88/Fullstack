import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import Spinner from "../AssetCopm/utils/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
  notifyError,
  notifySuccess,
} from "../AssetCopm/utils/toastNotification";

const EditCategory = () => {
  const [values, setValues] = useState({
    image: null,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/category/get-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const category = res.data;
        setName(category.name);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  }, [id]);

  const handleImage = (e) => {
    setValues((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
  const handleSubmit = async (e) => {
    if (!user) {
      setError("Your are not logged in!");
      return;
    }
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (values.image) {
      formData.append("image", values.image);
    }
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:3000/category/edit-categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        notifySuccess("Category updated successfully!");
        navigate("/categories");
      })
      .catch((err) => {
        notifyError("Category updating the book!");
        setError(err);
        setLoading(false);
      });
  };
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center min-h-[100vh]">
          <div className="bg-white w-96 p-4 rounded-lg">
            <div className="flex justify-between mb-8">
              <h2 className="max-w-md font-bold text-2xl">Edit Category</h2>
              <div className="flex justify-end items-center">
                <Link to="/categories">
                  <FaWindowClose
                    className="text-red-600 text-2xl"
                    title="close"
                  />
                </Link>
              </div>
            </div>

            <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="floating_name"
                  id="floating_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="floating_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImage}
                  name="image"
                  id="floating_image"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="floating_image"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category Image
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EditCategory;
