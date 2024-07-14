import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    req.user = { _id, email: user.email, role: user.role };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;
