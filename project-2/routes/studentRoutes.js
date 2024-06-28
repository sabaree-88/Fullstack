import express from "express";
import {
  getAllStudents,
  createStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/getuser", getAllStudents);
router.post("/storeStudent", createStudent);

export default router;
