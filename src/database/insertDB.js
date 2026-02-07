export default async function insertData(subjects, ispassed, db, dataLength) {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      let insert;

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
          reject(new Error("Finalize statement"));
        } else {
          resolve();
        }
      });
    });
  });
}
