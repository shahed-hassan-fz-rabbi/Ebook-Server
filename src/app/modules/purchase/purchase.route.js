import express from "express";
import auth from "../../middleware/auth.js";
import { PurchaseController } from "./purchase.controller.js";

const router = express.Router();

router.post(
  "/",
  auth("reader", "writer", "admin"),
  PurchaseController.createPurchase
);

export default router;