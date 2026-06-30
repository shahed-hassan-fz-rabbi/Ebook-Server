import express from "express";
import { googleBetterAuthBridge } from "./auth.controller.js";

const router = express.Router();

router.post("/google-betterauth", googleBetterAuthBridge);

export default router;