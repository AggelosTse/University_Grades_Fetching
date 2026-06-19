import sqlite3 from "sqlite3";

import insertData from "./insertDB.js";
import checkingDiff from "./checkingDifferenceDB.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function connecttoDB(subjects, ispassed, dataLength) {
  return new Promise(function (resolve, reject) {
    //dynamic path finding
    const dbPath = path.join(__dirname, process.env.DB_PATH);
    const db = new sqlite3.Database(dbPath);

    //check if subjects db is empty
    db.get(
      "SELECT COUNT(*) AS count FROM uni_grades",
      async function (err, row) {
        if (err) {
          db.close();
          reject(new Error("Opening database"));
        }

        try {
          //if empty insert data
          if (row.count === 0) {
            await insertData(subjects, ispassed, db, dataLength);
          //if not empty check for differences
          } else {
            await checkingDiff(subjects, ispassed, db, dataLength);
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
