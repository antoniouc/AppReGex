// src/infrastructure/database/SQLiteConnection.ts
import * as SQLite from 'expo-sqlite';

class SQLiteConnection {
  private static instance: Promise<SQLite.SQLiteDatabase> | null = null;

  private constructor() {}

  public static getInstance(): Promise<SQLite.SQLiteDatabase> {
    if (!this.instance) {
      this.instance = SQLite.openDatabaseAsync('regex_app.db');
    }
    return this.instance;
  }
}

export default SQLiteConnection;
