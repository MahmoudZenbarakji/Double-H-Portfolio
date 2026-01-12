const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Serverless-safe: Check if model exists before creating
const HeroSection = mongoose.models.HeroSection || mongoose.model('HeroSection', heroSectionSchema);

module.exports = HeroSection;