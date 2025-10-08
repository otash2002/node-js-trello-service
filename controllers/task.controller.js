// controllers/task.controller.js
import { pool } from "../config/db.js";

// GET /boards/:boardId/tasks - barcha tasklarni olish
export const getTasksByBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, title, order_index, description, user_id, board_id, column_id FROM tasks WHERE board_id=$1",
      [boardId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Tasklarni olishda xatolik", error: err.message });
  }
};

// GET /boards/:boardId/tasks/:taskId - ID bo‘yicha task
export const getTaskById = async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, title, order_index, description, user_id, board_id, column_id FROM tasks WHERE board_id=$1 AND id=$2",
      [boardId, taskId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Task topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task olishda xatolik", error: err.message });
  }
};

// POST /boards/:boardId/tasks - task yaratish
export const createTask = async (req, res) => {
  const { boardId } = req.params;
  const { title, order_index, description, user_id, column_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, order_index, description, user_id, board_id, column_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [title, order_index, description, user_id, boardId, column_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task yaratishda xatolik", error: err.message });
  }
};

// PUT /boards/:boardId/tasks/:taskId - taskni yangilash
export const updateTask = async (req, res) => {
  const { boardId, taskId } = req.params;
  const { title, order_index, description, user_id, column_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title=$1, order_index=$2, description=$3, user_id=$4, column_id=$5 WHERE id=$6 AND board_id=$7 RETURNING *",
      [title, order_index, description, user_id, column_id, taskId, boardId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Task topilmadi" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task yangilashda xatolik", error: err.message });
  }
};

// DELETE /boards/:boardId/tasks/:taskId - taskni o‘chirish
export const deleteTask = async (req, res) => {
  const { boardId, taskId } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND board_id=$2 RETURNING *",
      [taskId, boardId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Task topilmadi" });
    res.status(200).json({ message: "Task o‘chirildi", task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task o‘chirishda xatolik", error: err.message });
  }
};
