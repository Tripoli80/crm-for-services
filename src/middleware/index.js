import jwt from "jsonwebtoken";
import { generateToken } from "../utils/index.js";

const auth = async (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  const { SECRET } = process.env;

  // If the token is not present, send a 401 unauthorized response
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }

  // Verify the token using the secret key
  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const data = jwt.decode(token, SECRET);
        const newToken = await generateToken(data.user);
        req.user = data.user;
        res.setHeader("Authorization", `Bearer ${newToken.token}`);
        return res
          .status(403)
          .send({ message: "Forbidden: TokenExpired token" });
      } else {
        return res.status(403).send({ message: "Forbidden: Invalid token" });
      }
    } else {
      req.user = decoded.user;
    }
    next();
  });
};

export { auth };
