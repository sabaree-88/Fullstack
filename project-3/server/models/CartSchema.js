import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const Cart = mongoose.model("Cart", CartSchema);
