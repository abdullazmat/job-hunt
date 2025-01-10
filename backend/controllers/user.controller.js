import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
dotenv.config();

// User Registration controller
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body; // Check if all fields are provided
    if (!fullName || !email || !password || !role || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email }); // Check if email is unique
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    await User.create({
      // Create new user in database
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error: ${error.message}`, success: false });
  }
};

// User Login controller

// Check if all fields are provided
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if email excists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }

    // Check if password matches the bcrypted passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }

    // Check if role matches
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    // Sign the token data and generate the token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Create the user object
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    // Send the token in the HTTP-only cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 86400000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error: ${error.message}`, success: false });
  }
};

// User Logout controller
export const logout = async (req, res) => {
  try {
    return (
      res
        .status(200)
        // Clear the cookie
        .cookie("token", "", {
          maxAge: 0,
        })
        .json({ message: "Logged out successfully", success: true })
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error: ${error.message}`, success: false });
  }
};

// Update User Profile controller
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    // Check if user is authenticated and retrieve user from DB
    const userId = req.id; // Middleware Authenticated user id
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // File upload handling (if a file is provided)
    if (req.file) {
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto", // Supports both images and other file types
      });

      // Update resume in user profile
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    // Handle skills if provided
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Update user fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Save updated user to database
    await user.save();

    // Create a clean response object
    const responseUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: responseUser,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error: ${error.message}`, success: false });
  }
};
