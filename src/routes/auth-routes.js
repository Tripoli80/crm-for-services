import express from "express";
import {
  login,
  register,
  logout,
  refreshToken,
} from "../controllers/auth-controller.js";
import { auth, refreshAuth } from "../middleware/index.js";
import { tryWrapper } from "../utils/index.js";

const authRouter = express.Router();

  /*  #swagger.register.parameters['obj'] = {
                in: 'body',
                description: 'Some description...',
                schema: {
                    $name: 'Jhon Doe',
                    $age: 29,
                    about: ''1415
                    
                }
        } */

authRouter.post("/register",tryWrapper(register));
authRouter.post("/login", tryWrapper(login));
authRouter.post("/refresh", refreshAuth, tryWrapper(refreshToken));

authRouter.post("/logout", auth, tryWrapper(logout));

export default authRouter;



