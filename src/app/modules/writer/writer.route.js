import express from "express";

import auth from "../../middleware/auth.js";

import { WriterController } from "./writer.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  auth("writer"),
  WriterController.getDashboardStats
);

export default router;