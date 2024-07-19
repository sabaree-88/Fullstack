import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.logIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      user: { _id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signUp(name, email, password);

    const token = createToken(user._id);
    res.status(201).json({ user: { _id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).send(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const UpdateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      if (password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
    }

    await user.save();

    return res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
