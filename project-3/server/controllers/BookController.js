import { Books } from "../models/BookModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

let upload = multer({ storage, fileFilter });

export const addBook = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    try {
      const { title, author, year, description, price, category } = req.body;
      const user_id = req.user._id;
      if (!title || !author || !year || !category) {
        return res.status(400).send({
          message: "Send all required data: title, author, year",
        });
      }

      const newBook = {
        title,
        author,
        year,
        description,
        price,
        user_id,
        category,
      };
      if (req.file) {
        newBook.imagePath = `/public/image/${req.file.filename}`;
      }

      const book = await Books.create(newBook);
      return res.status(200).send(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  });
};

export const updateBookById = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    try {
      const { title, author, year, description, price, category } = req.body;
      if (!title || !author || !year) {
        return res.status(400).send({
          message: "Send all required data: title, author, year",
        });
      }

      const { id } = req.params;
      const updateData = { title, author, year, description, price, category };

      if (req.file) {
        updateData.imagePath = `/public/image/${req.file.filename}`;
      }

      const updatedBook = await Books.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found!" });
      }
      return res.status(200).send(updatedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  });
};

export const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const books = await Books.find().skip(skip).limit(limit);
    const total = await Books.countDocuments();
    res.json({ books, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found!" });
    }
    return res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error searching for books", error });
  }
};
