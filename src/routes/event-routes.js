import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByDate,
  getFreeSlots,
} from "../controllers/event-controller.js";
import { tryWrapper } from "../utils/index.js";

const router = express.Router();

// GET /api/events - возвращает все события
router.get("/", tryWrapper(getAllEvents));
// GET /api/events/:id - возвращает событие по id
router.get("/:id", tryWrapper(getEventById));
// POST /api/events/date - возвращает все события в заданном диапазоне дат
router.post("/date", tryWrapper(getEventsByDate));
// POST /api/events/getslots - возвращает все свободные слоты времени в заданую дату и продолжительностью
router.post("/getslots", tryWrapper(getFreeSlots));
// POST /api/events - создает новое событие
router.post("/", tryWrapper(createEvent));



export default router;
