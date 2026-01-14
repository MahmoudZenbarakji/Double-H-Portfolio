const Hero = require("../Models/heroSection");
const uploadToCloudinary = require("../storage/storage");

// ==============================
// Get Hero Images
// ==============================
const getHeroImages = async (req, res) => {
  try {
    const heroImages = await Hero.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: heroImages.length,
      data: heroImages.map(h => h.toObject()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hero images",
    });
  }
};

// ==============================
// Add Hero Images
// ==============================
const addHeroImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const uploads = await Promise.all(
      req.files.map(file =>
        uploadToCloudinary(file.buffer, "hero")
      )
    );

    const heroImages = await Promise.all(
      uploads.map(upload =>
        Hero.create({ images: upload.secure_url })
      )
    );

    return res.status(201).json({
      success: true,
      message: "Hero image(s) added successfully",
      data: heroImages.map(h => h.toObject()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add hero image(s)",
      error: error.message,
    });
  }
};

// ==============================
// Update Hero Image
// ==============================
const updateHeroImage = async (req, res) => {
  try {
    const heroImage = await Hero.findById(req.params.id);

    if (!heroImage) {
      return res.status(404).json({
        success: false,
        message: "Hero image not found",
      });
    }

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer, "hero");
      heroImage.images = upload.secure_url;
      await heroImage.save();
    }

    return res.status(200).json({
      success: true,
      message: "Hero image updated successfully",
      data: heroImage.toObject(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update hero image",
    });
  }
};

// ==============================
// Delete Hero Image
// ==============================
const deleteHeroImage = async (req, res) => {
  try {
    const heroImage = await Hero.findByIdAndDelete(req.params.id);

    if (!heroImage) {
      return res.status(404).json({
        success: false,
        message: "Hero image not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hero image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete hero image",
    });
  }
};

module.exports = {
  getHeroImages,
  addHeroImage,
  updateHeroImage,
  deleteHeroImage,
};
