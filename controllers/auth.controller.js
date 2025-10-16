// controllers/auth.controller.js
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ message: "Ro'yxatdan o'tishda xatolik", error: err.message });
  }
};

// ================= LOGIN =================
export const loginUsertoken = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Parol notogri" });

    // Token yaratish
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete user.password;
    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Login xatolik", error: err.message });
  }
};
