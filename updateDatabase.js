export default function updateDB(subjects, ispassed, db, dataLength) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      db.run('DELETE FROM uni_grades');

        const insert = db.prepare(
          'INSERT INTO uni_grades (subject, passed) VALUES (?, ?)'
        );

        for (let i = 0; i < dataLength; i++) {
          insert.run(subjects[i], ispassed[i]);
        }
        insert.finalize(); 
        
        
        db.run('COMMIT', (err) => {
            if (err) {
              console.error("error in commit:", err);
              db.run('ROLLBACK'); // Ακύρωση αν κάτι πήγε στραβά
              return reject(err);
            }
            console.log("Database updated successfully");
            resolve(); 
          });
    });
  });
}
