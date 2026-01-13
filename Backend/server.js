// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Storage (Cloudinary)
const { storage } = require('./storage/storage');
const upload = multer({ storage });

// Routes
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');

// DB
const connectDB = require('./config/db');

// ==============================
// CORS
// ==============================
const allowedOrigins = [
  'https://double-h-portfolio-tvgh.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (origin.startsWith('http://localhost')) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));

// ==============================
// Body parsing
// ==============================
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ==============================
// ✅ DATABASE MIDDLEWARE (MUST BE HERE)
// ==============================
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// ==============================
// Upload test
// ==============================
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ success: true, file: req.file });
});

// ==============================
// Routes
// ==============================
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/hero', heroRoutes);

// ==============================
// Health
// ==============================
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'API running' });
});

// ==============================
// Root
// ==============================
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Double H Portfolio API' });
});

// ==============================
// Error handler
// ==============================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ==============================
// Export for Vercel
// ==============================
module.exports = app;
