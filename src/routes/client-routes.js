import express from "express";
import { getClient } from "../controllers/client-controller.js";

import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user-controller.js";
import { auth } from "../middleware/index.js";
import { tryWrapper } from "../utils/index.js";


const clientRouter = express.Router();

clientRouter.get("/:id",auth,tryWrapper(getClient));
// clientRouter.post("/", tryWrapper(updateUser));
// clientRouter.put("/:id", tryWrapper(changePassword));

// clientRouter.delete("/", tryWrapper(deleteUser));


export default clientRouter;



