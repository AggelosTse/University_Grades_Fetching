import express from "express";
import getData from "../services/dataFetcher.js";
import getFreshCookie from "../services/getCookie.js";

import cron from "node-cron";

import { fileURLToPath } from "url";
import path from "path";

import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../hidden.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));
app.use("/startAutomation", limiter);
app.use("/stopAutomation", limiter);

let crontask = null;

app.post("/startAutomation", async function (req, res) {
  if (!crontask) {
    try {
      const freshID = await getFreshCookie();
      if (freshID) await getData(freshID);
      crontask = cron.schedule("*0 * * * *", async function () {
        try {
          const freshID = await getFreshCookie();
          if (freshID) await getData(freshID);
        } catch (cronErr) {
          console.error("Background Cron Error:", cronErr.message);
        }
      });

      res.status(200).json({
        message: "Automation started successfully",
      });
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
      } else if (error.message === "Email type") {
        return res.status(501).json({
          type: "Failure",
          error: "Invalid Email type",
          message: "Please use @",
        });
      } else if (error.message === "Delete DB data") {
        return res.status(501).json({
          type: "Failure",
          error: "Failed to delete data",
          message: "For updating the db",
        });
      } else {
        return res.status(501).json({
          type: "Failure",
          error: "Unexpected Error",
          message: "Unexpected error occured",
        });
      }
    }
  } else {
    return res.status(400).json({
      type: "Failure",
      message: "Automation is already active.",
    });
  }
});

app.post("/stopAutomation", async function (req, res) {
  if (crontask) {
    try {
      crontask.stop();
      crontask = null;
    } catch (error) {
      return res.status(501).json({
        type: "Failure",
        error: "Unexpected Error",
        message: "Unexpected error occured",
      });
    }
    res.status(200).json({
      type: "Success",
      message: "Successfully stopped automation",
    });
  } else {
    return res.status(501).json({
      type: "Failure",
      error: "No active automation",
      message: "Automation is already inactive",
    });
  }
});
app.listen(port);
