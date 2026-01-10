const express = require('express');
const router = express.Router();

const {
    getHeroImages,
    addHeroImage,
    updateHeroImage,
    deleteHeroImage,
} = require('../controllers/hero.controller');

const uploadHeroImage = require('../middleware/heroUpload');

// ==============================
// Public Routes
// ==============================

// Get all hero images
router.get('/', getHeroImages);

// ==============================
// Admin Routes
// ==============================

// Add hero image(s) - supports multiple uploads
router.post('/', uploadHeroImage.array('images', 10), addHeroImage);

// Update hero image
router.put('/:id', uploadHeroImage.single('image'), updateHeroImage);

// Delete hero image
router.delete('/:id', deleteHeroImage);

module.exports = router;
