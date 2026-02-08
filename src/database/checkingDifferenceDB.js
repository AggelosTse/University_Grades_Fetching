import emailsend from "../services/sendEmail.js";
import updateDB from "./updateDatabase.js";

export default async function checkingDiff(
  subjects,
  ispassed,
  db,
  DataLength,
  email
) {
  return await new Promise(function (resolve, reject) {
    db.all("SELECT subject,passed FROM uni_grades", async function(err, rows){
      if (err) {
        return reject(new Error("Parsing DB"));
      }

      try {
        const previousSubject = rows.map((row) => row.subject);
        const previousPassed = rows.map((row) => row.passed);

        let subjectPassedindex;
        let newSubjectPassed = false;

        for (let i = 0; i < DataLength; i++) {
          const currentSubject = subjects[i];
          const currentisPassed = ispassed[i] ? 1 : 0;

          const index = previousSubject.indexOf(currentSubject);

          if (currentSubject === previousSubject[index]) {
            if (currentisPassed !== previousPassed[index]) {
              newSubjectPassed = true;
              subjectPassedindex = i;
              break;
            }
          }
        }

        await emailsend(subjects[subjectPassedindex], newSubjectPassed, email);
        await updateDB(subjects, ispassed, db, DataLength, email);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
