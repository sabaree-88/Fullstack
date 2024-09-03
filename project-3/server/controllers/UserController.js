import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { OAuth2Client } from "google-auth-library";
import fs from "fs";

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const allUsers = await User.find({}).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.json({
      allUsers,
      totalUsers,
      page,
      pages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error("Get Users Error:", error);
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
    console.error("Get User By ID Error:", error);
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNumber } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (profileImage) {
      if (user.profileImage) {
        fs.unlinkSync(path.resolve(user.profileImage));
      }
      user.profileImage = profileImage;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// const createResetToken = (email) => {
//   return jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" });
// };

// export const ForgetPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User with this email does not exist." });
//     }

//     const token = createResetToken(user.email);

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Password Reset",
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://localhost:5173/reset-password/${token}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Recovery email sent." });
//   } catch (error) {
//     console.error("Error sending recovery email:", error);
//     res.status(500).json({ message: "Error sending recovery email." });
//   }
// };

// export const ResetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found." });
//     }

//     if (password && password.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     } else {
//       return res.status(400).json({ message: "Password is required." });
//     }

//     await user.save();
//     res.status(200).json({ message: "Password has been updated." });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(400)
//         .json({ message: "Password reset token has expired." });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const ResetPasswordPage = (req, res) => {
//   const { token } = req.params;
//   res.sendFile(path.join(__dirname, "..", "..", "app", "dist", "index.html"));
// };

//testing

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

    const otp = generateOTP();
    const token = createResetToken(user.email);

    user.resetOTP = otp;
    user.resetToken = token;
    console.log("Before saving user:", user);
    await User.updateOne(
      { _id: user._id },
      { $set: { resetOTP: otp, resetToken: token } }
    );
    console.log("After saving user:", user);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: ` <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: white;">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="padding: 20px; background-color: rgb(219 218 218);">
                    <div style="color: rgb(0, 0, 0); text-align: left;">
                      <h1 style="margin: 1rem 0">Verification code</h1>
                      <p style="padding-bottom: 16px">Please use the verification code below to reset password.</p>
                      <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                      <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP." });
  }
};

export const VerifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!user.resetOTP) {
      return res.status(400).json({ message: "OTP not found." });
    }

    if (user.resetOTP.toString() !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    res.status(200).json({ message: "OTP is valid." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const ResetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.resetOTP = null;
      user.resetToken = null;
      await user.save();
      res.status(200).json({ message: "Password has been updated." });
    } else {
      return res.status(400).json({ message: "Password is required." });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// testing end
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

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { role: { $regex: query, $options: "i" } },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Search Users Error:", error);
    res.status(500).json({ message: "Error searching for users", error });
  }
};
