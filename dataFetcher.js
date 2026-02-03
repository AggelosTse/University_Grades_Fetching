export default async function getData(semester) {
    const response = await fetch('https://classweb.uoi.gr/feign/student/grades/diploma', {
      method: 'GET',
      headers: {
        
                "Cookie": "JSESSIONID= PRIVATE INFO", 
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/122.0",
                "Referer": "https://classweb.uoi.gr/student/grades/list_diploma?p=ECC5DCC9-A5C9-4BEB-B553-84D0EB563432661E37A9-E4F2-4F57-BCBD-6AA016CEDEFF",
                "X-Requested-With": "XMLHttpRequest"
      },
    
    });
    if (!response.ok) {
        return [];
    }

    const dataFile = await response.json();
  
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
