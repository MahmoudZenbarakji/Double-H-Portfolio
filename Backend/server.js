const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

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
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Allow localhost for development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        // Allow production frontend domain
        if (origin === 'https://double-h-portfolio-tvgh.vercel.app') {
            return callback(null, true);
        }
        
        // Allow Vercel preview deployments (any vercel.app subdomain)
        if (origin.includes('.vercel.app')) {
            return callback(null, true);
        }
        
        // Block other origins
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400, // 24 hours
};

// Apply CORS middleware BEFORE all routes
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
// Health Check Endpoint (No DB required)
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
// API Routes (with DB check)
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
// Global Error Handler Middleware
// ==============================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    
    // CORS error
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation',
        });
    }
    
    // Default error response
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
        // Don't crash - let routes handle DB errors
        dbConnected = false;
    }
})();

// ==============================
// Export app for Vercel serverless
// ==============================
module.exports = app;
