import { Pool } from "pg";
import dotenv from "dotenv";
import createBookTable from "#models/book.js";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully.");
    client.release();

    // Run migrations
    console.log("Running database migrations...");
    await createBookTable();
    console.log("Migrations completed successfully.");

  } catch (error) {
    console.error("Database connection or migration failed:", error);
    process.exit(1);
  }
};
