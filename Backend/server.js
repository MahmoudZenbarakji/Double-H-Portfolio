const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// -------------------------
// Serverless-safe MongoDB connection
// -------------------------
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set!");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log("MongoDB connected");
};

// -------------------------
// CORS - allow frontend
// -------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://double-h-portfolio-tvgh.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// -------------------------
// Logging middleware
// -------------------------
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// -------------------------
// Health check
// -------------------------
app.get('/api/v1/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ status: "OK" });
  } catch (err) {
    console.error("Health check error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------------
// Projects route
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
    console.error("Projects error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------------
// Partners route
// -------------------------
app.get('/api/v1/partners', async (req, res) => {
  try {
    await connectDB();

    const Partner = mongoose.models.Partner || mongoose.model("Partner", new mongoose.Schema({
      name: String,
      link: String
    }));

    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    console.error("Partners error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------------
// Hero route
// -------------------------
app.get('/api/v1/hero', async (req, res) => {
  try {
    await connectDB();

    const Hero = mongoose.models.Hero || mongoose.model("Hero", new mongoose.Schema({
      title: String,
      image: String
    }));

    const hero = await Hero.find();
    res.json(hero);
  } catch (err) {
    console.error("Hero error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -------------------------
// Export app for Vercel
// -------------------------
module.exports = app;
