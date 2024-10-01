import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const { handleReviewSubmit } = useProduct(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = await handleReviewSubmit(bookId, rating, comment);
      setRating(0);
      setComment("");
      onReviewSubmit(newReview);
      navigate(`/book-details/${id}`);
    } catch (err) {
      setError(err.message || "Failed to submit review");
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      {error && <p className="text-red-600">{error}</p>}
      <h2 className="font-bold text-xl mb-4">Write your review</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rating
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <svg
              key={value}
              className={`w-8 h-8 cursor-pointer ${
                value <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleStarClick(value)}
            >
              <path d="M9.049 2.927C9.454 1.905 10.546 1.905 10.951 2.927l1.286 3.011 3.195.234c1.09.08 1.542 1.413.731 2.145l-2.365 2.068.892 3.316c.274 1.018-.874 1.832-1.721 1.258L10 13.575l-2.869 1.92c-.847.574-1.995-.24-1.721-1.258l.892-3.316L3.937 8.317c-.81-.732-.359-2.065.731-2.145l3.195-.234L9.049 2.927z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
