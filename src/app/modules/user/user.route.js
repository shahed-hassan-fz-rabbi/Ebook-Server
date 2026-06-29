import express from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middleware/auth.js";


const router = express.Router();



router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);





router.get(
  "/me",
  auth("reader", "writer", "admin"),
  UserController.getMe
);

export default router;
    