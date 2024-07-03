import { Books } from "../models/BookModel.js";

export const addBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.year) {
      return res.status(400).send({
        message: "Send all required data: title, author, year",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
    };

    const book = await Books.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
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

export const getBooksByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateBookById = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.year) {
      return res
        .status(400)
        .send({ message: "Send all records: title, author, year" });
    }
    const { id } = req.params;
    const result = await Books.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(500).json({ message: "Book not Found!" });
    }
    return res.status(200).send({ message: "Book Updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      return res.status(500).json({ message: "Book not Found!" });
    }
    return res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
