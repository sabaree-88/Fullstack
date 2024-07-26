import express from "express";
import {
  addBook,
  getBooks,
  getBookByID,
  updateBookById,
  deleteBook,
} from "../controllers/BookController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();
router.use(requireAuth);

// routes for books
router.post("/", requireAdmin, addBook);
router.get("/", getBooks);
router.get("/:id", getBookByID);
router.put("/:id", requireAdmin, updateBookById);
router.delete("/:id", requireAdmin, deleteBook);

export default router;
