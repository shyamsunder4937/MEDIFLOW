// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Main Server
// Phase 2: Backend Foundation with MongoDB, Express, and Clerk Authentication
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import routes
import healthRoutes from './routes/healthRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ═══════════════════════════════════════════════════════════════════════════
// Middleware Configuration
// ═══════════════════════════════════════════════════════════════════════════

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk authentication middleware (must be before routes)
app.use(clerkMiddleware());

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// API Routes
// ═══════════════════════════════════════════════════════════════════════════

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MediFlow AI Backend API',
    version: '2.0.0',
    status: 'running',
    documentation: '/api/health',
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Error Handling
// ═══════════════════════════════════════════════════════════════════════════

app.use(notFound);
app.use(errorHandler);

// ═══════════════════════════════════════════════════════════════════════════
// Database Connection & Server Startup
// ═══════════════════════════════════════════════════════════════════════════

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log('═══════════════════════════════════════════════════════════');
      console.log('🚀 MediFlow AI Backend Server');
      console.log('═══════════════════════════════════════════════════════════');
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
      console.log('═══════════════════════════════════════════════════════════');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});
