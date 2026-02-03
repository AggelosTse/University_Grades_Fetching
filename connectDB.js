import sqlite3 from 'sqlite3';

import insertData from './insertDB.js';

export default async function connectDB(subjects,ispassed,dataLength)
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
            await checkForDifferences(subjects,ispassed,dataLength);
        }
    });


    const insert = db.prepare('INSERT INTO uni_grades (subject, passed) VALUES (?, ?)');

    for(let i=0;i<dataFile.length;i++) {

        insert.run(subjects[i], ispassed[i]);
    }
    insert.finalize();
    console.log("success");
    
}




