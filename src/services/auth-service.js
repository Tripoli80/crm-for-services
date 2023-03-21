import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Session from "../models/session.js";
import { generateToken } from "../utils/index.js";

const authService = {};

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
authService.login = async ({ email, password, userAgent }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");
  const session = new Session({
    user: user.id,
    userAgent,
  });
  const { token, refreshToken } = await generateToken({
    user: user.id,
    session: session.id,
  });
  session.tocken = token;
  session.refreshToken = refreshToken;
  await session.save();

  return { token, refreshToken, msg: "Auto Deploy Work" };
};

authService.refreshToken = async ({ user, session, userAgent }) => {
  const curentUser = await User.findById(user);
  if (!curentUser) return new Error("User not found");
  const curentSession = await Session.findById(session);

  const { token, refreshToken } = await generateToken({ user, session });
  curentSession.tocken = token;
  curentSession.refreshToken = refreshToken;
  await curentSession.save();

  return {
    token,
    refreshToken,
  };
};

authService.logout = async (session) => {
  const removedSession = await Session.findByIdAndRemove(session);
  if (!removedSession) throw new Error("Session not found");

  return removedSession;
  // TO DO remove session
};

export default authService;
