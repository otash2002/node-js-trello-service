import { pool } from "../config/db.js";

export async function createTask(title, board_id, status = "todo") {
  const query = `
    INSERT INTO tasks (title, board_id, status)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [title, board_id, status];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getTasksByBoard(board_id) {
  const { rows } = await pool.query(`SELECT * FROM tasks WHERE board_id = $1`, [board_id]);
  return rows;
}

export async function updateTaskStatus(id, status) {
  const { rows } = await pool.query(
    `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *;`,
    [status, id]
  );
  return rows[0];
}
