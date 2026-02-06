import sqlite3 from 'sqlite3';

import insertData from './insertDB.js';
import checkingDiff from './checkingDifferenceDB.js';

export default async function connecttoDB(subjects,ispassed,dataLength, email)
{
  return new Promise(function(resolve, reject){

    const db = new sqlite3.Database('./grades.db');


    db.get('SELECT COUNT(*) AS count FROM uni_grades', async (err, row) => {
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

    });
  })
           
          
        


}




