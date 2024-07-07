import { User } from "../models/UserModel.js";
export const Login = async (req, res) => {
  res.json({ message: "Login" });
};

export const SignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signUp(email, password);
    res.status(201).json({ email: user.email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
