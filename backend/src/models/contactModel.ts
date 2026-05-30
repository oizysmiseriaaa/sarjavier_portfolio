import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db";
import type { ContactRecord } from "../types";

export async function createContact(contact: ContactRecord): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO contacts (name, email, subject, message, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `,
    [contact.name, contact.email, contact.subject, contact.message, contact.ipAddress]
  );

  return result.insertId;
}
