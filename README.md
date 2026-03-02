# University Grades Fetching Automation

A university grades fetching project built with Express.js and SQLite.

---

## Features

-  Secure login automation using Puppeteer  
-  Automatic grade fetching from university portal  
-  Scheduled execution every 1 hour (Cron job)  
-  Persistent storage using SQLite  
-  Email notification when a subject is passed  
-  Hosted on AWS server  
-  Continuous background execution with PM2  

---

## Tech Stack

- **Node.js**
- **Express.js**
- **SQLite**
- **Puppeteer** (web scraping & session automation)
- **Nodemailer** (email notifications)
- **node-cron** (task scheduling)
- **AWS EC2** (deployment)
- **PM2** (process manager for uptime & reliability)
- 
---

## Deployment

The application is:

- Deployed on an **AWS EC2 server**
- Managed using **PM2** to ensure:
  - Automatic restarts on crash
  - Background execution
  - Log management
  - High availability

---

## NOTE: IT ONLY WORKS FOR MY PERSONAL UNIVERSITY ACCOUNT
