import emailsend from './sendEmail.js';
import updateDB from './updateDatabase.js';

export default async function checkingDiff(subjects, ispassed,db, DataLength,email) {
   

    const databaseData = await new Promise((resolve, reject) => {
        db.all('SELECT subject,passed FROM uni_grades', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }


        });
    });

    const previousSubject = databaseData.map(row => row.subject);
    const previousPassed = databaseData.map(row => row.passed);

    let subjectPassedindex;
    let newSubjectPassed = false;


    for(let i=0;i<DataLength;i++)
    {
        const currentSubject = subjects[i];
        const currentisPassed = ispassed[i] ? 1 : 0;

        const index =  previousSubject.indexOf(currentSubject);

        if(currentSubject === previousSubject[index])
        {
            if(currentisPassed !== previousPassed[index])
            {
                newSubjectPassed = true;
                subjectPassedindex = i;
                break;
            }
            
        }
    }

    await emailsend(subjects[subjectPassedindex], newSubjectPassed, email);  
    await updateDB(subjects,ispassed, db, DataLength, email);

    db.close();
}
