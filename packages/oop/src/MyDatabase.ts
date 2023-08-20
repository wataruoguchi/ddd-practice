import sqlite3 from "sqlite3";
import { injectable } from "tsyringe";

export abstract class Database {
  abstract getDB(): sqlite3.Database;
}

@injectable()
export class MyDatabase implements Database {
  private db: sqlite3.Database;
  constructor() {
    this.db = new sqlite3.Database(":memory:");
    this.db.exec(`
            CREATE TABLE IF NOT EXISTS pilot_license_cards (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                middle_name TEXT,
                starship_classification TEXT NOT NULL
            )
        `);
  }
  getDB() {
    return this.db;
  }
}
