import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getJobsByAdmin,
  updateJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminJobs").get(isAuthenticated, getJobsByAdmin);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;
