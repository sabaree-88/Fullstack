import { Router } from "express";
import { getDashboard } from "../controllers/AdminDashboard.js";
import requireAdmin from "../middleware/requireAdmin.js";
import requireAuth from "../middleware/authMiddleware.js";
const router = Router();
router.use(requireAuth);
router.get("/dashboard", requireAdmin, getDashboard);

export default router;
