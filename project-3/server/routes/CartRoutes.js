import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/CartController.js";
import requireAuth from "../middleware/authMiddleware.js";
const cartRouter = Router();

cartRouter.post("/add-to-cart", requireAuth, addToCart);
cartRouter.get("/get-cart", requireAuth, getCart);
cartRouter.post("/remove-from-cart", requireAuth, removeFromCart);
cartRouter.post("/update-quantity", requireAuth, updateQuantity);

export default cartRouter;
