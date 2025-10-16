import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { pool } from "./config/db.js"; 
import setupRoutes from "./routes/setup.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { authMiddleware } from "./middleware/auth.js"; // e'tibor: default emas, export nomi bilan

const app = express();

app.use(express.json());
app.use("/api", setupRoutes);
app.use("/api", authRoutes);
app.use("/api", authMiddleware, userRoutes);
app.use("/api", authMiddleware, boardRoutes);
app.use("/api", authMiddleware, taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // 🔥 shu joyda ham test qilamiz
});
