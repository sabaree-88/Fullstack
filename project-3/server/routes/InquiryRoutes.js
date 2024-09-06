import { Router } from "express";
import {
  getInquiry,
  removeInquiry,
  storeInquiry,
} from "../controllers/InquiryController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();
router.use(requireAuth);
router.get("/get-inquiry", getInquiry);
router.post("/add-inquiry", storeInquiry);
router.delete("/remove-inquiry/:id", removeInquiry);

export default router;
