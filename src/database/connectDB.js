import sqlite3 from "sqlite3";

import insertData from "./insertDB.js";
import checkingDiff from "./checkingDifferenceDB.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function connecttoDB(
  subjects,
  ispassed,
  dataLength,
  email
) {
  return new Promise(function (resolve, reject) {
    const dbPath = path.join(__dirname, process.env.DB_PATH);
    const db = new sqlite3.Database(dbPath);

    db.get(
      "SELECT COUNT(*) AS count FROM uni_grades",
      async function (err, row) {
        if (err) {
          db.close();
          reject(new Error("Opening database"));
        }

        try {
          if (row.count === 0) {
            await insertData(subjects, ispassed, db, dataLength, email);
          } else {
            await checkingDiff(subjects, ispassed, db, dataLength, email);
          }

          db.close();
          resolve();
        } catch (error) {
          db.close();
          reject(error);
        }
      }
    );
  });
}
