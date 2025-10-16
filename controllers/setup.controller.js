// controllers/setup.controller.js
import { pool } from "../config/db.js";
import { createTables } from "../services/setup.service.js";


export const setUpDatabase = async (req, res) => {
  try {
    const result = await createTables();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Bazani yaratishda xatolik", error });
  }
};

export const setupDatabase = async (req, res) => {
  try {
    // USERS jadvali
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // BOARDS jadvali
    await pool.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // LISTS jadvali
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lists (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // TASKS jadvali
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'todo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return res.status(200).json({
      message: " Barcha jadvallar muvaffaqiyatli yaratildi!",
    });
  } catch (error) {
    console.error("Setup xatolik:", error);
    res.status(500).json({ message: "Setupda xatolik bor", error: error.message });
  }
};
