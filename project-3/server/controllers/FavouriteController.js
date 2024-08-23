import { User } from "../models/UserModel.js";

export const addToFavourites = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: bookId } },
      { new: true }
    ).populate("favourites");

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    return res.status(200).json(user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const removeFromFavourites = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: bookId } },
      { new: true }
    ).populate("favourites");

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    return res.status(200).json(user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("favourites");

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    return res.status(200).json(user.favourites);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
