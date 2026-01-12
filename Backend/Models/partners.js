const mongoose = require('mongoose');

const partnersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Serverless-safe: Check if model exists before creating
const Partners = mongoose.models.Partners || mongoose.model('Partners', partnersSchema);

module.exports = Partners;