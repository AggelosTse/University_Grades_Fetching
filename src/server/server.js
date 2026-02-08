import express from "express";
import getData from "../services/dataFetcher.js";
import getFreshCookie from "../services/getCookie.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "../../public")));

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
      await getData(freshID, email);
      res.status(200).json({
        type: "Success",
        message: "No errors occured!",
      });
    }
  } catch (error) {
    if (error.message === "Missing info") {
      return res.status(400).json({
        type: "Failure",
        error: "Missing input",
        message: "Some input is missing",
      });
    }

    if (error.message === "Invalid Credentials") {
      return res.status(500).json({
        type: "Failure",
        error: "Invalid DIT account or name",
        message: "Failed to login on DIT uoi",
      });
    }

    if (error.message === "Failed to fetch grades") {
      return res.status(502).json({
        type: "Failure",
        error: "Internal Server Error",
        message: "Failed to fetch grades",
      });
    }

    if (error.message === "Opening database") {
      return res.status(500).json({
        type: "Failure",
        error: "Database Open error",
        message: "Couldnt open datbase",
      });
    }
    if (error.message === "Finding JSESSID") {
      return res.status(500).json({
        type: "Failure",
        error: "JSESSID failed",
        message: "DIT login success, jsessid capture failed",
      });
    }
    if (error.message === "Fetching Grades") {
      return res.status(500).json({
        type: "Failure",
        error: "Fetching Grades",
        message: "Failed to fetch grades from DIT",
      });
    }

    if (error.message === "DB connection")
      return res.status(501).json({
        type: "Failure",
        error: "Database Connection",
        message: "Couldnt connect to database",
      });

    if (error.message === "Opening database")
      return res.status(501).json({
        type: "Failure",
        error: "Opening Database",
        message: "Couldnt open database",
      });

    if (error.message === "Prepare statement")
      return res.status(501).json({
        type: "Failure",
        error: "Prepare Statement",
        message: "Failed to prepare database insert statement",
      });

    if (error.message === "Finalize statement")
      return res.status(501).json({
        type: "Failure",
        error: "Finalize statement",
        message: "Failed to finilize database insert statement",
      });

    if (error.message === "Commit DB")
      return res.status(501).json({
        type: "Failure",
        error: "Commit Database",
        message: "Failed to Commit changed to database",
      });

    if (error.message === "Parsing DB")
      return res.status(501).json({
        type: "Failure",
        error: "Database parsing",
        message: "Failed to parse data from database",
      });

    if (error.message === "Send Email") {
      return res.status(501).json({
        type: "Failure",
        error: "Send Email",
        message: "Failed to send email.",
      });
    }
  }
});

app.listen(3000);
