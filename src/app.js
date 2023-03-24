import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes.js";
import eventsRouter from "./routes/event-routes.js";
import freeEventsRouter from "./routes/freeEvent-routes.js";
import { auth } from "./middleware/index.js";
import rateLimit from "express-rate-limit";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };import userRouter from "./routes/user-routes.js";
import clientRouter from "./routes/client-routes.js";
;


// const swaggerDefinition = {
//   info: {
//     title: "Example API",
//     version: "1.0.0",
//     description: "An example API for demonstrating Swagger",
//   },
// };

// const options = {
//   swaggerDefinition,
//   apis: ["./routes/*.js"],
// };
// const swaggerSpec = swaggerJSDoc(options);
///////////////////////



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


app.use("/api/user", auth, userRouter);
app.use("/api/client", clientRouter);

app.use("/api/events", auth, eventsRouter);

app.use("/api/:id/events/", freeEventsRouter);

// Add Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));




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
