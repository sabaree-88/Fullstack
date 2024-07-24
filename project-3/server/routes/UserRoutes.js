import express from "express";
import {
  ForgetPassword,
  Login,
  ResetPassword,
  SignUp,
  UpdateUsers,
  getUsers,
  getUsersById,
  ResetPasswordPage,
  googleLogin,
} from "../controllers/UserController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/login", Login);

router.post("/signup", SignUp);
router.post("/google-login", googleLogin);
router.post("/forgot-password", ForgetPassword);
router.post("/reset-password/:token", ResetPassword);
router.get("/reset-password/:token", ResetPasswordPage);

// routes for user list
router.use(requireAuth);
router.get("/user-list", requireAdmin, getUsers);
router.get("/user-list/:id", requireAdmin, getUsersById);
router.put("/user-update/:id", requireAdmin, UpdateUsers);

export default router;
