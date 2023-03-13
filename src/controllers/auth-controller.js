import authService from "../services/auth-service.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  res.status(200).json({ token });
};

export const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = await authService.register(email, password, name);
  res.status(201).json({ user });
};

export const logout = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  await authService.logout(token);
  res.status(200).json({ message: "Successfully logged out" });
};
