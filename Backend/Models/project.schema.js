const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        link: {
            type: String,
        },
        images: [
            {
                type: String,
                default: [] // image path or URL
            },
        ],
    },
    { timestamps: true }
);

// Serverless-safe: Check if model exists before creating
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = Project;
