const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth.route');
dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set!");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
};

// CORS
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

// Logging
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Routes
app.use('/api/v1/auth', authRoutes);

// Example GET routes (projects, partners, hero) same as your snippet

// Export for Vercel
module.exports = app;
