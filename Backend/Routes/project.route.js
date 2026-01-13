const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/project.controller');

const uploadProjectImages = require('../middleware/uploads');

// ==============================
// Public Routes
// ==============================

// Get all projects
router.get('/', getProjects);

// Get project by ID
router.get('/:id', getProjectById);

// ==============================
// Admin Routes
// ==============================

// Create project (upload multiple images)
router.post(
    '/',
    uploadProjectImages.array('images', 10),
    createProject
);

// Update project
router.put('/:id', updateProject);

// Delete project
router.delete('/:id', deleteProject);

module.exports = router;
