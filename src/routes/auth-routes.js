import express from "express";
import { login, register, logout } from "../controllers/auth-controller.js";
import { auth } from "../middleware/index.js";
import { tryWrapper } from "../utils/index.js";

const authRouter = express.Router();


authRouter.post("/register", tryWrapper(register));
authRouter.post("/login", tryWrapper(login));
authRouter.post("/logout", auth ,tryWrapper(logout));

export default authRouter;
