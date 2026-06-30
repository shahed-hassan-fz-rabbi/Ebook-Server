import express from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

router.post("/google-sync", UserController.googleSync);

router.get(
  "/me",
  auth("user", "writer", "admin"),
  UserController.getMe
);

router.get("/", auth("admin"), UserController.getAllUsers);

router.patch("/:id/block", auth("admin"), UserController.blockUser);

router.patch("/:id/unblock", auth("admin"), UserController.unblockUser);

router.patch("/:id/role", auth("admin"), UserController.changeRole);

router.get(
  "/dashboard",
  auth("user"),
  UserController.getReaderDashboard
);

export default router;