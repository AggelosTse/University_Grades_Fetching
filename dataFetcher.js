import connectDB from "./connectDB.js";

export default async function getData(semester,fetchID) {
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
    let subjects1 = [];
    let ispassed1 = [];

    for(let i=0;i<dataFile.length;i++)
    {
        subjects1.push(dataFile[i].title);
        ispassed1.push(dataFile[i].isPassed);
    }

    await connectDB(subjects1,ispassed1,dataFile.length);

    const subjects = [];
    const ispassed = [];

    for(let i=0;i<dataFile.length;i++)
    {
        if(dataFile[i].studentSemester === semester)
        {
            subjects.push(dataFile[i].title);
            ispassed.push(dataFile[i].isPassed);
        }
    }

    const arrayOfObjects = [];
    
    let i=0;

    while(i<subjects.length) {
        const tempjson = {
            subject : subjects[i],
            ispassed : ispassed[i]
        }

        arrayOfObjects.push(tempjson);
        console.log(arrayOfObjects);
        i++;
    }
    

    return arrayOfObjects; 
}
