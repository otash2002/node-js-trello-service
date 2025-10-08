// routes/auth.routes.js
import { Router } from "express";
import { registerUser, loginUseremail } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUseremail);

export default router;
