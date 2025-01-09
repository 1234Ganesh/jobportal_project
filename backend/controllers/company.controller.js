const { Company } = require("../models/company.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

exports.registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "'Comapny name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't add register same company",
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
    console.log(error);
  }
};

exports.getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(201).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get compnay by id
exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not exist",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    let logo;
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    // Prepare the update data
    const updateData = { name, description, website, location };
    if (logo) {
      updateData.logo = logo; // Add logo only if a new file was uploaded
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error in updateCompany:", error.message, error.stack);
    res.status(500).json({
      message: "An error occurred while updating the company.",
      error: error.message,
      success: false,
    });
  }
};
