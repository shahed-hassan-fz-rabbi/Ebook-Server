import express from "express";
import adminRoutes from "../modules/admin/admin.route.js";
import userRoutes from "../modules/user/user.route.js";
import ebookRoutes from "../modules/ebook/ebook.route.js";
import purchaseRoutes from "../modules/purchase/purchase.route.js";
import bookmarkRoutes from "../modules/bookmark/bookmark.route.js";
import adminRoutes from "../modules/admin/admin.route.js";
import writerRoutes from "../modules/writer/writer.route.js";




const router = express.Router();

router.use("/users", userRoutes);

router.use("/ebooks", ebookRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/admin", adminRoutes);
router.use("/bookmarks", bookmarkRoutes);
router.use(
  "/admin",
  adminRoutes
);

router.use(
  "/writer",
  writerRoutes
);


export default router;