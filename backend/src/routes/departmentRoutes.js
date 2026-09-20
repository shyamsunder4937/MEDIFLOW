// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Department Routes (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  toggleDepartmentStatus,
} from '../controllers/departmentController.js';
import { requireAuth, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (Read departments)
router.get('/', getDepartments);
router.get('/:id', getDepartmentById);

// Admin-only management routes
router.post('/', requireAuth, adminOnly, createDepartment);
router.put('/:id', requireAuth, adminOnly, updateDepartment);
router.patch('/:id/status', requireAuth, adminOnly, toggleDepartmentStatus);

export default router;
