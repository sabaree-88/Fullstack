import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import {
  notifyError,
  notifySuccess,
} from "../../AssetCopm/utils/toastNotification";
import { useAuth } from "../../../context/AuthContext";
import Spinner from "../../AssetCopm/utils/Spinner";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import useCategory from "../../../hooks/useCategory";

const EditCategory = () => {
  const [values, setValues] = useState({
    image: null,
  });
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { loading, error, editCategory, fetchCategoryId } = useCategory();

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await fetchCategoryId(id);
      setName(data.name);
    };
    fetchCategory();
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
    const formData = new FormData();
    formData.append("name", name);
    if (values.image) {
      formData.append("image", values.image);
    }
    try {
      await editCategory(id, formData);
      navigate("/categories");
      notifySuccess("Category updated successfully!");
    } catch (error) {
      notifyError("Category updating the book!");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
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
