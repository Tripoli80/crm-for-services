import jwt from "jsonwebtoken";

export const tryWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

export const generateToken = async (_id) => {
  const secret = process.env.SECRET;
  const payload = { user: _id };
  const token = jwt.sign(payload, secret, { expiresIn: "60m" });
  const longToken = jwt.sign(payload, secret);
  
  return { token, longToken };
};
