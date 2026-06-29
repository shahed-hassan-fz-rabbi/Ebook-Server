import express from "express";
import { EbookController } from "./ebook.controller.js";
import auth from "../../middleware/auth.js";



const router = express.Router();

// Public
router.get("/:id", EbookController.getSingleEbook);

router.get("/", EbookController.getAllEbooks);

// Writer/Admin
router.post(
  "/",
  auth("writer", "admin"),
  EbookController.createEbook
);


router.patch(
  "/:id",
  auth("writer", "admin"),
  EbookController.updateEbook
);

router.delete(
  "/:id",
  auth("writer", "admin"),
  EbookController.deleteEbook
);

export default router;