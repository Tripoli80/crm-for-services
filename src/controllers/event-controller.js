import eventService from "../services/event-service.js";

export const getAllEvents = async (req, res, next) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ events });
};

export const createEvent = async (req, res, next) => {
  const { title, start, end, desc } = req.body;
  const { user } = req;
  const event = await eventService.createEvent({
    title,
    start,
    end,
    desc,
    user,
  });
  res.status(201).json({ event });
};

export const getEventById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  const event = await eventService.getEventById({ id, user });
  res.status(200).json({ event });
};

export const getEventsByDate = async (req, res, next) => {
  const { start, end } = req.body;
  const { user } = req;

  const events = await eventService.getEventsByDate({ start, end, user });
  res.status(200).json({ events });
};

export const getFreeSlots = async (req, res, next) => {
  const { date, duration } = req.body;
  const { user } = req;

  const freeSlots = await eventService.getFreeSlots({ date, duration, user });
  res.status(200).json({ freeSlots });
};
