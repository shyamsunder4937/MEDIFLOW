// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Doctor Controller (Module 2: Hospital Structure)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const VALID_WORKING_STATUSES = ['available', 'busy', 'unavailable', 'on_leave'];

/**
 * @route   GET /api/doctors
 * @desc    Get all doctors (supports filtering by departmentId, workingStatus)
 * @access  Public
 */
export const getDoctors = asyncHandler(async (req, res) => {
  const { departmentId, workingStatus } = req.query;

  let query = supabase
    .from('doctors')
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status),
      department:departments!doctors_department_id_fkey(id, name, code, location)
    `)
    .order('created_at', { ascending: false });

  if (departmentId) {
    query = query.eq('department_id', departmentId);
  }

  if (workingStatus) {
    query = query.eq('working_status', workingStatus);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch doctors');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

/**
 * @route   GET /api/doctors/:id
 * @desc    Get doctor by ID
 * @access  Public
 */
export const getDoctorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: doctor, error } = await supabase
    .from('doctors')
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status),
      department:departments!doctors_department_id_fkey(id, name, code, location, description)
    `)
    .eq('id', id)
    .single();

  if (error || !doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

/**
 * @route   POST /api/doctors
 * @desc    Create doctor profile linked to user and department
 * @access  Private (Admin only)
 */
export const createDoctor = asyncHandler(async (req, res) => {
  const {
    user_id,
    userId,
    department_id,
    departmentId,
    employee_id,
    employeeId,
    specialization,
    qualification,
    license_number,
    licenseNumber,
    room_number,
    roomNumber,
    phone,
    working_status,
    workingStatus,
  } = req.body;

  const targetUserId = user_id || userId;
  const targetDeptId = department_id || departmentId;

  if (!targetUserId || !targetDeptId) {
    res.status(400);
    throw new Error('Both user_id and department_id are required');
  }

  // 1. Verify user exists and has role 'doctor'
  const { data: targetUser, error: userError } = await supabase
    .from('users')
    .select('id, role, full_name')
    .eq('id', targetUserId)
    .single();

  if (userError || !targetUser) {
    res.status(404);
    throw new Error('User record not found');
  }

  if (targetUser.role !== 'doctor') {
    res.status(400);
    throw new Error(`Cannot create doctor profile: user has role "${targetUser.role}". User must have role "doctor" first.`);
  }

  // 2. Verify department exists
  const { data: targetDept, error: deptError } = await supabase
    .from('departments')
    .select('id, name, status')
    .eq('id', targetDeptId)
    .single();

  if (deptError || !targetDept) {
    res.status(404);
    throw new Error('Department not found');
  }

  const initialStatus = working_status || workingStatus || 'available';
  if (!VALID_WORKING_STATUSES.includes(initialStatus)) {
    res.status(400);
    throw new Error(`Invalid working_status. Allowed values: ${VALID_WORKING_STATUSES.join(', ')}`);
  }

  const newDoc = {
    user_id: targetUserId,
    department_id: targetDeptId,
    employee_id: employee_id || employeeId || null,
    specialization: specialization || null,
    qualification: qualification || null,
    license_number: license_number || licenseNumber || null,
    room_number: room_number || roomNumber || null,
    phone: phone || null,
    working_status: initialStatus,
  };

  const { data, error } = await supabase
    .from('doctors')
    .insert(newDoc)
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, full_name, email, phone, avatar_url),
      department:departments!doctors_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    if (error.code === '23505') {
      res.status(409);
      throw new Error('A doctor profile already exists for this user or employee_id');
    }
    res.status(500);
    throw new Error(error.message || 'Failed to create doctor profile');
  }

  res.status(201).json({
    success: true,
    message: 'Doctor profile created successfully',
    data,
  });
});

/**
 * @route   PUT /api/doctors/:id
 * @desc    Update doctor profile
 * @access  Private (Admin or Doctor themselves)
 */
export const updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    employee_id,
    employeeId,
    specialization,
    qualification,
    license_number,
    licenseNumber,
    room_number,
    roomNumber,
    phone,
    working_status,
    workingStatus,
    department_id,
    departmentId,
  } = req.body;

  // Authorization check: doctor can only update their own profile, admin can update any
  if (req.user.role !== 'admin') {
    const { data: existingDoc } = await supabase
      .from('doctors')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingDoc || existingDoc.user_id !== req.user.id) {
      res.status(403);
      throw new Error('Forbidden: You can only update your own doctor profile');
    }
  }

  const updates = {};
  if (employee_id !== undefined || employeeId !== undefined) updates.employee_id = employee_id || employeeId;
  if (specialization !== undefined) updates.specialization = specialization;
  if (qualification !== undefined) updates.qualification = qualification;
  if (license_number !== undefined || licenseNumber !== undefined) updates.license_number = license_number || licenseNumber;
  if (room_number !== undefined || roomNumber !== undefined) updates.room_number = room_number || roomNumber;
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
  const targetDept = department_id || departmentId;
  if (targetDept !== undefined) {
    if (req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Only admins can change a doctor\'s department');
    }
    updates.department_id = targetDept;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const { data, error } = await supabase
    .from('doctors')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, full_name, email, phone, avatar_url),
      department:departments!doctors_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to update doctor profile');
  }

  res.status(200).json({
    success: true,
    message: 'Doctor profile updated successfully',
    data,
  });
});

/**
 * @route   PATCH /api/doctors/:id/department
 * @desc    Change doctor's department
 * @access  Private (Admin only)
 */
export const changeDoctorDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { departmentId, department_id } = req.body;

  const targetDeptId = departmentId || department_id;
  if (!targetDeptId) {
    res.status(400);
    throw new Error('departmentId is required');
  }

  // Verify department exists
  const { data: dept, error: deptError } = await supabase
    .from('departments')
    .select('id, name')
    .eq('id', targetDeptId)
    .single();

  if (deptError || !dept) {
    res.status(404);
    throw new Error('Department not found');
  }

  const { data, error } = await supabase
    .from('doctors')
    .update({ department_id: targetDeptId })
    .eq('id', id)
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, full_name, email),
      department:departments!doctors_department_id_fkey(id, name, code)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to change department');
  }

  res.status(200).json({
    success: true,
    message: `Doctor moved to ${dept.name} department successfully`,
    data,
  });
});

/**
 * @route   PATCH /api/doctors/:id/working-status
 * @desc    Change doctor's working status
 * @access  Private (Admin or Doctor themselves)
 */
export const changeDoctorWorkingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { workingStatus, working_status } = req.body;

  const status = workingStatus || working_status;
  if (!status || !VALID_WORKING_STATUSES.includes(status)) {
    res.status(400);
    throw new Error(`Valid working_status is required. Allowed values: ${VALID_WORKING_STATUSES.join(', ')}`);
  }

  // If not admin, verify doctor owns this record
  if (req.user.role !== 'admin') {
    const { data: existingDoc } = await supabase
      .from('doctors')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingDoc || existingDoc.user_id !== req.user.id) {
      res.status(403);
      throw new Error('Forbidden: You can only change your own working status');
    }
  }

  const { data, error } = await supabase
    .from('doctors')
    .update({ working_status: status })
    .eq('id', id)
    .select(`
      *,
      user:users!doctors_user_id_fkey(id, full_name, email),
      department:departments!doctors_department_id_fkey(id, name)
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
