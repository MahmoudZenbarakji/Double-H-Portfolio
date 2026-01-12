const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Serverless-safe: Check if model exists before creating
// Use explicit collection name to avoid pluralization issues
const Partner = mongoose.models.Partner || mongoose.model('Partner', partnerSchema, 'partners');

module.exports = Partner;
