import { Cart } from "../models/CartSchema.js";

export const addToCart = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ bookId });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ bookId }],
      });
    }
    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
