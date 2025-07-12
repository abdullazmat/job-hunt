# Job Hunt - MERN Stack Application

A job listing platform built with the MERN stack, featuring user authentication, job post creation with image uploads, and secure backend integration.

[Job Hunt HomePage]("./frontend/public/Job*20Hunt.png")

## Features

- User authentication (register/login)
- Create, read, update, delete (CRUD) job listings
- Upload and manage company logos or images using Multer and Cloudinary
- REST API backend with Express.js and MongoDB
- Responsive frontend built with React
- Protected routes and JWT-based session management

## Tech Stack

### Frontend
- React
- Axios for HTTP requests
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file handling
- Cloudinary for image hosting
- dotenv for environment configuration
- CORS and Helmet for security


## Getting Started (Development)

### Prerequisites
- Node.js v16+
- MongoDB Atlas or local MongoDB
- Cloudinary account
- Render or similar for deployment (optional)

### Backend Setup

```bash
cd backend
npm install

# .env file example:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev

