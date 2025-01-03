import express from "express";
import {
  register,
  updateProfile,
  login,
  logout,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/signup").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .put(isAuthenticated, singleUpload, updateProfile);

export default router;
