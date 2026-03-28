# Alphagnito Admin Dashboard

This is a full-stack React + Node.js application featuring Authentication, an Administrative Dashboard, and a fully functional Agents Management module.

## Features
- **Premium UI/UX**: Pixel-perfect aesthetic styles using a modern color palette, custom glassmorphism, and responsive components.
- **Authentication**: Secure Login and Registration system with password hashing.
- **Admin Dashboard**: Overview widgets, quick actions, and data metrics.
- **Agents Management**: Complete CRUD operations for real estate agents. Features include dynamic real-time status filtering, add/edit modal forms, and paginated data tables.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Bootstrap 5 (CSS & Icons), Custom CSS.
- **Backend**: Node.js, Express, TypeScript, CORS, MySQL2, Bcryptjs.
- **Database**: MySQL.

---

## Step-by-Step Setup Guide

Follow these exact steps to run the application on your local machine.

### Prerequisites
- Extract the project folder anywhere on your computer.
- **Node.js** installed (v16 or higher).
- **MySQL Server** installed and running (e.g., via XAMPP, WAMP, or standalone).

### Step 1: Database Setup (MySQL)
First, you need to create the database and the required tables to store Users and Agents.

1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or your terminal).
2. Execute the following SQL commands:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS uth_db;
USE uth_db;

-- Create Users table (for Login/Registration)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  conform_password VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Agents table (for the Dashboard page)
CREATE TABLE agents (
    agent_id INT PRIMARY KEY AUTO_INCREMENT,
    agent_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    properties_count INT DEFAULT 0,
    inspections_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    join_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Backend Setup (Server)
1. Open a terminal (Command Prompt, PowerShell, or VS Code terminal).
2. Navigate into the `server` directory:
   ```bash
   cd server
   ```
3. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
4. Configure your environment variables. Create a file named `.env` inside the `server` folder, and enter your exact MySQL credentials:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password  # Leave this blank if your local root uses no password
   DB_NAME=uth_db
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *(You should see a message saying "Server is running on http://localhost:3001")*

### Step 3: Frontend Setup (Client)
1. Open a **new, separate terminal window** (do not close the backend server terminal).
2. Navigate into the `client` directory:
   ```bash
   cd client
   ```
3. Install the essential React dependencies:
   ```bash
   npm install
   ```
4. Start the Frontend Vite development server:
   ```bash
   npm run dev
   ```
   *(You should see an output with a local URL, typically `http://localhost:5173`. Hold CTRL and click the link to open it in your browser.)*

---

## Usage Instructions
1. When the app opens in your browser, click **Sign Up** to create a new user account.
2. Enter your details and submit. 
3. **Log In** with the email and password you just created.
4. You will be redirected to the secure **Admin Dashboard**.
5. Use the sidebar to navigate to the **Agents** tab where you can Add, Edit, and Delete real data that connects straight to your MySQL backend!
