import { Router } from "express";
import { setupDatabase } from "../controllers/setup.controller.js";

const router = Router();

router.get("/setup", setupDatabase);

export default router;
