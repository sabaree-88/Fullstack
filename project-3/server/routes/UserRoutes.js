import express from "express";
import {
  Login,
  SignUp,
  getUsers,
  getUsersById,
} from "../controllers/UserController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/login", Login);

router.post("/signup", SignUp);

// routes for user list
router.use(requireAuth);
router.get("/user-list", requireAdmin, getUsers);
router.get("/user-list/:id", requireAdmin, getUsersById);

export default router;
