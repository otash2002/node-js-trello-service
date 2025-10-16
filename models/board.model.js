import { pool } from "../config/db.js";

export async function createBoard(title, owner_id) {
  const query = `
    INSERT INTO boards (title, owner_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [title, owner_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getUserBoards(owner_id) {
  const { rows } = await pool.query(
    `SELECT * FROM boards WHERE owner_id = $1`,
    [owner_id]
  );
  return rows;
}

export async function deleteBoard(id, owner_id) {
  await pool.query(`DELETE FROM boards WHERE id = $1 AND owner_id = $2`, [id, owner_id]);
}
