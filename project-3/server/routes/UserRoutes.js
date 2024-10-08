import express from "express";
import {
  ForgetPassword,
  Login,
  ResetPassword,
  SignUp,
  getUsers,
  getUsersById,
  ResetPasswordPage,
  googleLogin,
  updateUser,
  searchUsers,
  // VerifyOTP,
} from "../controllers/UserController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/requireAdmin.js";
import upload from "../middleware/fileUpload.js";
import validateUser from "../middleware/validateUser.js";

const router = express.Router();

router.post("/login", validateUser("login"), Login);
router.post("/signup", validateUser("signup"), SignUp);
router.post("/google-login", googleLogin);

router.post("/forgot-password", validateUser("forgotPassword"), ForgetPassword);
router.post(
  "/reset-password/:token",
  validateUser("resetPassword"),
  ResetPassword
);

router.get("/reset-password/:token", ResetPasswordPage);
router.get("/search-user", searchUsers);
// Protected routes
router.use(requireAuth);
router.get("/user-list/:id", getUsersById);
router.put(
  "/user-update/:id",
  upload.single("profileImage"),
  validateUser("updateUser"),
  updateUser
);
router.get("/user-list", requireAdmin, getUsers);
export default router;
