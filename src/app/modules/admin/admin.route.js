import express from "express";

import auth from "../../middleware/auth.js";

import { AdminController } from "./admin.controller.js";

const router = express.Router();

router.get(
  "/analytics",
  auth("admin"),
  AdminController.getAnalytics
);

export default router;