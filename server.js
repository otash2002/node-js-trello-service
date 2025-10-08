import express from "express";
import { pool } from "./config/db.js"; 
//routlar
import setupRoutes from "./routes/setup.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
app.use(express.json());
//app,use lar
app.use("/api", setupRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", boardRoutes);
app.use("/api", taskRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
