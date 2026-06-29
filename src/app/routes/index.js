import express from "express";

import userRoutes from "../modules/user/user.route.js";
import ebookRoutes from "../modules/ebook/ebook.route.js";

const router = express.Router();

router.use("/users", userRoutes);

router.use("/ebooks", ebookRoutes);

export default router;