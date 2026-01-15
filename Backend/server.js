// server.js - Vercel Serverless Compatible
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');

// Import storage and routes
const { storage } = require('./storage/storage');
const upload = multer({ storage });

const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');

const connectDB = require('./config/db');

/* ==============================
   CORS Configuration (Production Safe)
================================ */
const allowedOrigins = [
  'https://double-h-portfolio-tvgh.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow localhost with any port for development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    
    // Block other origins
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware (automatically handles OPTIONS preflight)
app.use(cors(corsOptions));

/* ==============================
   Body Parsing
================================ */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

/* ==============================
   Database Connection Middleware
   (Serverless-safe: Reuses connection)
================================ */
app.use(async (req, res, next) => {
  try {
    // connectDB() handles caching internally for serverless
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Database service temporarily unavailable',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
});

/* ==============================
   UPLOAD
================================ */
// app.post('/upload', upload.single('image'), (req, res) => {
//   res.json({ success: true, file: req.file });
// });

/* ==============================
   HEALTH
================================ */
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
  });
});

/* ==============================
   API ROUTES
================================ */
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/hero', heroRoutes);

/* ==============================
   ROOT
================================ */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Double H Portfolio API',
  });
});

/* ==============================
   Global Error Handler (MUST be before 404)
================================ */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation',
    });
  }
  
  // Handle Multer errors (file upload)
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB',
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message,
    });
  }
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

/* ==============================
   404 Handler (MUST be last)
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

module.exports = app;
