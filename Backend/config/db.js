const mongoose = require('mongoose');

// Cache the connection to reuse in serverless environments
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // Validate MONGO_URI
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not set');
    }

    // If already connected and ready, return the existing connection
    if (cached.conn && mongoose.connection.readyState === 1) {
        return cached.conn;
    }

    // If connection is in progress, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
            .then((mongoose) => {
                console.log('MongoDB connected successfully');
                return mongoose;
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error.message);
                cached.promise = null;
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
        
        // Verify connection is ready
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection is not ready');
        }
        
        return cached.conn;
    } catch (e) {
        cached.promise = null;
        cached.conn = null;
        throw e;
    }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    cached.conn = null;
    cached.promise = null;
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    cached.conn = null;
    cached.promise = null;
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
    cached.conn = mongoose.connection;
});

module.exports = connectDB;