import sqlite3 from "sqlite3";
import {
  PilotLicenseCardEntityFunctions,
  PilotLicenseCardValue,
  StarshipClassification,
} from "./entity-pilot-license-card.ts";

type PilotLicenseCardRow = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  starship_classification: string;
};

export function createRepositoryPilotLicenseCard(db: sqlite3.Database) {
  function findById(id: string): Promise<PilotLicenseCardValue | null> {
    return new Promise((resolve, reject) => {
      db.get<PilotLicenseCardRow>(
        "SELECT * FROM pilot_license_cards WHERE id = ?",
        [id],
        (err: Error | null, row: PilotLicenseCardRow) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            resolve(null);
            return;
          }
          // NOTE: It does not rely on Value Object implementation details.
          resolve(
            PilotLicenseCardEntityFunctions.create({
              id: row.id,
              fullName: {
                firstName: row.first_name,
                lastName: row.last_name,
                middleName: row.middle_name ? row.middle_name : undefined,
              },
              starShipClassification:
                row.starship_classification as StarshipClassification,
            })
          );
        }
      );
    });
  }

  function findAll(): Promise<PilotLicenseCardValue[]> {
    return new Promise((resolve, reject) => {
      db.all<PilotLicenseCardRow>(
        "SELECT * FROM pilot_license_cards",
        (err: Error | null, rows: PilotLicenseCardRow[]) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(
            rows.map((row) =>
              PilotLicenseCardEntityFunctions.create({
                id: row.id,
                fullName: {
                  firstName: row.first_name,
                  lastName: row.last_name,
                  middleName: row.middle_name ? row.middle_name : undefined,
                },
                starShipClassification:
                  row.starship_classification as StarshipClassification,
              })
            )
          );
        }
      );
    });
  }

  function save(card: PilotLicenseCardValue): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO pilot_license_cards (id, first_name, last_name, middle_name, starship_classification) VALUES (?, ?, ?, ?, ?)",
        [
          card.id,
          card.fullName.firstName,
          card.fullName.lastName,
          card.fullName.middleName,
          card.starShipClassification,
        ],
        (err: Error | null) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  }

  return {
    findById,
    findAll,
    save,
  };
}
