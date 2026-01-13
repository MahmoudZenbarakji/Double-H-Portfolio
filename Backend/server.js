const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();   // 🔥 MUST be first

const path = require('path');
const { storage } = require('./storage/storage');
const multer = require('multer');
const upload = multer({ storage });

// Import routes
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');

// Import database connection
const connectDB = require('./config/db');

// ==============================
// CORS Configuration - Production Safe
// ==============================
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
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow mobile apps, Postman, curl
        if (allowedOrigins.includes(origin)) return callback(null, true);

        // Allow localhost with any port
        const isLocalhost = origin.startsWith('http://localhost:') ||
                            origin.startsWith('http://127.0.0.1:');
        if (isLocalhost) return callback(null, true);

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
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400, // 24 hours
};

// ==============================
// Handle CORS and Preflight Requests Globally
// ==============================
app.use((req, res, next) => {
    cors(corsOptions)(req, res, () => {});
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content for preflight
    }
    next();
});

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ==============================
// Database Connection Middleware
// ==============================
let dbConnected = false;
const checkDatabaseConnection = async (req, res, next) => {
    if (dbConnected && require('mongoose').connection.readyState === 1) {
        return next();
    }
    
    try {
        await connectDB();
        dbConnected = true;
        next();
    } catch (error) {
        console.error('Database connection error:', error.message);
        return res.status(503).json({
            success: false,
            message: 'Database service temporarily unavailable',
        });
    }
};

// ==============================
// Temporary Upload Route (Single Image Test)
// ==============================
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Done');
});

// ==============================
// Health Check Endpoint
// ==============================
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
        database: dbConnected ? 'connected' : 'disconnected',
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
// Root Endpoint
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
            auth: '/api/v1/auth'
        }
    });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation',
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message: message,
    });
});

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
    });
});

// ==============================
// Initialize Database Connection (Non-blocking)
// ==============================
(async () => {
    try {
        await connectDB();
        dbConnected = true;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to database on startup:', error.message);
        dbConnected = false;
    }
})();

// ==============================
// Export app
// ==============================
module.exports = app;
