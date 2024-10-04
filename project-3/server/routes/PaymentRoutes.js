import { Router } from "express";
import {
  verifyPayment,
  addPayment,
  getOrder,
  trackOrder,
  cancelOrder,
  getOrderById,
  getAllOrders,
  getOrderDetailsById,
  updateOrderStatus,
} from "../controllers/PaymentController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
const router = Router();

router.use(requireAuth);
router.get("/orders", getOrder);
router.get("/ordersId/:id", getOrderById);
router.post("/verify-payment", verifyPayment);
router.post("/create-order", addPayment);
router.get("/track-order/:orderId", trackOrder);
router.post("/cancel-order/:orderId", cancelOrder);

// admin routes for manage orders
router.get("/orders-admin", getAllOrders);
router.get("/orders-admin/:id", getOrderDetailsById);
router.put("/orders/status/:id", updateOrderStatus);
export default router;
