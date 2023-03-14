import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { generateToken } from "../utils/index.js";

const authService = {};

authService.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const { token, longToken } = await generateToken(user.id);
  return { token, msg: "tes555t" };
};

authService.register = async (email, password, name) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword, name });
  const createdUser = await user.save();

  return {
    email,
    id: createdUser._id,
  };
};

authService.logout = async (token) => {
  console.log("🚀 ~ file: auth-service.js:34 ~ token:", token);
  // Implement logout logic here, e.g. blacklisting the token
};

export default authService;
