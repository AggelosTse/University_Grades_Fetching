import connecttoDB from "./connectDB.js";

export default async function getData(fetchID,email) {
    const response = await fetch('https://classweb.uoi.gr/feign/student/grades/diploma', {
      method: 'GET',
      headers: {
        
                "Cookie": `JSESSIONID=${fetchID}`, 
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/122.0",
                "Referer": "https://classweb.uoi.gr/student/grades",
                "X-Requested-With": "XMLHttpRequest"
      },
    
    });
    if (!response.ok) {
        return [];
    }

    const dataFile = await response.json();
    let subjects = [];
    let ispassed = [];

    for(let i=0;i<dataFile.length;i++)
    {
        subjects.push(dataFile[i].title);
        ispassed.push(dataFile[i].isPassed);
        //console.log(`index: ${i}, subject: ${subjects[i]}, ispassed: ${ispassed[i]}`);
    }

    await connecttoDB(subjects,ispassed,dataFile.length, email);

   


}
