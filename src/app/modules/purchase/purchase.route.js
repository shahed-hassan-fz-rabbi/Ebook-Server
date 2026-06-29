import express from "express";
import auth from "../../middleware/auth.js";
import { PurchaseController } from "./purchase.controller.js";

const router = express.Router();

router.post(
  "/",
  auth("reader", "writer", "admin"),
  PurchaseController.createPurchase
);

router.post(

   "/checkout",

   auth("reader","writer","admin"),

   PurchaseController.checkout

);

router.get(
  "/",
  auth("admin"),
  PurchaseController.getAllPurchases
);

export default router;