import sqlite3 from 'sqlite3';

export default async function insertData(subjects,ispassed,dataLength)
{
    
    const db = new sqlite3.Database('./grades.db');
    const insert = db.prepare('INSERT INTO uni_grades (subject, passed) VALUES (?, ?)');

    for(let i=0;i<dataLength;i++) {

        insert.run(subjects[i], ispassed[i]);
    }
    insert.finalize();
    console.log("success");
    
}




