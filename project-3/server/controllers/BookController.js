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
      const { title, author, year } = req.body;
      const user_id = req.user._id;
      if (!title || !author || !year) {
        return res.status(400).send({
          message: "Send all required data: title, author, year",
        });
      }

      const newBook = { title, author, year, user_id };
      if (req.file) {
        newBook.imagePath = `public/image/${req.file.filename}`;
      }

      const book = await Books.create(newBook);
      return res.status(200).send(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  });
};

export const getBooks = async (req, res) => {
  try {
    const allBooks = await Books.find({});
    return res.status(200).send(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
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

export const updateBookById = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    try {
      const { title, author, year } = req.body;
      if (!title || !author || !year) {
        return res.status(400).send({
          message: "Send all required data: title, author, year",
        });
      }

      const { id } = req.params;
      const updateData = { title, author, year };

      if (req.file) {
        updateData.imagePath = `public/image/${req.file.filename}`;
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
