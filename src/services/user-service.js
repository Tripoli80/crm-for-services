import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Session from "../models/session.js";
import { hashedPassword } from "../utils/index.js";
const userService = {};

userService.get = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

userService.update = async ({
  _id,
  email,
  name,
  age,
  description,
  phone,
  customfield,
}) => {
  const filter = { _id };
  const update = { email, name, age, description, phone, customfield };
  const user = await User.findOneAndUpdate(filter, update, {
    new: true,
  }).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};

userService.delete = async (user) => {
  const deletedUser = await User.findByIdAndRemove(user);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  await Session.deleteMany({ user: user });
  return { deletedUser };
};

userService.changePassword = async ({ id, password, newPassword }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Проверяем, что текущий пароль введен правильно
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const hash = await hashedPassword(newPassword);
  user.password = hash;
  const updatedUser = await user.save();
  await Session.deleteMany({ user: id });

  return {
    message: "Password sucsess changed. All session removed",
    updatedUser,
  };
};
export default userService;
