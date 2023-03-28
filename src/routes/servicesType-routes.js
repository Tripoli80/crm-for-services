import express from "express";
import * as servicesTypeController from "../controllers/servicesType-controller.js";
import { tryWrapper } from "../utils/index.js";

const router = express.Router();
router.post("/", tryWrapper(servicesTypeController.addServicesType));
router.get("/", tryWrapper(servicesTypeController.getServicesTypes));
router.get("/:id", tryWrapper(servicesTypeController.getServiceTypeById));
router.put("/:id", tryWrapper(servicesTypeController.updateServiceType));
router.delete("/:id", tryWrapper(servicesTypeController.deleteServiceType));

export default router;
