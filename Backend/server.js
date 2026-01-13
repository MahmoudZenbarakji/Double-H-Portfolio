const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const { storage } = require('./storage/storage');
const upload = multer({ storage });

// Routes
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');

// DB
const connectDB = require('./config/db');

/* ==============================
   CONNECT DB ONCE (IMPORTANT)
================================ */
let isConnected = false;
const ensureDB = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

/* ==============================
   CORS (SAFE FOR VERCEL)
================================ */
app.use(cors({
  origin: '*', // ✅ TEMPORARY (safe for portfolio)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ REQUIRED FOR PREFLIGHT
app.options('*', cors());

/* ==============================
   BODY PARSING
================================ */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

/* ==============================
   DB MIDDLEWARE (BEFORE ROUTES)
================================ */
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

/* ==============================
   UPLOAD
================================ */
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ success: true, file: req.file });
});

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
   404
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* ==============================
   ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
