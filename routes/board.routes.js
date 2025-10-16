// routes/board.routes.js
import { Router } from "express";
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} from "../controllers/board.controller.js";

import { authMiddleware } from "../middleware/auth.js";

import { validate } from "../middleware/validation.middleware.js";
import { createBoardValidation, updateBoardValidation } from "../validation/board.validation.js";

const router = Router();  //boardlar faqat login userlar uchun bo‘lsa

router.use(authMiddleware);

router.get("/boards", authMiddleware, getAllBoards);
router.get("/boards/:boardId", authMiddleware, getBoardById);
router.post("/boards", authMiddleware, createBoard);
router.put("/boards/:boardId", authMiddleware, updateBoard);
router.delete("/boards/:boardId", authMiddleware, deleteBoard);

export default router;
