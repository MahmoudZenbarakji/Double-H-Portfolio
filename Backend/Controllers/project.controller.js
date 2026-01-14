const Project = require("../Models/project.schema");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// ==============================
// Create Project
// ==============================
const createProject = async (req, res) => {
  try {
    const { name, description, date, link } = req.body;

    const uploads = req.files
      ? await Promise.all(
          req.files.map(file =>
            uploadToCloudinary(file.buffer, "projects")
          )
        )
      : [];

    const images = uploads.map(u => u.secure_url);

    const project = await Project.create({
      name,
      description,
      date,
      link,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// ==============================
// Get Projects
// ==============================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects.map(p => p.toObject()),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// ==============================
// Get Project By ID
// ==============================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project.toObject(),
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }
};

// ==============================
// Update Project
// ==============================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project.toObject(),
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// ==============================
// Delete Project
// ==============================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
