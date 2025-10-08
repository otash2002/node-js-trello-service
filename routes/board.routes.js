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

const router = Router();

router.get("/boards", authMiddleware, getAllBoards);
router.get("/boards/:boardId", authMiddleware, getBoardById);
router.post("/boards", authMiddleware, createBoard);
router.put("/boards/:boardId", authMiddleware, updateBoard);
router.delete("/boards/:boardId", authMiddleware, deleteBoard);

export default router;
