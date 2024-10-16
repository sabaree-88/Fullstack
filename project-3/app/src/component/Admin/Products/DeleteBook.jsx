import axios from "axios";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../AssetCopm/utils/Spinner";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import {
  notifySuccess,
  notifyError,
} from "../../AssetCopm/utils/toastNotification";
import API_BASE_URL from "../../../config";
const DeleteBook = () => {
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
      .delete(`${API_BASE_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        notifySuccess("Book deleted successfully!");
        setLoading(false);
        navigate("/all-books");
      })
      .catch((err) => {
        setLoading(false);
        notifyError("Failed to delete the book. Please try again.");
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
              <Link to="/all-books">
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

export default DeleteBook;
