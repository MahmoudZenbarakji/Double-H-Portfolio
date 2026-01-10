const Partners = require('../models/partners');

// ==============================
// Create Partner (with image)
// ==============================
const createPartner = async (req, res) => {
    try {
        const { name } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Partner image is required',
            });
        }

        const image = `/uploads/partners/${req.file.filename}`;

        const partner = await Partners.create({
            name,
            image,
        });

        return res.status(201).json({
            success: true,
            message: 'Partner created successfully',
            data: partner,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create partner',
            error: error.message,
        });
    }
};

// ==============================
// Get All Partners
// ==============================
const getPartners = async (req, res) => {
    try {
        const partners = await Partners.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: partners.length,
            data: partners,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch partners',
            error: error.message,
        });
    }
};

// ==============================
// Get Partner By ID
// ==============================
const getPartnerById = async (req, res) => {
    try {
        const partner = await Partners.findById(req.params.id);

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: partner,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid partner ID',
            error: error.message,
        });
    }
};

// ==============================
// Update Partner
// ==============================
const updatePartner = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // If a new image is uploaded, update the image path
        if (req.file) {
            updateData.image = `/uploads/partners/${req.file.filename}`;
        }

        const partner = await Partners.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Partner updated successfully',
            data: partner,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to update partner',
            error: error.message,
        });
    }
};

// ==============================
// Delete Partner
// ==============================
const deletePartner = async (req, res) => {
    try {
        const partner = await Partners.findByIdAndDelete(req.params.id);

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Partner deleted successfully',
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to delete partner',
            error: error.message,
        });
    }
};

module.exports = {
    createPartner,
    getPartners,
    getPartnerById,
    updatePartner,
    deletePartner,
};

