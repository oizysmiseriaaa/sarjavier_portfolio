import mysql from "mysql2/promise";
import { getEnv } from "../utils/envValidator";

const isProduction = process.env.NODE_ENV === "production";

export const pool = mysql.createPool({
  host: getEnv("DB_HOST"),
  port: Number(getEnv("DB_PORT")),
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  database: getEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: isProduction ? { minVersion: "TLSv1.2" } : undefined,
});

export async function testDatabaseConnection(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.info("[database] MySQL connection pool established successfully.");
  } catch (error) {
    console.error("[database] Unable to connect to MySQL.");
    console.error(error instanceof Error ? error.message : error);
    throw error;
  }
}
