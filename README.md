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

## How to Use

Follow these steps to configure, run, and host the automation script for your own account.

### 1. Prerequisites
Ensure you have Node.js installed, then clone the repository and install the required core dependencies (including `sqlite3`, `puppeteer`, `nodemailer`, and `node-cron`):

```bash
npm install
```

### 2. Configuration (`hidden.env`)
Add your data in the file named `hidden.env` in the **root directory** of the project. This file stores your private university credentials and email authentication data. 

Populate it with your details exactly as shown below:

```text
PORT=3000
DB_PATH=../../grades.db
LOGIN_URL=https://classweb.uoi.gr/login

# Your University Portal Credentials
ditusername="YOUR_UOI_USERNAME"
ditpassword="YOUR_UOI_PASSWORD"

# Email Configuration (Nodemailer)
EMAIL_ADMIN="YOUR_GMAIL_ADDRESS@gmail.com"
EMAIL_PASS="XXXX XXXX XXXX XXXX"
EMAIL_USER="RECEIVER_EMAIL_ADDRESS@gmail.com"

> 🔴 **IMPORTANT: CRITICAL SECURITY STEP**
> **DO NOT** use your actual Gmail password for `EMAIL_PASS`. 
> You **must** generate and use a **Google App Password** instead.
```
### 3. Local Execution (Development Mode)
To launch the Express server manually and monitor its execution in your active terminal session:

```bash
# Navigate to the server folder
cd src/server

# Start the application using Node.js
node server.js

# Open a browser and type in URL
http://localhost:3000

# Click "Start Automation"
