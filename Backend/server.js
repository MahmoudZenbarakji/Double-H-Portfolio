const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// -------------------------
// MongoDB serverless-safe connection
// -------------------------
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set!");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log("MongoDB connected");
};

// -------------------------
// CORS
// -------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// -------------------------
// Health check
// -------------------------
app.get('/api/v1/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ status: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// Example route: projects
// -------------------------
app.get('/api/v1/projects', async (req, res) => {
  try {
    await connectDB();
    const Project = mongoose.models.Project || mongoose.model("Project", new mongoose.Schema({
      title: String,
      description: String
    }));
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------
// Export app for Vercel
// -------------------------
module.exports = app;
