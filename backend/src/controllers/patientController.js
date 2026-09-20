// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Patient Controller (Module 3: Patient Management)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const VALID_GENDERS = ['male', 'female', 'other', 'prefer_not_to_say'];
const VALID_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/**
 * Helper: format patient record with user details
 */
const formatPatientRecord = (patient) => {
  if (!patient) return null;
  const user = patient.user || {};
  return {
    ...patient,
    fullName: user.full_name || '',
    email: user.email || '',
    userPhone: user.phone || '',
    avatarUrl: user.avatar_url || '',
    userStatus: user.status || 'active',
  };
};

/**
 * @route   GET /api/patients/me
 * @desc    Get current authenticated patient's profile (auto-provisions if not yet created)
 * @access  Private (Patient role)
 */
export const getCurrentPatientProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== 'patient' && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden: Only patients can access the patient profile endpoint');
  }

  // 1. Check if patient record exists for this user_id
  let { data: patient, error } = await supabase
    .from('patients')
    .select(`
      *,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
    `)
    .eq('user_id', req.user.id)
    .maybeSingle();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to query patient profile');
  }

  // 2. If no patient record exists and user is a patient, auto-create initial patient record
  if (!patient && req.user.role === 'patient') {
    const { data: newPatient, error: createErr } = await supabase
      .from('patients')
      .insert({
        user_id: req.user.id,
        phone: req.user.phone || null,
      })
      .select(`
        *,
        user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
      `)
      .single();

    if (createErr) {
      res.status(500);
      throw new Error(createErr.message || 'Failed to initialize patient profile');
    }
    patient = newPatient;
  }

  if (!patient) {
    res.status(404);
    throw new Error('Patient profile not found');
  }

  res.status(200).json({
    success: true,
    data: formatPatientRecord(patient),
  });
});

/**
 * @route   PUT /api/patients/me
 * @desc    Update current authenticated patient's profile
 * @access  Private (Patient)
 */
export const updateCurrentPatientProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== 'patient' && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden: Only patients can update their profile');
  }

  // Fetch current patient record ID
  const { data: existingPatient, error: fetchErr } = await supabase
    .from('patients')
    .select('id, user_id')
    .eq('user_id', req.user.id)
    .single();

  if (fetchErr || !existingPatient) {
    res.status(404);
    throw new Error('Patient profile not found. Please load your profile first.');
  }

  const {
    phone,
    date_of_birth,
    dateOfBirth,
    gender,
    blood_group,
    bloodGroup,
    address,
    city,
    state,
    postal_code,
    postalCode,
    emergency_contact_name,
    emergencyContactName,
    emergency_contact_phone,
    emergencyContactPhone,
    emergency_contact_relation,
    emergencyContactRelation,
    // Attempted disallowed fields (will be ignored)
    role,
    status,
    patient_id,
    user_id,
    id,
  } = req.body;

  // Strict check: rejecting attempts to escalate role
  if (role !== undefined || status !== undefined) {
    res.status(400);
    throw new Error('Invalid update: Patient is not authorized to change role or account status');
  }

  // Build clean update object of allowed fields only
  const updates = {};
  if (phone !== undefined) updates.phone = phone ? String(phone).trim() : null;

  const targetDOB = date_of_birth !== undefined ? date_of_birth : dateOfBirth;
  if (targetDOB !== undefined) updates.date_of_birth = targetDOB || null;

  if (gender !== undefined) {
    const g = gender ? String(gender).toLowerCase().trim() : null;
    if (g && !VALID_GENDERS.includes(g)) {
      res.status(400);
      throw new Error(`Invalid gender. Allowed values: ${VALID_GENDERS.join(', ')}`);
    }
    updates.gender = g;
  }

  const targetBG = blood_group !== undefined ? blood_group : bloodGroup;
  if (targetBG !== undefined) {
    const bg = targetBG ? String(targetBG).toUpperCase().trim() : null;
    if (bg && !VALID_BLOOD_GROUPS.includes(bg)) {
      res.status(400);
      throw new Error(`Invalid blood group. Allowed values: ${VALID_BLOOD_GROUPS.join(', ')}`);
    }
    updates.blood_group = bg;
  }

  if (address !== undefined) updates.address = address ? String(address).trim() : null;
  if (city !== undefined) updates.city = city ? String(city).trim() : null;
  if (state !== undefined) updates.state = state ? String(state).trim() : null;

  const targetPostal = postal_code !== undefined ? postal_code : postalCode;
  if (targetPostal !== undefined) updates.postal_code = targetPostal ? String(targetPostal).trim() : null;

  const targetEmergName = emergency_contact_name !== undefined ? emergency_contact_name : emergencyContactName;
  if (targetEmergName !== undefined) updates.emergency_contact_name = targetEmergName ? String(targetEmergName).trim() : null;

  const targetEmergPhone = emergency_contact_phone !== undefined ? emergency_contact_phone : emergencyContactPhone;
  if (targetEmergPhone !== undefined) updates.emergency_contact_phone = targetEmergPhone ? String(targetEmergPhone).trim() : null;

  const targetEmergRel = emergency_contact_relation !== undefined ? emergency_contact_relation : emergencyContactRelation;
  if (targetEmergRel !== undefined) updates.emergency_contact_relation = targetEmergRel ? String(targetEmergRel).trim() : null;

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const { data: updatedPatient, error: updateErr } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', existingPatient.id)
    .select(`
      *,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
    `)
    .single();

  if (updateErr) {
    res.status(500);
    throw new Error(updateErr.message || 'Failed to update patient profile');
  }

  // Also sync phone back to user table if provided
  if (updates.phone) {
    await supabase.from('users').update({ phone: updates.phone }).eq('id', req.user.id);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: formatPatientRecord(updatedPatient),
  });
});

/**
 * @route   GET /api/patients
 * @desc    Get patients list with search, filter, and pagination (Admin only)
 * @access  Private (Admin only)
 */
export const getPatients = asyncHandler(async (req, res) => {
  const { patientId, search, status, page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (pageNum - 1) * pageLimit;

  let query = supabase
    .from('patients')
    .select(`
      id,
      patient_id,
      date_of_birth,
      gender,
      blood_group,
      phone,
      city,
      state,
      created_at,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, status, avatar_url)
    `, { count: 'exact' });

  if (patientId) {
    query = query.ilike('patient_id', `%${patientId.trim()}%`);
  }

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageLimit - 1);

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch patients list');
  }

  // Filter in memory for user full_name or email search if query param provided
  let filtered = (data || []).map(formatPatientRecord);

  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.patient_id.toLowerCase().includes(term) ||
        p.fullName.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        (p.phone && p.phone.includes(term))
    );
  }

  if (status) {
    filtered = filtered.filter((p) => p.userStatus === status);
  }

  res.status(200).json({
    success: true,
    count: filtered.length,
    totalCount: count,
    page: pageNum,
    totalPages: Math.ceil((count || 0) / pageLimit),
    data: filtered,
  });
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get single patient by UUID or patient_id
 * @access  Private (Admin or the Patient themselves)
 */
export const getPatientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Determine if id is a UUID or a patient_id string (PAT-XXXXXX)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  let query = supabase
    .from('patients')
    .select(`
      *,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
    `);

  if (isUUID) {
    query = query.eq('id', id);
  } else {
    query = query.eq('patient_id', id);
  }

  const { data: patient, error } = await query.maybeSingle();

  if (error || !patient) {
    res.status(404);
    throw new Error('Patient record not found');
  }

  // Authorization check: Patient can only view their own record
  if (req.user.role === 'patient' && patient.user_id !== req.user.id) {
    res.status(403);
    throw new Error('Forbidden: Access denied to another patient\'s profile');
  }

  res.status(200).json({
    success: true,
    data: formatPatientRecord(patient),
  });
});

/**
 * @route   GET /api/patients/by-user/:userId
 * @desc    Get patient profile by user UUID
 * @access  Private (Admin or the Patient themselves)
 */
export const getPatientByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (req.user.role === 'patient' && req.user.id !== userId) {
    res.status(403);
    throw new Error('Forbidden: Access denied to another patient\'s profile');
  }

  const { data: patient, error } = await supabase
    .from('patients')
    .select(`
      *,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
    `)
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !patient) {
    res.status(404);
    throw new Error('Patient record not found for this user');
  }

  res.status(200).json({
    success: true,
    data: formatPatientRecord(patient),
  });
});

/**
 * @route   GET /api/patients/by-clerk/:clerkUserId
 * @desc    Get patient profile by Clerk User ID
 * @access  Private (Admin or the Patient themselves)
 */
export const getPatientByClerkUserId = asyncHandler(async (req, res) => {
  const { clerkUserId } = req.params;

  if (req.user.role === 'patient' && req.auth.userId !== clerkUserId) {
    res.status(403);
    throw new Error('Forbidden: Access denied');
  }

  // 1. Lookup user by clerk_user_id
  const { data: user, error: uErr } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle();

  if (uErr || !user) {
    res.status(404);
    throw new Error('User not found for this Clerk ID');
  }

  // 2. Lookup patient by user_id
  const { data: patient, error: pErr } = await supabase
    .from('patients')
    .select(`
      *,
      user:users!patients_user_id_fkey(id, clerk_user_id, full_name, email, phone, avatar_url, status)
    `)
    .eq('user_id', user.id)
    .maybeSingle();

  if (pErr || !patient) {
    res.status(404);
    throw new Error('Patient profile not found');
  }

  res.status(200).json({
    success: true,
    data: formatPatientRecord(patient),
  });
});
