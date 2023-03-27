import express from "express";
import {
    addClient,
  getClient,
  removeClient,
  searchClient,
  updateClient,
} from "../controllers/client-controller.js";

import { auth } from "../middleware/index.js";
import { tryWrapper } from "../utils/index.js";


const clientRouter = express.Router();

clientRouter.get("/", auth, tryWrapper(searchClient));
clientRouter.get("/:id",auth,tryWrapper(getClient));
clientRouter.post("/",auth, tryWrapper(addClient));
clientRouter.put("/:id", auth, tryWrapper(updateClient));
clientRouter.delete("/:id", auth, tryWrapper(removeClient));



export default clientRouter;



