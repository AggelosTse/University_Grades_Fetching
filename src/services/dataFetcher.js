import connecttoDB from "../database/connectDB.js";



export default async function getData(fetchID) {
  try {

    //fetching grades data from university api
    const ditgradesURL = process.env.GRADES_API;
    const response = await fetch(ditgradesURL, {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${fetchID}`,
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/122.0",
        Referer: "https://classweb.uoi.gr/student/grades",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    if (!response.ok) {
      throw new Error("Fetching Grades");
    }

    const dataFile = await response.json();
    if (!Array.isArray(dataFile)) {
      throw new Error("Fetching Grades");
    }
    let subjects = [];
    let ispassed = [];

    
    for (let i = 0; i < dataFile.length; i++) {
      subjects.push(dataFile[i].title);
      ispassed.push(dataFile[i].isPassed);
    }

    await connecttoDB(subjects, ispassed, dataFile.length);
  } catch (error) {
    throw error;
  }
}
