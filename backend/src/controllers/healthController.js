// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Health Check Controller
// ═══════════════════════════════════════════════════════════════════════════

import mongoose from 'mongoose';

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
export const getHealthStatus = async (req, res) => {
  try {
    // Check MongoDB connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    res.status(200).json({
      success: true,
      message: 'MediFlow AI backend is running',
      timestamp: new Date().toISOString(),
      status: {
        server: 'online',
        database: dbStatus,
      },
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
    });
  }
};
