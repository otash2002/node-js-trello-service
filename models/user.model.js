import { pool } from "../config/db.js";

// Foydalanuvchini yaratish
export async function createUser(username, email, hashedPassword) {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
  `;
  const values = [username, email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Email bo‘yicha foydalanuvchini topish
export async function findUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return rows[0];
}
