// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Queue Routes (Module 5: Queue Management)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  checkInPatient,
  getMyQueue,
  getMyDoctorQueue,
  getDepartmentQueue,
  getQueueById,
  callPatient,
  startConsultation,
  completeQueue,
  cancelQueue,
  markNoShow,
  getQueuePosition,
  getNextPatient,
} from '../controllers/queueController.js';
import { requireAuth, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Patient Routes ──
router.get('/my', requireAuth, getMyQueue);
router.get('/:id/position', requireAuth, getQueuePosition);

// ── Doctor Routes ──
router.get('/doctor/my', requireAuth, authorizeRoles('doctor'), getMyDoctorQueue);
router.get('/doctor/:doctorId/next', requireAuth, authorizeRoles('doctor', 'staff', 'admin'), getNextPatient);

// ── Staff/Admin Routes ──
router.post('/check-in', requireAuth, authorizeRoles('staff', 'admin'), checkInPatient);
router.get('/department/:departmentId', requireAuth, authorizeRoles('staff', 'admin', 'doctor'), getDepartmentQueue);

// ── Queue Operations ──
router.get('/:id', requireAuth, getQueueById);
router.put('/:id/call', requireAuth, authorizeRoles('doctor', 'staff', 'admin'), callPatient);
router.put('/:id/start-consultation', requireAuth, authorizeRoles('doctor', 'staff', 'admin'), startConsultation);
router.put('/:id/complete', requireAuth, authorizeRoles('doctor', 'staff', 'admin'), completeQueue);
router.put('/:id/cancel', requireAuth, authorizeRoles('staff', 'admin'), cancelQueue);
router.put('/:id/no-show', requireAuth, authorizeRoles('staff', 'admin'), markNoShow);

export default router;
