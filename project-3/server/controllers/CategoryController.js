import Category from "../models/CategoryModel.js";

export const getCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const categories = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();
    res
      .status(200)
      .json({ categories, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving category", error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ message: "Category image is required" });
    }

    const newCategory = new Category({ name, imagePath });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    const updateFields = { name };
    if (imagePath) {
      updateFields.imagePath = imagePath;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

export const searchCategory = async (req, res) => {
  const { query } = req.query;
  try {
    const result = await Category.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error searching for category", error });
  }
};
