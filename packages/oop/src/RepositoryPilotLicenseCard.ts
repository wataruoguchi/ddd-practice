import sqlite3 from "sqlite3";
import { inject, injectable } from "tsyringe";
import {
  PilotLicenseCard,
  StarshipClassification,
} from "./EntityPilotLicenseCard.ts";
import { Database } from "./MyDatabase.ts";
import { FullName } from "./ValueObjectFullName.ts";

type PilotLicenseCardRow = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  starship_classification: string;
};

@injectable()
export class RepositoryPilotLicenseCard {
  private db: sqlite3.Database;
  constructor(@inject("Database") database: Database) {
    this.db = database.getDB();
  }

  findById(id: string): Promise<PilotLicenseCard | null> {
    return new Promise((resolve, reject) => {
      this.db.get<PilotLicenseCardRow>(
        "SELECT * FROM pilot_license_cards WHERE id = ?",
        [id],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            resolve(null);
            return;
          }
          const {
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
          } = row;
          const fullName = new FullName({ firstName, lastName, middleName });
          const starShipClassification =
            row.starship_classification as StarshipClassification;
          resolve(
            new PilotLicenseCard({
              id: row.id,
              fullName,
              starShipClassification,
            })
          );
        }
      );
    });
  }

  findAll(): Promise<PilotLicenseCard[]> {
    return new Promise((resolve, reject) => {
      this.db.all<PilotLicenseCardRow>(
        "SELECT * FROM pilot_license_cards",
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(
            rows.map(
              (row) =>
                new PilotLicenseCard({
                  id: row.id,
                  fullName: new FullName({
                    firstName: row.first_name,
                    lastName: row.last_name,
                    middleName: row.middle_name ? row.middle_name : undefined,
                  }),
                  starShipClassification:
                    row.starship_classification as StarshipClassification,
                })
            )
          );
        }
      );
    });
  }

  save(entity: PilotLicenseCard): Promise<void> {
    return new Promise((resolve, reject) => {
      // Create a new record
      this.db.run(
        "INSERT OR IGNORE INTO pilot_license_cards (id, first_name, last_name, middle_name, starship_classification) VALUES (?, ?, ?, ?, ?)",
        [
          entity.id,
          entity.value().fullName.props.firstName,
          entity.value().fullName.props.lastName,
          entity.value().fullName.props.middleName,
          entity.value().starShipClassification,
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}
