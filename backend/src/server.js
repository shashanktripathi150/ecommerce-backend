import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Set up port with fallback
const PORT = process.env.PORT || 5000;

// Core Middlewares
app.use(cors());
app.use(express.json());

// Health-check / Base route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'E-Commerce Backend Server is running smoothly'
  });
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});