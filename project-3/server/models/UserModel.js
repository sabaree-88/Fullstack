import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong.");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email is already registered.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

export const User = mongoose.model("User", UserSchema);
