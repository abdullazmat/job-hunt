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
      requirements,
      position,
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
      requirements: requirements ? requirements.split(",") : [],
      company: companyId,
      location,
      salary: salary,
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
      .populate({ path: "applications" })
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
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

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
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
    });
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

// Controller for updating job by Admin
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const {
      title,
      description,
      companyId,
      location,
      salary,
      experienceLevel,
      jobType,
      requirements,
      position,
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

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.createdBy.toString() !== userId) {
      return res.status(401).json({
        message: "You are not authorized to update this job",
        success: false,
      });
    }

    job.title = title;
    job.description = description;
    job.requirements = requirements ? requirements.split(",") : [];
    job.company = companyId;
    job.location = location;
    job.salary = salary;
    job.experienceLevel = experienceLevel;
    job.jobType = jobType;
    job.position = position;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating job: ${error.message}`,
      success: false,
    });
  }
};

// Get Jobs by Company controller
export const getJobsByCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("Company ID", companyId);
    const jobs = await Job.find({ company: companyId });
    console.log("Jobs", jobs);
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

// Controller for deleting job by Admin
export const deleteJob = async (req, res) => {
  try {
    // Find the job by ID
    const job = await Job.findById(req.params.id);
    console.log("Job", job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const { company } = job;

    // Remove the job
    await Job.deleteOne({ _id: req.params.id });

    // Fetch updated list of companies for the user
    const jobs = await Job.find({ company });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error occurred while deleting job:", error);
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};
