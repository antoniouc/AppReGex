// src/database/schema.ts
import SQLiteConnection from "./SqliteConection";

export const initializeDB = async () => {
  const db = await SQLiteConnection.getInstance(); 

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS regex_histor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pattern TEXT NOT NULL,
      flags TEXT,
      createdAt TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS regex_favorite (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pattern TEXT NOT NULL,
      flags TEXT,
      createdAt TEXT NOT NULL
    );
  `);
};
