import pool from "../config/db.js";


export const createTables = async () => {
  const client = await pool.connect();
  try {
    // 1️⃣ Users jadvali
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    // 2️⃣ Boards jadvali
    await client.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL
      );
    `);

    // 3️⃣ Tasks jadvali
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        "order" INT,
        description TEXT,
        userId INT REFERENCES users(id) ON DELETE SET NULL,
        boardId INT REFERENCES boards(id) ON DELETE CASCADE,
        columnId INT
      );
    `);

    console.log("📊 Barcha jadvallar yaratildi yoki avvaldan mavjud!");
    return { message: "Barcha jadvallar yaratildi!" };
  } catch (error) {
    console.error("❌ Jadval yaratishda xatolik:", error);
    throw error;
  } finally {
    client.release();
  }
};
