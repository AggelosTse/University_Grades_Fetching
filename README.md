# 🎓 University Grades Fetching Automation

A university grades fetching project built with Express.js and SQLite.

This application automatically fetches university grade data every 1 hour, stores them in a database, and sends email notifications when a subject is successfully passed.

It is made purposely only for my university account.

---

## 🚀 Features

- Fetches university grades automatically  
- Runs every 1 hour after clicking "Start Automation"
- Stores all fetched data in a SQLite database  
- Sends email notification when a subject is passed  
- Continuous background automation  

---

## 🛠 Tech Stack

- Node.js
- Express.js
- SQLite
- Nodemailer (for email notifications)
- Cron/Scheduler for hourly automation
- Hosted in AWS server
- Pupeteer for my university web scrape (for account validation)
