import { Books } from "../models/BookModel.js";
import Category from "../models/CategoryModel.js";
export const searchController = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    const categories = await Category.find({
      name: { $regex: query, $options: "i" },
    });

    let categoryBooks = [];
    if (categories.length > 0) {
      const categoryIds = categories.map((cat) => cat._id);
      categoryBooks = await Books.find({ category: { $in: categoryIds } });
    }

    const results = [...books, ...categoryBooks];
    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while searching",
      error: error.message,
    });
  }
};
