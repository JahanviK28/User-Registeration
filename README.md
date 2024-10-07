# MERN User Registration Application

## Description

A MERN stack application that allows users to register with their personal information and profile picture. The application provides APIs for user registration, viewing user data, updating user data, and deleting users.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer
- **Frontend**: React.js, Axios, React Router
- **Others**: CORS

## Features

1. **User Registration**: Register with name, email, username, contact info, and profile picture.
2. **View Users**: Display a list of all registered users.
3. **Update User**: Update user information and profile picture.
4. **Delete User**: Remove a user from the database.

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** database (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

### Backend Setup

1. **Navigate to Backend Directory:**
   ```bash
   cd backend
2. **Install Dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables:** Create a .env file in the backend directory and add the following variables:
   ```bash
   PORT=5000
   MONGO_URI=<Your MongoDB URI>
4. **Run Backend Server:**
   ```bash
   npm start

### Frontend Setup

1. **Navigate to Frontend Directory:**
   ```bash
   cd frontend
2. **Install Dependencies:**
   ```bash
   npm install
3. **Configure Environment Variables** Create a .env file in the frontend directory if needed, or make sure the API base URL in your frontend code points to your backend server.
4. **Run Frontend Server:**
   ```bash
   npm start

### API Endpoints 
1. **Register User**
   - **Method**: POST
   - **URL:** /api/users/register
   - **Description:** Registers a new user with name, email, username, contact info, and profile picture.
2. **Get All Users**
   - **Method:** GET
   - **URL:** /api/users
   - **Description:** Fetches a list of all registered users.
3. **Update User**
   - **Method:** PUT
   - **URL:** /api/users/:id
   - **Description:** Updates the user information and profile picture.
4. **Delete User**
   - **Method:** DELETE
   - **URL:** /api/users/:id
   - **Description:** Deletes a user from the database.

### Running the Application
1. **Start the Backend:** Ensure MongoDB is running and the backend server is configured properly. Then, navigate to the backend folder and run the server:
   ```bash
   npm start
2. **Start the Frontend:** Navigate to the frontend folder and run the application:
   ```bash
   npm start
3. **Access the Application:** The frontend runs by default on http://localhost:3000 and the backend on http://localhost:5000.
