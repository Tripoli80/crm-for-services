import Event from "../models/event.js";
import moment from "moment";
import { chekValidObjectID } from "../utils/index.js";

const eventService = {};

eventService.getAllEvents = async (user) => {
  const events = await Event.find({ user })
    .populate("user")
    .populate("client")
    .populate("amount.currency");
  
  return events
};

eventService.createEvent = async ({ body ,user }) => {
  const newEvent = new Event({...body, user });
  const event = await newEvent.save();
  return event;
};

eventService.getEventById = async ({ id, user }) => {
  const event = await Event.findOne({ _id: id, user })
    .populate("user")
    .populate("client")
    .populate("amount.currency");;
  if (!event) {
    return { msg: "Event not found" };
  }
  return event;
};

eventService.changeEventById = async ({ id, body }) => {
  const { title, start, end, desc, client, status } = body;
  const filter = { _id: id };
  const update = { title, start, end, end, desc, client , status};
  const { modifiedCount, matchedCount } = await Event.updateOne(filter, update);
  if (+matchedCount > 0) {
    if (+modifiedCount > 0) {
      return { massege: "Update sucsess" };
    }
    return { massege: "Nothitg to update" };
  }
  return { massege: "Event not found" };
};

eventService.getEventsByDate = async ({ start, end, user }) => {
  const events = await Event.find({
    user: user,
    start: { $gte: start },
    end: { $lte: end },
  });
  return events;
};

eventService.getFreeSlots = async ({ duration, date, user }) => {
   user = "6422efb23400ac488f9a75da";
  const startTime = moment(date).startOf("day");
  const endTime = moment(date).endOf("day");
  console.log("🚀 ~ file: event-service.js:60 ~ endTime:",startTime, " / ", endTime)
  const events = await Event.find({
    user: user,
    start: { $gte: startTime },
    end: { $lte: endTime },
  });
  const busySlots = events
    .filter((event) =>
      moment(event.start).isBetween(startTime, endTime, undefined, "[]")
    )
    .map((event) => ({ start: moment(event.start), end: moment(event.end) }));

  const freeSlots = [];
  const interval = 10; // Интервал в минутах для предложения свободных слотов

  let lastEnd = startTime;

  for (let i = 0; i <= busySlots.length; i++) {
    const start = i === busySlots.length ? endTime : busySlots[i].start;
    const freeDuration = moment.duration(start.diff(lastEnd));

    for (let j = 0; j * interval + duration <= freeDuration.asMinutes(); j++) {
      const slotStart = lastEnd.clone().add(j * interval, "minutes");
      const slotEnd = slotStart.clone().add(duration, "minutes");
      freeSlots.push({ start: slotStart, end: slotEnd });
    }
    if (i !== busySlots.length) {
      lastEnd = busySlots[i].end;
    }
  }
  return freeSlots;
};
// eventService.getFreeSlots = async ({ duration, date, user }) => {
//   user = "6422efb23400ac488f9a75da";
//   const startTime = moment(date).startOf("day");
//   console.log("🚀 ~ file: event-service.js:59 ~ startTime:", startTime)
//   const endTime = moment(date).endOf("day");
//   console.log("🚀 ~ file: event-service.js:61 ~ endTime:", endTime)
//   const events = await Event.find({
//     user: user,
//     start: { $gte: startTime },
//     end: { $lte: endTime },
//   });
//   const busySlots = events
//     .filter((event) => moment(event.start).isBetween(startTime, endTime))
//     .map((event) => ({ start: moment(event.start), end: moment(event.end) }));

//   const freeSlots = [];
//   const interval = 10; // Интервал в минутах для предложения свободных слотов

//   let lastEnd = startTime;

//   if (busySlots.length === 0) {
//     for (
//       let j = 0;
//       j * interval + duration <= endTime.diff(startTime, "minutes");
//       j++
//     ) {
//       const slotStart = startTime.clone().add(j * interval, "minutes");
//       const slotEnd = slotStart.clone().add(duration, "minutes");
//       freeSlots.push({ start: slotStart, end: slotEnd });
//     }
//   } else {
//     for (let i = 0; i < busySlots.length; i++) {
//       const { start, end } = busySlots[i];
//       const freeDuration = moment.duration(start.diff(lastEnd));

//       for (
//         let j = 0;
//         j * interval + duration <= freeDuration.asMinutes();
//         j++
//       ) {
//         const slotStart = lastEnd.clone().add(j * interval, "minutes");
//         const slotEnd = slotStart.clone().add(duration, "minutes");
//         freeSlots.push({ start: slotStart, end: slotEnd });
//       }
//       lastEnd = end;
//     }
//     if (lastEnd.isBefore(endTime)) {
//       const freeDuration = moment.duration(endTime.diff(lastEnd));

//       for (
//         let j = 0;
//         j * interval + duration <= freeDuration.asMinutes();
//         j++
//       ) {
//         const slotStart = lastEnd.clone().add(j * interval, "minutes");
//         const slotEnd = slotStart.clone().add(duration, "minutes");
//         freeSlots.push({ start: slotStart, end: slotEnd });
//       }
//     }
//   }
//   console.log("🚀 ~ file: event-service.js:110 ~ freeSlots:", freeSlots)
//   return freeSlots;
// };

// eventService.getFreeSlots = async ({ duration, date, user }) => {
//   const startTime = moment(date).startOf("day");
//   const endTime = moment(date).endOf("day");
//   const events = await Event.find({
//     user: user, // ID пользователя
//     start: { $gte: startTime }, // События начинаются после стартового времени
//     end: { $lte: endTime }, // События заканчиваются перед конечным временем
//   });
//   const busySlots = events
//     .filter((event) => moment(event.start).isBetween(startTime, endTime))
//     .map((event) => ({ start: moment(event.start), end: moment(event.end) }));

//   const freeSlots = [];
//   let lastEnd = startTime;
//   for (let i = 0; i < busySlots.length; i++) {
//     const { start, end } = busySlots[i];
//     if (start.isSameOrAfter(lastEnd)) {
//       const freeDuration = moment.duration(start.diff(lastEnd));
//       const availableDurations = Math.floor(
//         freeDuration.asMinutes() / duration
//       );
//       for (let j = 0; j < availableDurations; j++) {
//         const slotStart = lastEnd.clone().add(j * duration, "minutes");
//         const slotEnd = slotStart.clone().add(duration, "minutes");
//         freeSlots.push({ start: slotStart, end: slotEnd });
//       }
//     }
//     lastEnd = end;
//   }
//   if (lastEnd.isBefore(endTime)) {
//     const freeDuration = moment.duration(endTime.diff(lastEnd));
//     const availableDurations = Math.floor(freeDuration.asMinutes() / duration);
//     for (let j = 0; j < availableDurations; j++) {
//       const slotStart = lastEnd.clone().add(j * duration, "minutes");
//       const slotEnd = slotStart.clone().add(duration, "minutes");
//       freeSlots.push({ start: slotStart, end: slotEnd });
//     }
//   }
//   return freeSlots;
// };

export default eventService;
