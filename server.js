import express from "express";
import getData from "./dataFetcher.js";
import getFreshCookie from "./getCookie.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/fetch-grades", async (req, res) => {
  try {
    const username = req.body.userName;
    const password = req.body.userPassword;
    const email = req.body.userEmail;

    if (!username || !password || !email) {
      throw new Error("Missing info");
    }
 
    const freshID = await getFreshCookie(`${username}`, `${password}`);

    if (freshID) {
      const data = await getData(freshID, email);
      res.json(data);
    }
  } catch (error) {
    if (error.message === "Missing info") {
      return res.status(400).json({
        error: "Missing input",
        message: "Some input is missing",
      });
    }

    if (error.message === "Failed to fetch grades") {
      return res.status(502).json({
        error: "Internal Server Error",
        message: "Failed to fetch grades",
      });
    }

    if (error.message === "Opening database") {
      return res.status(500).json({
        error: "Database Open error",
        message: "Couldnt open datbase",
      });
    }
    if (error.message === "Finding JSESSID") {
      return res.status(500).json({
        error: "JSESSID failed",
        message: "DIT login success, jsessid capture failed",
      });
    }
    if (error.message === "Fetching Grades") {
      return res.status(500).json({
        error: "Fetching Grades",
        message: "Failed to fetch grades from DIT",
      });
    }

    if (error.message === "DB connection")
      return res.status(501).json({
        error: "Database Connection",
        message: "Couldnt connect to database",
      });

    if (error.message === "Opening database")
      return res.status(501).json({
        error: "Opening Database",
        message: "Couldnt open database",
      });

    if (error.message === "Prepare statement")
      return res.status(501).json({
        error: "Prepare Statement",
        message: "Failed to prepare database insert statement",
      });

    if (error.message === "Finalize statement")
      return res.status(501).json({
        error: "Finalize statement",
        message: "Failed to finilize database insert statement",
      });

    if (error.message === "Commit DB")
      return res.status(501).json({
        error: "Commit Database",
        message: "Failed to Commit changed to database",
      });

    if (error.message === "Parsing DB")
      return res.status(501).json({
        error: "Database parsing",
        message: "Failed to parse data from database",
      });
  }
});

app.listen(3000);
