import express from "express";
import {
  addBook,
  getBooks,
  getBookByID,
  updateBookById,
  deleteBook,
} from "../controllers/BookController.js";
import requireAuth, { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);

router.post("/", requireAdmin, addBook);
router.get("/", getBooks);
router.get("/:id", getBookByID);
router.put("/:id", requireAdmin, updateBookById);
router.delete("/:id", requireAdmin, deleteBook);

export default router;
