import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getJobsByAdmin,
  updateJob,
  getJobsByCompany,
  deleteJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminJobs").get(isAuthenticated, getJobsByAdmin);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/get/jobs/company/:id").get(isAuthenticated, getJobsByCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);
export default router;
