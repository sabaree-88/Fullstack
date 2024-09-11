import { Router } from "express";
import {
  verifyPayment,
  addPayment,
  getOrder,
} from "../controllers/PaymentController.js";
import requireAuth from "../middleware/authMiddleware.js";
const router = Router();

router.use(requireAuth);
router.get("/orders/:userId", getOrder);
router.post("/verify-payment", verifyPayment);
router.post("/create-order", addPayment);

export default router;
