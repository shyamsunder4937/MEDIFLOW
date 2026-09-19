// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - User Routes
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  getCurrentUser,
  updateCurrentUser,
  syncUserFromClerk,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.get('/me', requireAuth, getCurrentUser);
router.put('/me', requireAuth, updateCurrentUser);

// Sync user from Clerk (called from frontend after Clerk authentication)
router.post('/sync', syncUserFromClerk);

export default router;
