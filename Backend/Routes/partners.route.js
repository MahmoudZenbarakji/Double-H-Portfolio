const express = require('express');
const router = express.Router();

const {
    createPartner,
    getPartners,
    getPartnerById,
    updatePartner,
    deletePartner,
} = require('../Controllers/partners.controller');

const uploadPartnerImage = require('../middleware/partnerUpload');

// ==============================
// Public Routes
// ==============================

// Get all partners
router.get('/', getPartners);

// Get partner by ID
router.get('/:id', getPartnerById);

// ==============================
// Admin Routes
// ==============================

// Create partner (upload single image)
router.post(
    '/',
    uploadPartnerImage.single('image'),
    createPartner
);

// Update partner (optional image upload)
router.put(
    '/:id',
    uploadPartnerImage.single('image'),
    updatePartner
);

// Delete partner
router.delete('/:id', deletePartner);

module.exports = router;

