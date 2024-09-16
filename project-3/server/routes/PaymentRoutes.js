import { Router } from "express";
import {
  verifyPayment,
  addPayment,
  getOrder,
  trackOrder,
  cancelOrder,
} from "../controllers/PaymentController.js";
import requireAuth from "../middleware/authMiddleware.js";
const router = Router();

router.use(requireAuth);
router.get("/orders/:userId", getOrder);
router.post("/verify-payment", verifyPayment);
router.post("/create-order", addPayment);
router.get("/track-order/:orderId", trackOrder);
router.post("/cancel-order/:orderId", cancelOrder);
export default router;
