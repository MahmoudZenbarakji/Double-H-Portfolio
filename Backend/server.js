require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ ADD THIS (DB middleware)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'DB error' });
  }
});

// Routes
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/hero', heroRoutes);
app.use('/api/v1/auth', authRoutes);

// Export for Vercel
module.exports = app;
