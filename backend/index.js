import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
import userRoutes from "./routes/user.route.js";

const app = express();

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "This is the home page",
    success: true,
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
