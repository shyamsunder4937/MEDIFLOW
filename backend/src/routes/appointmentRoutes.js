// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Appointment Routes (Module 4: Appointment Management)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  confirmAppointment,
} from '../controllers/appointmentController.js';
import { requireAuth, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Current user's appointments (patient or doctor)
router.get('/my', requireAuth, getMyAppointments);

// Create new appointment
router.post('/', requireAuth, createAppointment);

// List all appointments (staff/admin)
router.get('/', requireAuth, authorizeRoles('staff', 'admin'), getAppointments);

// Single appointment operations
router.get('/:id', requireAuth, getAppointmentById);
router.put('/:id', requireAuth, updateAppointment);

// Appointment actions
router.put('/:id/cancel', requireAuth, cancelAppointment);
router.put('/:id/confirm', requireAuth, authorizeRoles('staff', 'admin', 'doctor'), confirmAppointment);

export default router;

