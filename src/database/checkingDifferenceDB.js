import emailsend from "../services/sendEmail.js";
import updateDB from "./updateDatabase.js";

export default async function checkingDiff(subjects, ispassed, db, DataLength) {
  return await new Promise(function (resolve, reject) {
    db.all("SELECT subject,passed FROM uni_grades", async function (err, rows) {
      if (err) {
        return reject(new Error("Parsing DB"));
      }

      try {
        //storing data that already exist in the database
        const previousSubject = rows.map((row) => row.subject);
        const previousPassed = rows.map((row) => row.passed);

        let subjectPassedindex;
        let newSubjectPassed = false;

        for (let i = 0; i < DataLength; i++) {
          //new data collected from the university website
          const currentSubject = subjects[i];
          const currentisPassed = ispassed[i] ? 1 : 0;

          const index = previousSubject.indexOf(currentSubject);

          //if difference exists, new subject is passed
          if (currentSubject === previousSubject[index]) {
            if (currentisPassed !== previousPassed[index]) {
              newSubjectPassed = true;
              subjectPassedindex = i;
              break;
            }
          }
        }

        await emailsend(subjects[subjectPassedindex], newSubjectPassed);
        await updateDB(subjects, ispassed, db, DataLength);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
