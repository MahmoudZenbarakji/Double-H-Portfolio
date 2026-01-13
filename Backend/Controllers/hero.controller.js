const Hero =  require("../Models/heroSection") 
const fs = require('fs');
const path = require('path');

// ==============================
// Get Hero Section Images
// ==============================
const getHeroImages = async (req, res) => {
    try {
        const heroImages = await Hero.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: heroImages.length,
            data: heroImages,
        });
    } catch (error) {
        console.error('Get hero images error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch hero images',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};

// ==============================
// Add Hero Section Image(s)
// ==============================
const addHeroImage = async (req, res) => {
    try {
        // Support both single file (req.file) and multiple files (req.files)
        const files = req.files || (req.file ? [req.file] : []);

        if (files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image',
            });
        }

        // Create multiple hero image documents
        const heroImages = await Promise.all(
            files.map(file => {
                const imagePath = `/uploads/hero/${file.filename}`;
                return Hero.create({
                    images: imagePath,
                });
            })
        );

        return res.status(201).json({
            success: true,
            message: files.length === 1 
                ? 'Hero image added successfully' 
                : `${files.length} hero images added successfully`,
            data: heroImages,
            count: heroImages.length,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add hero image(s)',
            error: error.message,
        });
    }
};

// ==============================
// Update Hero Section Image
// ==============================
const updateHeroImage = async (req, res) => {
    try {
        const heroImage = await Hero.findById(req.params.id);

        if (!heroImage) {
            return res.status(404).json({
                success: false,
                message: 'Hero image not found',
            });
        }

        // If new image is uploaded, delete old image
        if (req.file) {
            // Remove leading slash and join with project root
            const oldImagePath = path.join(__dirname, '..', heroImage.images.replace(/^\//, ''));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            heroImage.images = `/uploads/hero/${req.file.filename}`;
            await heroImage.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Hero image updated successfully',
            data: heroImage,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to update hero image',
            error: error.message,
        });
    }
};

// ==============================
// Delete Hero Section Image
// ==============================
const deleteHeroImage = async (req, res) => {
    try {
        const heroImage = await Hero.findById(req.params.id);

        if (!heroImage) {
            return res.status(404).json({
                success: false,
                message: 'Hero image not found',
            });
        }

        // Delete the image file
        // Remove leading slash and join with project root
        const imagePath = path.join(__dirname, '..', heroImage.images.replace(/^\//, ''));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Hero.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Hero image deleted successfully',
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to delete hero image',
            error: error.message,
        });
    }
};

module.exports = {
    getHeroImages,
    addHeroImage,
    updateHeroImage,
    deleteHeroImage,
};
