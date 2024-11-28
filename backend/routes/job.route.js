import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getJobsByAdmin,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminJobs").get(isAuthenticated, getJobsByAdmin);

export default router;
