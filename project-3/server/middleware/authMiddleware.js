import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }
  const token = Authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;
