import { Router } from "express";
import { getAddress, addAddress } from "../controllers/AddressController.js";
import requireAuth  from "../middleware/authMiddleware.js";
const router = Router();

router.use(requireAuth);
router.get("/get", getAddress);
router.post("/add", addAddress);

export default router;
