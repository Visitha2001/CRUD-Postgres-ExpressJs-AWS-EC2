import { pool } from "#config/postgres.js";

const createBookTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(20) UNIQUE,
      published_date DATE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Table 'books' checked/created successfully.");
  } catch (error) {
    console.error("Error creating 'books' table:", error);
    throw error;
  }
};

export default createBookTable;