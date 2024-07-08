import axios from "axios";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/book/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error deleting the book:", err);
        alert("Failed to delete the book. Please try again.");
      });
  };

  return (
    <div className="bg-gray-800 min-h-[100vh] w-full flex justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-6/12 bg-white p-5 rounded shadow-lg">
          <div className="flex justify-end">
            <Link to="/home">
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
  );
};

export default DeleteBook;
