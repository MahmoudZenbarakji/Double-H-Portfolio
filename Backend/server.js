const express = require('express');
const app = express();
const projectRoutes = require('./Routes/project.route');
const authRoutes = require('./Routes/auth.route');
const partnersRoutes = require('./Routes/partners.route');
const heroRoutes = require('./Routes/hero.route');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');

// CORS Configuration - Production safe
const corsOptions = {
    origin:"*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/hero', heroRoutes);

// Root endpoint
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

// Connect to database
connectDB();

// Start server only if not in Vercel serverless environment
// if (process.env.VERCEL !== '1') {
//     const port = process.env.PORT || 3000;
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// }

// Export app for Vercel serverless
module.exports = app;
