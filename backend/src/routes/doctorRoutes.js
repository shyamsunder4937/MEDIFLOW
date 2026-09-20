// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Doctor Routes (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  changeDoctorDepartment,
  changeDoctorWorkingStatus,
} from '../controllers/doctorController.js';
import { requireAuth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Patient read routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.post('/', requireAuth, adminOnly, createDoctor);
router.put('/:id', requireAuth, updateDoctor);
router.patch('/:id/department', requireAuth, adminOnly, changeDoctorDepartment);
router.patch('/:id/working-status', requireAuth, changeDoctorWorkingStatus);

export default router;
