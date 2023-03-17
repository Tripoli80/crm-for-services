import express from "express";
import { getFreeSlots } from "../controllers/event-controller.js";
import { tryWrapper } from "../utils/index.js";

const router = express.Router();

// POST /api/events/getslots - возвращает все свободные слоты времени в заданую дату и продолжительностью
router.get("/getslots/", tryWrapper(getFreeSlots));

export default router;
