# ERP System Setup and Run Instructions

This ERP system project consists of a frontend built with Angular and a backend powered by Express.js and PostgreSQL. Below are the steps to get both parts of the system up and running.



## Project Members
Anan Mingmitpattanakul 1660706688 - frontend / backend

## Prerequisites

- **Node.js** and **npm** installed (for both frontend and backend)
- **PostgreSQL** installed
- **Angular CLI** installed (`npm install -g @angular/cli`)

## 1. Setup PostgreSQL

1. **Install PostgreSQL**: Make sure PostgreSQL is installed. You can download it from [here](https://www.postgresql.org/download/).
   
2. **Create the ERP Database**:
   Since PostgreSQL does not support `CREATE IF NOT EXISTS` for databases, the ERP database must be created manually.
   
   - Open PostgreSQL terminal or your preferred PostgreSQL client (e.g., pgAdmin).
   - Run the following SQL command to create the ERP database:

   ```sql
   CREATE DATABASE erp;
   ```

   - Replace `erp` with your desired database name.

3. **Configure the Database Connection**:
   - Ensure that your PostgreSQL server is running.
   - Update your backend configuration (typically in `config` or `app.js`) with the correct database credentials: host, user, password, and database name.

## 2. Running the Frontend (Angular)

1. **Go to the root directory of your project** (where both frontend and backend folders are located):
   
   ```bash
   cd your_project_directory
   ```

2. Install the required dependencies for the frontend:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   ng serve
   ```

   - The frontend will be available at `http://localhost:4200` by default.

## 3. Running the Backend (Express.js)

1. **Navigate to the backend folder** (located in the root of your project):

   ```bash
   cd backend
   ```

2. Install the required dependencies for the backend:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node app.js
   ```

   - The backend will run on `http://localhost:3000` (or whichever port is configured in `app.js`).

## 4. Accessing the ERP System

- Once both the frontend and backend are running, you can access the ERP system by opening the frontend in your browser:

  ```
  http://localhost:4200
  ```

- The frontend will interact with the backend at:

  ```
  http://localhost:3000
  ```

---

### Notes:

- **PostgreSQL Database Creation**: The ERP database needs to be created manually since PostgreSQL doesn't support `CREATE IF NOT EXISTS` for databases.
- **Backend Configuration**: Ensure the database credentials are correctly set in the backend configuration (e.g., `app.js`).
- **Dependencies**: Make sure both frontend and backend have their respective `node_modules` installed. If you encounter any issues, run `npm install` again in both directories.

---
