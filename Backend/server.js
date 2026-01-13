// server.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load .env first

const path = require('path');
const multer = require('multer');
const { storage } = require('./storage/storage');
const upload = multer({ storage });

// Import routes
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');

// Database connection
const connectDB = require('./config/db');

// ==============================
// CORS Configuration
// ==============================
const allowedOrigins = [
  'https://double-h-portfolio-tvgh.vercel.app', // your frontend
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, curl, mobile apps
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ==============================
// Body Parsing
// ==============================
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ==============================
// Database Middleware
// ==============================
let dbConnected = false;
const checkDatabaseConnection = async (req, res, next) => {
  if (dbConnected && require('mongoose').connection.readyState === 1) return next();

  try {
    await connectDB();
    dbConnected = true;
    next();
  } catch (error) {
    console.error('DB connection error:', error.message);
    res.status(503).json({
      success: false,
      message: 'Database service temporarily unavailable',
    });
  }
};

// ==============================
// Upload route (single image)
// ==============================
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.json({ success: true, file: req.file });
});

// ==============================
// Health Check
// ==============================
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// API Routes
// ==============================
app.use('/api/v1/projects', checkDatabaseConnection, projectRoutes);
app.use('/api/v1/auth', checkDatabaseConnection, authRoutes);
app.use('/api/v1/partners', checkDatabaseConnection, partnersRoutes);
app.use('/api/v1/hero', checkDatabaseConnection, heroRoutes);

// ==============================
// Root Route
// ==============================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Double H Portfolio API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      projects: '/api/v1/projects',
      partners: '/api/v1/partners',
      hero: '/api/v1/hero',
      auth: '/api/v1/auth',
    },
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: 'CORS policy violation' });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message || 'Internal server error' });
});

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.path });
});

// ==============================
// Initialize DB
// ==============================
(async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed DB startup:', error.message);
    dbConnected = false;
  }
})();

// ==============================
// Export app for Vercel
// ==============================
module.exports = app;
