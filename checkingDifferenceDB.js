import sqlite3 from 'sqlite3';
import emailsend from './sendEmail.js';

export default async function checkingDiff(subjects, ispassed, DataLength) {
    const db = new sqlite3.Database('./grades.db');

    const previousPassed = await new Promise((resolve, reject) => {
        db.all('SELECT passed FROM uni_grades', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map(row => row.passed));
            }
        });
    });

    let subjectPassedindex;
    let newSubjectPassed = false;

    for (let i = 0; i < DataLength; i++) {
        if (previousPassed[i] !== ispassed[i]) {
            subjectPassedindex = i;
            newSubjectPassed = true;
            break; // stop at first difference
        }
    }

    await emailsend(subjects[subjectPassedindex], newSubjectPassed);  
    

    db.close();
}
