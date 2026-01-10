const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

module.exports = HeroSection;