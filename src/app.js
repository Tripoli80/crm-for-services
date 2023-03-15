import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth-routes.js";
import eventsRouter from "./routes/event-routes.js";
import { auth } from "./middleware/index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/events", auth, eventsRouter);


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
