import { Router } from "express";
import { getCart, addToCart } from "../controllers/CartController.js";
import requireAuth from "../middleware/authMiddleware.js";
const cartRouter = Router();

cartRouter.post("/add-to-cart", requireAuth, addToCart);
cartRouter.get("/get-cart", requireAuth, getCart);

export default cartRouter;
