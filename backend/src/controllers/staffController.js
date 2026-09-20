// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Staff Controller (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const VALID_WORKING_STATUSES = ['available', 'busy', 'unavailable', 'on_leave'];

/**
 * @route   GET /api/staff
 * @desc    Get all staff members (supports filtering by departmentId, workingStatus, staffType)
 * @access  Public / Staff / Admin
 */
export const getStaff = asyncHandler(async (req, res) => {
  const { departmentId, workingStatus, staffType } = req.query;

  let query = supabase
    .from('staff')
    .select(`
      *,
      user:users!staff_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status),
      department:departments!staff_department_id_fkey(id, name, code, location)
    `)
    .order('created_at', { ascending: false });

  if (departmentId) {
    query = query.eq('department_id', departmentId);
  }

  if (workingStatus) {
    query = query.eq('working_status', workingStatus);
  }

  if (staffType) {
    query = query.eq('staff_type', staffType);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch staff members');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

/**
 * @route   GET /api/staff/:id
 * @desc    Get staff member by ID
 * @access  Public / Staff / Admin
 */
export const getStaffById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: member, error } = await supabase
    .from('staff')
    .select(`
      *,
      user:users!staff_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status),
      department:departments!staff_department_id_fkey(id, name, code, location, description)
    `)
    .eq('id', id)
    .single();

  if (error || !member) {
    res.status(404);
    throw new Error('Staff member not found');
  }

  res.status(200).json({
    success: true,
    data: member,
  });
});

/**
 * @route   POST /api/staff
 * @desc    Create staff profile linked to user and department
 * @access  Private (Admin only)
 */
export const createStaff = asyncHandler(async (req, res) => {
  const {
    user_id,
    userId,
    department_id,
    departmentId,
    employee_id,
    employeeId,
    staff_type,
    staffType,
    phone,
    working_status,
    workingStatus,
  } = req.body;

  const targetUserId = user_id || userId;
  const targetDeptId = department_id || departmentId;

  if (!targetUserId) {
    res.status(400);
    throw new Error('user_id is required');
  }

  // 1. Verify user exists and has role 'staff'
  const { data: targetUser, error: userError } = await supabase
    .from('users')
    .select('id, role, full_name')
    .eq('id', targetUserId)
    .single();

  if (userError || !targetUser) {
    res.status(404);
    throw new Error('User record not found');
  }

  if (targetUser.role !== 'staff') {
    res.status(400);
    throw new Error(`Cannot create staff profile: user has role "${targetUser.role}". User must have role "staff" first.`);
  }

  // 2. Verify department if specified
  if (targetDeptId) {
    const { data: targetDept, error: deptError } = await supabase
      .from('departments')
      .select('id, name')
      .eq('id', targetDeptId)
      .single();

    if (deptError || !targetDept) {
      res.status(404);
      throw new Error('Department not found');
    }
  }

  const initialStatus = working_status || workingStatus || 'available';
  if (!VALID_WORKING_STATUSES.includes(initialStatus)) {
    res.status(400);
    throw new Error(`Invalid working_status. Allowed values: ${VALID_WORKING_STATUSES.join(', ')}`);
  }

  const newStaff = {
    user_id: targetUserId,
    department_id: targetDeptId || null,
    employee_id: employee_id || employeeId || null,
    staff_type: staff_type || staffType || null,
    phone: phone || null,
    working_status: initialStatus,
  };

  const { data, error } = await supabase
    .from('staff')
    .insert(newStaff)
    .select(`
      *,
      user:users!staff_user_id_fkey(id, full_name, email, phone, avatar_url),
      department:departments!staff_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    if (error.code === '23505') {
      res.status(409);
      throw new Error('A staff profile already exists for this user or employee_id');
    }
    res.status(500);
    throw new Error(error.message || 'Failed to create staff profile');
  }

  res.status(201).json({
    success: true,
    message: 'Staff profile created successfully',
    data,
  });
});

/**
 * @route   PUT /api/staff/:id
 * @desc    Update staff profile
 * @access  Private (Admin or Staff themselves)
 */
export const updateStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    employee_id,
    employeeId,
    staff_type,
    staffType,
    phone,
    working_status,
    workingStatus,
    department_id,
    departmentId,
  } = req.body;

  // Authorization check
  if (req.user.role !== 'admin') {
    const { data: existingStaff } = await supabase
      .from('staff')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingStaff || existingStaff.user_id !== req.user.id) {
      res.status(403);
      throw new Error('Forbidden: You can only update your own staff profile');
    }
  }

  const updates = {};
  if (employee_id !== undefined || employeeId !== undefined) updates.employee_id = employee_id || employeeId;
  if (staff_type !== undefined || staffType !== undefined) updates.staff_type = staff_type || staffType;
  if (phone !== undefined) updates.phone = phone;

  const targetStatus = working_status || workingStatus;
  if (targetStatus !== undefined) {
    if (!VALID_WORKING_STATUSES.includes(targetStatus)) {
      res.status(400);
      throw new Error(`Invalid working_status. Allowed values: ${VALID_WORKING_STATUSES.join(', ')}`);
    }
    updates.working_status = targetStatus;
  }

  // Only admin can change department
  const targetDept = department_id !== undefined ? department_id : departmentId;
  if (targetDept !== undefined) {
    if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Only admins can change a staff member\'s department');
    }
    updates.department_id = targetDept;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const { data, error } = await supabase
    .from('staff')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      user:users!staff_user_id_fkey(id, full_name, email, phone, avatar_url),
      department:departments!staff_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to update staff profile');
  }

  res.status(200).json({
    success: true,
    message: 'Staff profile updated successfully',
    data,
  });
});

/**
 * @route   PATCH /api/staff/:id/department
 * @desc    Change staff member's department
 * @access  Private (Admin only)
 */
export const changeStaffDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { departmentId, department_id } = req.body;

  const targetDeptId = departmentId !== undefined ? departmentId : department_id;

  if (targetDeptId) {
    const { data: dept, error: deptError } = await supabase
      .from('departments')
      .select('id, name')
      .eq('id', targetDeptId)
      .single();

    if (deptError || !dept) {
      res.status(404);
      throw new Error('Department not found');
    }
  }

  const { data, error } = await supabase
    .from('staff')
    .update({ department_id: targetDeptId || null })
    .eq('id', id)
    .select(`
      *,
      user:users!staff_user_id_fkey(id, full_name, email),
      department:departments!staff_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to change staff department');
  }

  res.status(200).json({
    success: true,
    message: 'Staff department updated successfully',
    data,
  });
});

/**
 * @route   PATCH /api/staff/:id/working-status
 * @desc    Change staff member's working status
 * @access  Private (Admin or Staff themselves)
 */
export const changeStaffWorkingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { workingStatus, working_status } = req.body;

  const status = workingStatus || working_status;
  if (!status || !VALID_WORKING_STATUSES.includes(status)) {
    res.status(400);
    throw new Error(`Valid working_status is required. Allowed values: ${VALID_WORKING_STATUSES.join(', ')}`);
  }

  if (req.user.role !== 'admin') {
    const { data: existingStaff } = await supabase
      .from('staff')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingStaff || existingStaff.user_id !== req.user.id) {
      res.status(403);
      throw new Error('Forbidden: You can only change your own working status');
    }
  }

  const { data, error } = await supabase
    .from('staff')
    .update({ working_status: status })
    .eq('id', id)
    .select(`
      *,
      user:users!staff_user_id_fkey(id, full_name, email),
      department:departments!staff_department_id_fkey(id, name)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to update working status');
  }

  res.status(200).json({
    success: true,
    message: `Working status updated to "${status}"`,
    data,
  });
});
