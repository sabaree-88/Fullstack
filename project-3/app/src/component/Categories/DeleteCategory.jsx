import React, { useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import Spinner from "../AssetCopm/utils/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  notifyError,
  notifySuccess,
} from "../AssetCopm/utils/toastNotification";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";

const DeleteCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleDelete = () => {
    setLoading(true);
    if (!user) {
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/category/delete-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        notifySuccess("Category deleted successfully!");
        setLoading(false);
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notifyError("Failed to delete the category. Please try again.");
      });
  };
  return (
    <Layout>
      <div className="bg-slate-300 min-h-[100vh] w-full flex justify-center items-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-6/12 bg-white p-5 rounded shadow-lg">
            <div className="flex justify-end">
              <Link to="/categories">
                <FaWindowClose className="text-red-600 text-2xl" />
              </Link>
            </div>

            <div className="mt-4">
              <h3 className="text-center text-2xl">
                Are you sure you want to delete this book!
              </h3>
              <button
                className="bg-red-600 px-8 py-2 text-white w-full my-4"
                onClick={handleDelete}
              >
                Delete book
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeleteCategory;
