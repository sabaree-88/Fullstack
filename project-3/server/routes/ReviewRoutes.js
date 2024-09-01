import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/books/:bookId/reviews", requireAuth, addReview);
router.get("/books/:bookId/reviews", getReviews);

export default router;
