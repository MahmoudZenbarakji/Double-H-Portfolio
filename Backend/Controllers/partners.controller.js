const Partner = require('../Models/partners');

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

        const image = req.file.path;

        const partner = await Partner.create({
            name,
            image,
        });

        return res.status(201).json({
            success: true,
            message: 'Partner created successfully',
            data: partner.toObject(),
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
        const partners = await Partner.find().sort({ createdAt: -1 });

        // Convert Mongoose documents to plain objects for safe serialization
        const safePartners = partners.map(p => ({
            ...p.toObject(),
            image: p.image || null,
        }));

        return res.status(200).json({
            success: true,
            count: safePartners.length,
            data: safePartners,
        });
    } catch (error) {
        console.error('Get Partners Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch partners',
            error: process.env.NODE_ENV === 'production' ? undefined : error.message,
        });
    }
};

// ==============================
// Get Partner By ID
// ==============================
const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: partner.toObject(),
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

        // If a new image is uploaded, update the image URL
        if (req.file) {
            updateData.image = req.file.path;
        }

        const partner = await Partner.findByIdAndUpdate(
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
            data: partner.toObject(),
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
        const partner = await Partner.findByIdAndDelete(req.params.id);

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

