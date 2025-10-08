// controllers/board.controller.js
import { pool } from "../config/db.js";

// GET /boards - barcha doskalarni olish
export const getAllBoards = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, description, user_id, created_at FROM boards");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};

// GET /boards/:boardId - ID bo‘yicha doska
export const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, name, description, user_id, created_at FROM boards WHERE id=$1",
      [boardId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Doska topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
  }
};

// POST /boards - doska yaratish
export const createBoard = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO boards (name, description, user_id) VALUES ($1, $2, $3) RETURNING id, name, description, user_id, created_at",
      [name, description, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Doska yaratishda xatolik", error: err.message });
  }
};

// PUT /boards/:boardId - doskani yangilash
export const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE boards SET name=$1, description=$2 WHERE id=$3 RETURNING id, name, description, user_id, created_at",
      [name, description, boardId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Doska topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Doska yangilashda xatolik", error: err.message });
  }
};

// DELETE /boards/:boardId - doskani o‘chirish
export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    // Board o‘chirilganda tasklari ham o‘chadi
    await pool.query("DELETE FROM tasks WHERE board_id=$1", [boardId]);

    const result = await pool.query("DELETE FROM boards WHERE id=$1 RETURNING id, name", [boardId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Doska topilmadi" });
    res.status(200).json({ message: "Doska o‘chirildi", board: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Doska o‘chirishda xatolik", error: err.message });
  }
};
