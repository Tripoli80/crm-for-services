import express from "express";
import * as servicesController from "../controllers/services-controller.js";
import { tryWrapper } from "../utils/index.js";

const router = express.Router();
router.post("/", tryWrapper(servicesController.addService));
router.get("/", tryWrapper(servicesController.getServices));
router.get("/:id", tryWrapper(servicesController.getServiceById));
router.put("/:id", tryWrapper(servicesController.updateService));
router.delete("/:id", tryWrapper(servicesController.deleteService));

export default router;
