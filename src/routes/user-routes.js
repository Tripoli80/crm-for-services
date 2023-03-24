import express from "express";

import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user-controller.js";
import { tryWrapper } from "../utils/index.js";


const userRouter = express.Router();

userRouter.get("/",tryWrapper(getUser));
userRouter.put("/", tryWrapper(updateUser));
userRouter.put("/change-password", tryWrapper(changePassword));

userRouter.delete("/", tryWrapper(deleteUser));


export default userRouter;



