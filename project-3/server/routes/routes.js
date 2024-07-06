import express from "express";
import {
  addBook,
  getBooks,
  getBookByID,
  updateBookById,
  deleteBook,
} from "../controllers/BookController.js";
const router = express.Router();

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBookByID);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBook);

export default router;
