// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Staff Routes (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  changeStaffDepartment,
  changeStaffWorkingStatus,
} from '../controllers/staffController.js';
import { requireAuth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Staff read routes
router.get('/', getStaff);
router.get('/:id', getStaffById);

// Protected routes
router.post('/', requireAuth, adminOnly, createStaff);
router.put('/:id', requireAuth, updateStaff);
router.patch('/:id/department', requireAuth, adminOnly, changeStaffDepartment);
router.patch('/:id/working-status', requireAuth, changeStaffWorkingStatus);

export default router;
