import sqlite3 from 'sqlite3';

export default async function storeToDB(subjects,ispassed,dataFile)
{
    
    
    const db = new sqlite3.Database('./grades.db');
    const insert = db.prepare('INSERT INTO uni_grades (subject, passed) VALUES (?, ?)');

    for(let i=0;i<dataFile.length;i++) {

        insert.run(subjects[i], ispassed[i]);
    }
    insert.finalize();
    console.log("success");
    
}




