import express from "express";

const router = express.Router();

// Admin routes will be added here later (manage users, manage ebooks, transactions, analytics)
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Admin route working" });
});

export default router;