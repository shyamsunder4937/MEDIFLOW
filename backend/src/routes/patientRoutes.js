// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Patient Routes (Module 3: Patient Management)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  getCurrentPatientProfile,
  updateCurrentPatientProfile,
  getPatients,
  getPatientById,
  getPatientByUserId,
  getPatientByClerkUserId,
} from '../controllers/patientController.js';
import { requireAuth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Current authenticated patient profile
router.get('/me', requireAuth, getCurrentPatientProfile);
router.put('/me', requireAuth, updateCurrentPatientProfile);

// Admin patient listing & search
router.get('/', requireAuth, adminOnly, getPatients);

// Lookups by ID, userId, or clerkUserId (restricted by role in controller)
router.get('/by-user/:userId', requireAuth, getPatientByUserId);
router.get('/by-clerk/:clerkUserId', requireAuth, getPatientByClerkUserId);
router.get('/:id', requireAuth, getPatientById);

export default router;
