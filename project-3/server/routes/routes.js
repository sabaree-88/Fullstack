import express from "express";
import {
  addBook,
  getBooks,
  getBookByID,
  updateBookById,
  deleteBook,
} from "../controllers/BookController.js";
import requireAuth from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(requireAuth);

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBookByID);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBook);

export default router;
