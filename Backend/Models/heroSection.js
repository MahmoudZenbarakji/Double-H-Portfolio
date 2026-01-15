const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    images: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Serverless-safe: Check if model exists before creating
// Use explicit collection name to avoid pluralization issues
const Hero = mongoose.models.Hero || mongoose.model('Hero', heroSchema, 'heroes');

module.exports = Hero;
