import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

/* Better Auth routes MUST come before express.json() */
app.all(
  "/api/auth/*splat",
  toNodeHandler(auth)
);

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fable API Running",
  });
});

app.use(globalErrorHandler);

export default app;