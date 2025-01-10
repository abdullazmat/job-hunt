import express from "express";
import {
  registerComapny,
  getCompanyByUser,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerComapny);
router.route("/get").get(isAuthenticated, getCompanyByUser);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

export default router;
