// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Health Check Routes
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router = express.Router();

// Public health check endpoint
router.get('/', getHealthStatus);

export default router;
