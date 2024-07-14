import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.logIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user: { _id: user._id, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const SignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id);
    res
      .status(201)
      .json({ user: { _id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
