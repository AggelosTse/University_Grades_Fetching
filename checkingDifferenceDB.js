import sqlite3 from 'sqlite3';

export default async function checkingDiff(subjects,ispassed,DataLength)
{
    
    const db = new sqlite3.Database('./grades.db');

    
    db.all('SELECT subject FROM uni_grades', (err, rows) => {
        if (err) {
            console.error("Σφάλμα κατά την ανάγνωση:", err.message);
            return;
        }
    
        const previousSubjects = rows.map(row => row.subject);
    
        
        // Εδώ μπορείς να ελέγξεις αν η λίστα είναι άδεια (Simple condition)
        if (previousSubjects.length === 0) {
            console.log("Η λίστα είναι άδεια!");
        }
    });

    db.all('SELECT passed FROM uni_grades', (err, rows) => {
        if (err) {
            console.error("Σφάλμα κατά την ανάγνωση:", err.message);
            return;
        }
    
        const previousPassed = rows.map(row => row.subject);
    
        
        // Εδώ μπορείς να ελέγξεις αν η λίστα είναι άδεια (Simple condition)
        if (previousPassed.length === 0) {
            console.log("Η λίστα είναι άδεια!");
        }
    });

    let areSame = true;
    for(let i=0;i<DataLength;i++)
    {
        if(previousPassed[i] !== ispassed[i]) {areSame =  false}
    }
    if(areSame)
    {
        sendEmail();
    }
}




