import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { Job } from "../models/job.model.js";

// Company Registration controller
export const registerComapny = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company Name already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

// Get Companies created by a user controller
export const getCompanyByUser = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies Not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

// Get Company by ID controller
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

// Update Company controller
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      company.logo = cloudResponse.secure_url;
    }

    company.name = name || company.name;
    company.description = description || company.description;
    company.website = website || company.website;
    company.location = location || company.location;

    await company.save();

    return res.status(200).json({
      success: true,
      company,
      message: "Company information updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};

// Delete Company controller
export const deleteCompany = async (req, res) => {
  try {
    // Find the company by ID
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    const { userId } = company;

    // Remove the company
    await Company.deleteOne({ _id: req.params.id });

    // Fetch updated list of companies for the user
    const companies = await Company.find({ userId });
    if (companies.length === 0) {
      return res.status(200).json({
        message: "Deleted. No more companies registered",
        success: true,
      });
    }
    if (companies.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Company deleted successfully",
        companies,
      });
    }
  } catch (error) {
    console.error("Error occurred while deleting company:", error);
    return res.status(500).json({
      message: `Error: ${error.message}`,
      success: false,
    });
  }
};
