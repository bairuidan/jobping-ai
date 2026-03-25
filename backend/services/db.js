import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initDb() {
  db = await open({
    filename: './data/jobping.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jd TEXT NOT NULL,
      original_resume TEXT NOT NULL,
      optimized_resume TEXT NOT NULL,
      greetings_json TEXT NOT NULL,
      suggestions_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS shares (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      version_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(version_id) REFERENCES versions(id)
    );
  `);

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}
