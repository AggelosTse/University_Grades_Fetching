export default async function insertData(subjects,ispassed,db,dataLength,email)
{
    
    const insert = db.prepare('INSERT INTO uni_grades (subject, passed) VALUES (?, ?)');

    for(let i=0;i<dataLength;i++) {

        insert.run(subjects[i], ispassed[i]);
    }
    insert.finalize();
    console.log("success");
    
}




