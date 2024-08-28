import { Router } from "express";
import upload from "../middleware/fileUpload.js";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
const router = Router();

router.use(requireAuth);
router.get("/get-categories", getCategories);
router.get("/get-categories/:id", getCategoryById);
router.post(
  "/add-categories",
  requireAdmin,
  upload.single("image"),
  createCategory
);
router.put(
  "/edit-categories/:id",
  requireAdmin,
  upload.single("image"),
  updateCategory
);
router.delete("/delete-categories/:id", requireAdmin, deleteCategory);

export default router;
