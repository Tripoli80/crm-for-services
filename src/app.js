import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes.js";
import eventsRouter from "./routes/event-routes.js";
import freeEventsRouter from "./routes/freeEvent-routes.js";
import { auth } from "./middleware/index.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 100, // максимальное количество запросов за 1 минуту
  message: "Too many requests from your IP, please try again later.",
});

// Apply the rate limiting middleware to API calls only

const app = express();

app.use(cors());
app.use(cookieParser());
app.use("/api", apiLimiter);

app.use(bodyParser.json());
app.use("/api/auth", authRouter);

app.use("/api/events", auth, eventsRouter);
app.use("/api/events/:id/", freeEventsRouter);




app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Routs not found" });
});
export default app;
