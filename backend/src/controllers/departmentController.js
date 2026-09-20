// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Department Controller (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

/**
 * @route   GET /api/departments
 * @desc    Get all departments (optional query ?all=true for inactive as well)
 * @access  Public
 */
export const getDepartments = asyncHandler(async (req, res) => {
  const { all } = req.query;

  let query = supabase
    .from('departments')
    .select('*, doctors:doctors(count), staff:staff(count)')
    .order('name', { ascending: true });

  if (all !== 'true') {
    query = query.eq('status', 'active');
  }

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch departments');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

/**
 * @route   GET /api/departments/:id
 * @desc    Get department by ID (with doctors and staff)
 * @access  Public
 */
export const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: department, error } = await supabase
    .from('departments')
    .select(`
      *,
      doctors:doctors(*, user:users(id, full_name, email, phone, avatar_url)),
      staff:staff(*, user:users(id, full_name, email, phone, avatar_url))
    `)
    .eq('id', id)
    .single();

  if (error || !department) {
    res.status(404);
    throw new Error('Department not found');
  }

  res.status(200).json({
    success: true,
    data: department,
  });
});

/**
 * @route   POST /api/departments
 * @desc    Create new department
 * @access  Private (Admin only)
 */
export const createDepartment = asyncHandler(async (req, res) => {
  const { name, code, description, location, status } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error('Department name is required');
  }

  const newDept = {
    name: name.trim(),
    code: code ? code.trim().toUpperCase() : null,
    description: description ? description.trim() : null,
    location: location ? location.trim() : null,
    status: status === 'inactive' ? 'inactive' : 'active',
  };

  const { data, error } = await supabase
    .from('departments')
    .insert(newDept)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      res.status(409);
      throw new Error(`A department with this ${error.message.includes('code') ? 'code' : 'name'} already exists`);
    }
    res.status(500);
    throw new Error(error.message || 'Failed to create department');
  }

  res.status(201).json({
    success: true,
    message: 'Department created successfully',
    data,
  });
});

/**
 * @route   PUT /api/departments/:id
 * @desc    Update department
 * @access  Private (Admin only)
 */
export const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, code, description, location, status } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (code !== undefined) updates.code = code ? code.trim().toUpperCase() : null;
  if (description !== undefined) updates.description = description ? description.trim() : null;
  if (location !== undefined) updates.location = location ? location.trim() : null;
  if (status !== undefined) {
    if (!['active', 'inactive'].includes(status)) {
      res.status(400);
      throw new Error('Status must be active or inactive');
    }
    updates.status = status;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const { data, error } = await supabase
    .from('departments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      res.status(409);
      throw new Error('A department with this name or code already exists');
    }
    res.status(500);
    throw new Error(error.message || 'Failed to update department');
  }

  res.status(200).json({
    success: true,
    message: 'Department updated successfully',
    data,
  });
});

/**
 * @route   PATCH /api/departments/:id/status
 * @desc    Activate or deactivate department
 * @access  Private (Admin only)
 */
export const toggleDepartmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'inactive'].includes(status)) {
    res.status(400);
    throw new Error('Status must be either active or inactive');
  }

  const { data, error } = await supabase
    .from('departments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to update status');
  }

  res.status(200).json({
    success: true,
    message: `Department marked as ${status}`,
    data,
  });
});
