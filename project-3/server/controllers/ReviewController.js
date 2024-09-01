import { Books } from "../models/BookModel.js";

export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    const alreadyReviewed = book.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book." });
    }

    const newReview = {
      user: userId,
      rating: Number(rating),
      comment,
    };

    book.reviews.push(newReview);

    book.numReviews = book.reviews.length;
    book.averageRating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;

    await book.save();

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Books.findById(bookId).populate({
      path: "reviews.user",
      select: "name email",
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({
      reviews: book.reviews,
      numReviews: book.numReviews,
      averageRating: book.averageRating,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
