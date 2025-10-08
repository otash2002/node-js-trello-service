// controllers/user.controller.js
import { pool } from "../config/db.js";

// GET /users - barcha foydalanuvchilar
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email, created_at FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};

// GET /users/:userId - ID bo'yicha foydalanuvchi
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, username, email, created_at FROM users WHERE id=$1",
      [userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};

// PUT /users/:userId - foydalanuvchini yangilash
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id, username, email, created_at",
      [username, email, userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};

// DELETE /users/:userId - foydalanuvchini o'chirish
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // userId null qilish kerak bo'lgan tasklar
    await pool.query("UPDATE tasks SET user_id=NULL WHERE user_id=$1", [userId]);

    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id, username, email", [userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    res.status(200).json({ message: "Foydalanuvchi o'chirildi", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};
