import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { OAuth2Client } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (_id, rememberMe) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: rememberMe ? "30d" : "2d",
  });
};

export const Login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.logIn(email, password);
    const token = createToken(user._id, rememberMe);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(400).json({ error: "Invalid credentials" });
  }
};

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signUp(name, email, password);

    const token = createToken(user._id);
    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
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

const createResetToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" });
};

export const ForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist." });
    }

    const token = createResetToken(user.email);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:5173/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Recovery email sent." });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    res.status(500).json({ message: "Error sending recovery email." });
  }
};

export const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Token decoded:", decoded);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      console.log("User not found for email:", decoded.email);
      return res.status(400).json({ message: "User not found." });
    }

    if (password && password.trim() !== "") {
      console.log("Hashing new password...");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    } else {
      console.log("No password provided or password is empty");
      return res.status(400).json({ message: "Password is required." });
    }

    console.log("Saving user...");
    await user.save();
    console.log("Password updated for user:", user.email);
    res.status(200).json({ message: "Password has been updated." });
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Password reset token has expired." });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const ResetPasswordPage = (req, res) => {
  const { token } = req.params;
  res.sendFile(path.join(__dirname, "..", "..", "app", "dist", "index.html"));
};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    const user = await User.googleLogin(email);

    const token = user.generateAuthToken();

    res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
