// routes/auth.routes.js
import { Router } from "express";
import { registerUser, loginUsertoken } from "../controllers/auth.controller.js";
//import { validate } from "../middleware/validation.middleware.js";
//import { registerValidation, loginValidation } from "../validation/auth.validation.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUsertoken);


export default router;
