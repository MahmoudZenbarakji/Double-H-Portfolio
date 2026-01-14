const Partner = require("../Models/partners");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// ==============================
// Create Partner
// ==============================
const createPartner = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Partner image is required",
      });
    }

    const upload = await uploadToCloudinary(req.file.buffer, "partners");

    const partner = await Partner.create({
      name,
      image: upload.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Partner created successfully",
      data: partner.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create partner",
      error: error.message,
    });
  }
};

// ==============================
// Get Partners
// ==============================
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: partners.length,
      data: partners.map(p => p.toObject()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
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
        message: "Partner not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: partner.toObject(),
    });
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid partner ID",
    });
  }
};

// ==============================
// Update Partner
// ==============================
const updatePartner = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer, "partners");
      updateData.image = upload.secure_url;
    }

    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      data: partner.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update partner",
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
        message: "Partner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete partner",
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
