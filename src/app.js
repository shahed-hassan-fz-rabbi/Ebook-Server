import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";



const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1", router);

app.use(cookieParser());
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fable API Running",
  });
});

export default app;