import jwt from "jsonwebtoken";

export const tryWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

export const generateToken = async ({ user, session }) => {
  const secret = process.env.SECRET;
  const payload = { user, session };
  const token = jwt.sign(payload, secret, { expiresIn: "60m" });
  const refreshToken = jwt.sign(payload, secret);

  return { token, refreshToken };
};
