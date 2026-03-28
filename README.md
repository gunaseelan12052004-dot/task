# React Node.js Login Application

## Project Overview and Features
This is a full-stack web application featuring a modern, premium login page. The project is separated into a React frontend and a Node.js backend.
Features include:
- Premium Glassmorphism UI
- Responsive design using Bootstrap 5
- REST API backend for user authentication
- MySQL Database integration for storing user credentials

## Tech Stack Used
- **Frontend**: React, TypeScript, Vite, Bootstrap 5, Bootstrap Icons, CSS (Custom Glassmorphism styling)
- **Backend**: Node.js, Express, TypeScript, CORS, MySQL2, Dotenv
- **Database**: MySQL

## Step-by-step Setup and Run Instructions

### Prerequisites
- Node.js installed
- MySQL Server installed and running

### 1. Database Setup
1. Open your MySQL client and run the following command to create the database:
   ```sql
   CREATE DATABASE auth_db;
   ```
2. Execute the table creation script (see Database Schema below).
3. Insert a test user:
   ```sql
   INSERT INTO users (email, password, name) VALUES ('admin@example.com', 'admin123', 'Admin User');
   ```

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root based on the `.env.example` file and configure your database credentials.
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   (The server will start on http://localhost:3001)

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   (The client will start on http://localhost:5173)

## Database Schema / Migration Steps
The application requires a `users` table. Run the following SQL to set up the schema:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoint Documentation

### Base URL: `http://localhost:3001`

### 1. Health Check
- **Route**: `/api/health`
- **Method**: `GET`
- **Description**: Verifies if the backend is running.
- **Request**: None
- **Response**: 
  ```json
  {
    "status": "ok",
    "message": "Backend is running"
  }
  ```

### 2. User Login
- **Route**: `/api/login`
- **Method**: `POST`
- **Description**: Authenticates a user with email and password.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "User Name"
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

## Environment Variable Reference
See `server/.env.example` for the required environment variables:
```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_db
```
