import authService from "../services/auth-service.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userAgent = req.headers["user-agent"];


  const { token, refreshToken, msg } = await authService.login({
    email,
    password,
    userAgent,
  });
  res.status(200).json({ token, refreshToken, msg });
};

export const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = await authService.register(email, password, name);
  res.status(201).json({ user });
};

export const logout = async (req, res, next) => {
  const { session } = req;
  const result = await authService.logout(session);
  if (result) res.status(200).json({ message: "Successfully logged out" });
};

export const refreshToken = async (req, res, next) => {
  const { user, session } = req;
  const userAgent = req.headers["user-agent"];

  const { refreshToken, token, msg } = await authService.refreshToken({
    user,
    session,
    userAgent,
  });

  res.status(200).json({ refreshToken, token, msg });
};
