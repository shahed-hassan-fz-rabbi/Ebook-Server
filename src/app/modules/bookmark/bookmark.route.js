import express from "express";
import auth from "../../middleware/auth.js";
import { BookmarkController } from "./bookmark.controller.js";

const router = express.Router();

router.post(
  "/",
  auth("reader", "writer", "admin"),
  BookmarkController.createBookmark
);

router.get(
  "/",
  auth("reader", "writer", "admin"),
  BookmarkController.getMyBookmarks
);

router.delete(
  "/:id",
  auth("reader", "writer", "admin"),
  BookmarkController.deleteBookmark
);

export default router;