// routes/user.routes.js
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import {  getAllUsersearch } from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.js";

import { validate } from "../middleware/validation.middleware.js";
import { createUserValidation, updateUserValidation } from "../validation/user.validation.js";

const router = Router();

router.use(authMiddleware);
// Bu routelar himoyalangan
router.get("/users", authMiddleware, getAllUsers);
router.get("/users/:userId", authMiddleware, getUserById);
router.put("/users/:userId", authMiddleware, updateUser);
router.delete("/users/:userId", authMiddleware, deleteUser);
//search va pagination bolimi boladi bu
router.get("/", getAllUsersearch);

export default router;
