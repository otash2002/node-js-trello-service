// routes/task.routes.js
import { Router } from "express";
import {
  getTasksByBoard,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

import { authMiddleware } from "../middleware/auth.js";

import { validate } from "../middleware/validation.middleware.js";
import { createTaskValidation, updateTaskValidation } from "../validation/task.validation.js";
const router = Router({ mergeParams: true });

router.use(authMiddleware);



router.get("/boards/:boardId/tasks", authMiddleware, getTasksByBoard);
router.get("/boards/:boardId/tasks/:taskId", authMiddleware, getTaskById);
router.post("/boards/:boardId/tasks", authMiddleware, createTask);
router.put("/boards/:boardId/tasks/:taskId", authMiddleware, updateTask);
router.delete("/boards/:boardId/tasks/:taskId", authMiddleware, deleteTask);

export default router;
