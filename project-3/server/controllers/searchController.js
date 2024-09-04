import { Books } from "../models/BookModel.js";
import Category from "../models/CategoryModel.js";

export const searchController = async (req, res) => {
  try {
    const { query, category, author, minPrice, maxPrice, sortBy, sortOrder } =
      req.query;

    let searchConditions = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };

    if (category) {
      const categoryObj = await Category.findOne({
        name: { $regex: category, $options: "i" },
      });
      if (categoryObj) {
        searchConditions.category = categoryObj._id;
      } else {
        return res.status(200).json({
          success: true,
          results: [],
        });
      }
    }

    if (author) {
      searchConditions.author = { $regex: author, $options: "i" };
    }

    if (minPrice || maxPrice) {
      searchConditions.price = {};
      if (minPrice) searchConditions.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchConditions.price.$lte = parseFloat(maxPrice);
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const books = await Books.find(searchConditions)
      .populate("category")
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      results: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while searching",
      error: error.message,
    });
  }
};
