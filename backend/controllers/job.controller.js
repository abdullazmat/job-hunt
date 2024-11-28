import { Job } from "../models/job.model.js";

// Controller for creating a job by Recruiter
export const postJob = async (req, res) => {
  try {
    const userId = req.id;
    const {
      title,
      description,
      companyId,
      location,
      salary,
      experienceLevel,
      jobType,
      position,
      requirements,
    } = req.body;
    if (
      !title ||
      !description ||
      !companyId ||
      !location ||
      !salary ||
      !experienceLevel ||
      !jobType ||
      !position ||
      !requirements
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      company: companyId,
      location,
      salary: Number(salary),
      experienceLevel: experienceLevel,
      jobType,
      position,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in creating job: ${error.message}`,
      success: false,
    });
  }
};

// Controller for getting all jobs by Student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in getting jobs: ${error.message}`,
      success: false,
    });
  }
};

// Controller for getting job by Id For Student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in getting job: ${error.message}`,
      success: false,
    });
  }
};

// Controller for admin to get all jobs posted by him
export const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in getting jobs: ${error.message}`,
      success: false,
    });
  }
};
