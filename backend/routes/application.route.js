import express from "express";
import {
  applyJob,
  getApplications,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/applicants/:id").get(isAuthenticated, getApplications);
router
  .route("/status/update/:id")
  .put(isAuthenticated, updateApplicationStatus);

export default router;