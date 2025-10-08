// routes/user.routes.js
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Bu route’lar himoyalangan
router.get("/users", authMiddleware, getAllUsers);
router.get("/users/:userId", authMiddleware, getUserById);
router.put("/users/:userId", authMiddleware, updateUser);
router.delete("/users/:userId", authMiddleware, deleteUser);

export default router;
