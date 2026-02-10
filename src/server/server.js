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

app.post("/startAutomation", limiter, async function (req, res) {
  if (!crontask) {
    try {
      crontask = cron.schedule("*0 * * * *", async () => {
        const ditname = process.env.ditusername;
        const ditpass = process.env.ditpassword;
        const email = process.env.email;

        const freshID = await getFreshCookie(ditname, ditpass);

        if (freshID) {
          await getData(freshID, email);
        }
      });
      res.status(200).json({
        message: "Automation started successfully",
      });
    } catch (error) {
      return res.status(501).json({
        type: "Failure",
        message: "Failed to schedule automation.",
      });
    }
  } else {
    return res.status(400).json({
      type: "Info",
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
