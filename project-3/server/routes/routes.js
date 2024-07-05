import express from "express";
import {
  addBook,
  getBooks,
  getBooksByID,
  updateBookById,
  deleteBook,
} from "../controllers/BookController.js";
const router = express.Router();

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBooksByID);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBook);

export default router;
