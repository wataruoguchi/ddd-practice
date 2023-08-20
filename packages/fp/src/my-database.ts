import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");
db.exec(`
            CREATE TABLE IF NOT EXISTS pilot_license_cards (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                middle_name TEXT,
                starship_classification TEXT NOT NULL
            )
        `);
