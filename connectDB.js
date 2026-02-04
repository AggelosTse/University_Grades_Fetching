import sqlite3 from 'sqlite3';

import insertData from './insertDB.js';
import checkingDiff from './checkingDifferenceDB.js';

export default async function connecttoDB(subjects,ispassed,dataLength)
{
    
    const db = new sqlite3.Database('./grades.db');

    db.get('SELECT COUNT(*) AS count FROM uni_grades', async (err, row) => {
        if (err) {
            console.error("Σφάλμα στον έλεγχο:", err.message);
            return;
        }
    
        if (row.count === 0) {
          
            await insertData(subjects,ispassed,dataLength);

        } else {

            await checkingDiff(subjects,ispassed,dataLength);
        }
    });


}




