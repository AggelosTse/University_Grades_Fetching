export default function updateDB(subjects, ispassed, db, dataLength) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      db.run("BEGIN TRANSACTION");

      //remove old data from database
      db.run("DELETE FROM uni_grades");

      let insert;

      //add new data 

      try {
        insert = db.prepare(
          "INSERT INTO uni_grades (subject, passed) VALUES (?, ?)"
        );
      } catch (error) {
        return reject(new Error("Prepare statement"));
      }

      for (let i = 0; i < dataLength; i++) {
        insert.run(subjects[i], ispassed[i]);
      }

      insert.finalize(function (err) {
        if (err) {
          return reject(new Error("Finalize statement"));
        }
      });
      

      db.run("COMMIT", (err) => {
        if (err) {
          console.error("error in commit:", err);
          db.run("ROLLBACK");
          return reject(new Error("Commit DB"));
        }
        console.log("Database updated successfully");
        resolve();
      });
    });
  });
}
