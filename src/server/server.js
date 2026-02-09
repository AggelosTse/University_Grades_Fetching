import express from "express";
import getData from "../services/dataFetcher.js";
import getFreshCookie from "../services/getCookie.js";

import { fileURLToPath } from "url";
import path from "path";

import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: "Too many requests, please try again later."
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../../hidden.env") });


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));
app.use("/fetch-grades", limiter);



app.post("/fetch-grades", async (req, res) => {
  try {
    const username = req.body.userName;
    const password = req.body.userPassword;
    const email = req.body.userEmail;

    if (!username || !password || !email) {
      throw new Error("Missing info");
    }
    if (!email.includes("@")) throw new Error("Email type");
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
    } else if (error.message === "Invalid Credentials") {
      return res.status(500).json({
        type: "Failure",
        error: "Invalid DIT account or name",
        message: "Failed to login on DIT uoi",
      });
    } else if (error.message === "Failed to fetch grades") {
      return res.status(502).json({
        type: "Failure",
        error: "Internal Server Error",
        message: "Failed to fetch grades",
      });
    } else if (error.message === "Opening database") {
      return res.status(500).json({
        type: "Failure",
        error: "Database Open error",
        message: "Couldnt open datbase",
      });
    } else if (error.message === "Finding JSESSID") {
      return res.status(500).json({
        type: "Failure",
        error: "JSESSID failed",
        message: "DIT login success, jsessid capture failed",
      });
    } else if (error.message === "Fetching Grades") {
      return res.status(500).json({
        type: "Failure",
        error: "Fetching Grades",
        message: "Failed to fetch grades from DIT",
      });
    } else if (error.message === "DB connection")
      return res.status(501).json({
        type: "Failure",
        error: "Database Connection",
        message: "Couldnt connect to database",
      });
    else if (error.message === "Opening database")
      return res.status(501).json({
        type: "Failure",
        error: "Opening Database",
        message: "Couldnt open database",
      });
    else if (error.message === "Prepare statement")
      return res.status(501).json({
        type: "Failure",
        error: "Prepare Statement",
        message: "Failed to prepare database insert statement",
      });
    else if (error.message === "Finalize statement")
      return res.status(501).json({
        type: "Failure",
        error: "Finalize statement",
        message: "Failed to finilize database insert statement",
      });
    else if (error.message === "Commit DB")
      return res.status(501).json({
        type: "Failure",
        error: "Commit Database",
        message: "Failed to Commit changed to database",
      });
    else if (error.message === "Parsing DB")
      return res.status(501).json({
        type: "Failure",
        error: "Database parsing",
        message: "Failed to parse data from database",
      });
    else if (error.message === "Send Email") {
      return res.status(501).json({
        type: "Failure",
        error: "Send Email",
        message: "Failed to send email.",
      });
    }
    else if((error.message === "Email type")){
      return res.status(501).json({
        type: "Failure",
        error: "Invalid Email type",
        message: "Please use @",
      });
    } 
    else {
      return res.status(501).json({
        type: "Failure",
        error: "Unexpected Error",
        message: "Unexpected error occured",
      });
    }
  }
});

app.listen(port);
