import express from "express";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addBook);
router.get("/", authMiddleware, getBooks);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;