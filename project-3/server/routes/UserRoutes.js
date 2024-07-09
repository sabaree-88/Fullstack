import express from "express";
import { Login, SignUp } from "../controllers/UserController.js";

const router = express.Router();

router.post("/login", Login);

router.post("/signup", SignUp);

export default router;
