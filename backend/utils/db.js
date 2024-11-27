import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
// The connectDB function is an asynchronous function that connects to the MongoDB database using the MONGO_URI environment variable. If the connection is successful, it logs "MongoDB connected successfully" to the console. If there is an error, it logs the error message to the console.
