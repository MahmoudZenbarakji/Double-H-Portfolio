const Project = require('../Models/project.schema');

// ==============================
// Create Project (with images)
// ==============================
const createProject = async (req, res) => {
    try {
        const { name, description, date, link } = req.body;

        const images = req.files?.map(
            file => file.path
        ) || [];

        const project = await Project.create({
            name,
            description,
            date,
            link,
            images,
        });

        return res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project.toObject(),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error.message,
        });
    }
};

// ==============================
// Get All Projects
// ==============================
const getProjects = async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
  
      // Ensure images array exists for each project
      const safeProjects = projects.map(p => ({
        ...p.toObject(),
        images: p.images || [],
      }));
  
      return res.status(200).json({
        success: true,
        count: safeProjects.length,
        data: safeProjects,
      });
    } catch (error) {
      console.error('Get Projects Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch projects',
        error: process.env.NODE_ENV === 'production' ? undefined : error.message,
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
                message: 'Project not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: project.toObject(),
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid project ID',
            error: error.message,
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
            {
                new: true,
                runValidators: true,
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project.toObject(),
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to update project',
            error: error.message,
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
                message: 'Project not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to delete project',
            error: error.message,
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
