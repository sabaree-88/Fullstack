import express from "express";
import { 
  addToFavourites, 
  removeFromFavourites, 
  getFavourites 
} from "../controllers/FavouriteController.js";
import requireAuth  from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/add-favourites", requireAuth, addToFavourites);

router.post("/remove-favourites", requireAuth, removeFromFavourites);

router.get("/get-favourites", requireAuth, getFavourites);

export default router;
