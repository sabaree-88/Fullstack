import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Books = mongoose.model("Books", BookSchema);
