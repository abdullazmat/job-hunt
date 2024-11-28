import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Check User Authentication
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

export default isAuthenticated;
