// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Appointment Controller (Module 4: Appointment Management)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const VALID_APPOINTMENT_TYPES = ['consultation', 'follow_up', 'routine_checkup'];
const VALID_STATUSES = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'];

/**
 * Helper: Format appointment with joined data
 */
const formatAppointment = (appointment) => {
  if (!appointment) return null;
  
  const patient = appointment.patient || {};
  const doctor = appointment.doctor || {};
  const department = appointment.department || {};
  
  return {
    ...appointment,
    patientName: patient.user?.full_name || patient.fullName || 'Unknown Patient',
    patientEmail: patient.user?.email || patient.email || '',
    patient_number: patient.patient_id || '',
    doctorName: doctor.user?.full_name || doctor.fullName || 'Unknown Doctor',
    doctorSpecialization: doctor.specialization || '',
    doctorRoom: doctor.room_number || '',
    departmentName: department.name || 'Unknown Department',
    departmentLocation: department.location || '',
  };
};

/**
 * @route   POST /api/appointments
 * @desc    Create a new appointment (Patient creates for themselves)
 * @access  Private (Patient, Staff, Admin)
 */
export const createAppointment = asyncHandler(async (req, res) => {
  const {
    doctor_id,
    department_id,
    appointment_date,
    start_time,
    end_time,
    appointment_type = 'consultation',
    reason,
    notes,
  } = req.body;

  // Validation
  if (!doctor_id || !department_id || !appointment_date || !start_time || !end_time) {
    res.status(400);
    throw new Error('Missing required fields: doctor_id, department_id, appointment_date, start_time, end_time');
  }

  if (!VALID_APPOINTMENT_TYPES.includes(appointment_type)) {
    res.status(400);
    throw new Error(`Invalid appointment_type. Allowed: ${VALID_APPOINTMENT_TYPES.join(', ')}`);
  }

  // For patients, derive patient_id from authenticated user
  let patient_id;
  if (req.user.role === 'patient') {
    const { data: patientRecord, error: patientErr } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (patientErr || !patientRecord) {
      res.status(404);
      throw new Error('Patient profile not found. Please complete your profile first.');
    }

    patient_id = patientRecord.id;
  } else {
    // Staff/Admin must provide patient_id
    patient_id = req.body.patient_id;
    if (!patient_id) {
      res.status(400);
      throw new Error('patient_id is required for staff/admin');
    }
  }

  // Verify doctor exists and is active
  const { data: doctorData, error: doctorErr } = await supabase
    .from('doctors')
    .select('id, department_id, working_status, user:users!doctors_user_id_fkey(status)')
    .eq('id', doctor_id)
    .single();

  if (doctorErr || !doctorData) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  if (doctorData.user?.status !== 'active') {
    res.status(400);
    throw new Error('Selected doctor is not active');
  }

  if (doctorData.working_status === 'on_leave' || doctorData.working_status === 'unavailable') {
    res.status(400);
    throw new Error('Selected doctor is currently unavailable');
  }

  // Verify department exists
  const { data: deptData, error: deptErr } = await supabase
    .from('departments')
    .select('id, status')
    .eq('id', department_id)
    .single();

  if (deptErr || !deptData) {
    res.status(404);
    throw new Error('Department not found');
  }

  if (deptData.status !== 'active') {
    res.status(400);
    throw new Error('Selected department is not active');
  }

  // Create appointment
  const { data: newAppointment, error: createErr } = await supabase
    .from('appointments')
    .insert({
      patient_id,
      doctor_id,
      department_id,
      appointment_date,
      start_time,
      end_time,
      appointment_type,
      reason,
      notes,
      status: 'scheduled',
      created_by: req.user.id,
    })
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `)
    .single();

  if (createErr) {
    res.status(500);
    throw new Error(createErr.message || 'Failed to create appointment');
  }

  res.status(201).json({
    success: true,
    message: 'Appointment created successfully',
    data: formatAppointment(newAppointment),
  });
});

/**
 * @route   GET /api/appointments/my
 * @desc    Get current user's appointments (patient or doctor)
 * @access  Private (Patient, Doctor)
 */
export const getMyAppointments = asyncHandler(async (req, res) => {
  const { status, date, upcoming } = req.query;

  let query = supabase
    .from('appointments')
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email, phone)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name, email)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `);

  // Filter by role
  if (req.user.role === 'patient') {
    const { data: patientRecord } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!patientRecord) {
      res.status(404);
      throw new Error('Patient profile not found');
    }

    query = query.eq('patient_id', patientRecord.id);
  } else if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord) {
      res.status(404);
      throw new Error('Doctor profile not found');
    }

    query = query.eq('doctor_id', doctorRecord.id);
  }

  // Additional filters
  if (status) {
    query = query.eq('status', status);
  }

  if (date) {
    query = query.eq('appointment_date', date);
  }

  if (upcoming === 'true') {
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('appointment_date', today).in('status', ['scheduled', 'confirmed']);
  }

  query = query.order('appointment_date', { ascending: true }).order('start_time', { ascending: true });

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch appointments');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data: data.map(formatAppointment),
  });
});

/**
 * @route   GET /api/appointments
 * @desc    Get all appointments (Admin/Staff with filters)
 * @access  Private (Staff, Admin)
 */
export const getAppointments = asyncHandler(async (req, res) => {
  const { patient_id, doctor_id, department_id, status, date, page = 1, limit = 50 } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const offset = (pageNum - 1) * pageLimit;

  let query = supabase
    .from('appointments')
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `, { count: 'exact' });

  if (patient_id) query = query.eq('patient_id', patient_id);
  if (doctor_id) query = query.eq('doctor_id', doctor_id);
  if (department_id) query = query.eq('department_id', department_id);
  if (status) query = query.eq('status', status);
  if (date) query = query.eq('appointment_date', date);

  query = query
    .order('appointment_date', { ascending: false })
    .order('start_time', { ascending: false })
    .range(offset, offset + pageLimit - 1);

  const { data, count, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch appointments');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    totalCount: count,
    page: pageNum,
    totalPages: Math.ceil((count || 0) / pageLimit),
    data: data.map(formatAppointment),
  });
});

/**
 * @route   GET /api/appointments/:id
 * @desc    Get single appointment by ID or appointment_number
 * @access  Private (Owner or Staff/Admin)
 */
export const getAppointmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  let query = supabase
    .from('appointments')
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email, phone)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, qualification, user:users!doctors_user_id_fkey(full_name, email, phone)
      ),
      department:departments!appointments_department_id_fkey(id, name, code, location, description)
    `);

  if (isUUID) {
    query = query.eq('id', id);
  } else {
    query = query.eq('appointment_number', id);
  }

  const { data: appointment, error } = await query.maybeSingle();

  if (error || !appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Authorization: Patient can only view own, Doctor can only view assigned
  if (req.user.role === 'patient') {
    const { data: patientRecord } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!patientRecord || appointment.patient_id !== patientRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Access denied');
    }
  } else if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || appointment.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Access denied');
    }
  }

  res.status(200).json({
    success: true,
    data: formatAppointment(appointment),
  });
});

/**
 * @route   PUT /api/appointments/:id
 * @desc    Update appointment (status, reschedule, notes)
 * @access  Private (Owner or Staff/Admin)
 */
export const updateAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    status,
    appointment_date,
    start_time,
    end_time,
    notes,
    reason,
    // Disallowed fields
    patient_id,
    doctor_id,
    department_id,
    appointment_number,
  } = req.body;

  // Prevent changing ownership
  if (patient_id || doctor_id || department_id || appointment_number) {
    res.status(400);
    throw new Error('Cannot change appointment ownership or identifier');
  }

  // Fetch existing appointment
  const { data: existingAppt, error: fetchErr } = await supabase
    .from('appointments')
    .select('*, patient:patients(user_id), doctor:doctors(user_id)')
    .eq('id', id)
    .single();

  if (fetchErr || !existingAppt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Authorization checks
  if (req.user.role === 'patient') {
    const { data: patientRecord } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!patientRecord || existingAppt.patient_id !== patientRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Cannot modify another patient\'s appointment');
    }

    // Patients can only cancel or update notes
    if (status && status !== 'cancelled') {
      res.status(403);
      throw new Error('Patients can only cancel appointments');
    }
  } else if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || existingAppt.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Cannot modify another doctor\'s appointment');
    }
  }

  // Build updates
  const updates = {};
  if (status !== undefined && VALID_STATUSES.includes(status)) updates.status = status;
  if (appointment_date !== undefined) updates.appointment_date = appointment_date;
  if (start_time !== undefined) updates.start_time = start_time;
  if (end_time !== undefined) updates.end_time = end_time;
  if (notes !== undefined) updates.notes = notes;
  if (reason !== undefined) updates.reason = reason;

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields to update');
  }

  const { data: updatedAppt, error: updateErr } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `)
    .single();

  if (updateErr) {
    res.status(500);
    throw new Error(updateErr.message || 'Failed to update appointment');
  }

  res.status(200).json({
    success: true,
    message: 'Appointment updated successfully',
    data: formatAppointment(updatedAppt),
  });
});

/**
 * @route   PUT /api/appointments/:id/cancel
 * @desc    Cancel an appointment
 * @access  Private (Patient owner or Staff/Admin)
 */
export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cancellation_reason } = req.body;

  // Fetch existing appointment
  const { data: existingAppt, error: fetchErr } = await supabase
    .from('appointments')
    .select('*, patient:patients(user_id)')
    .eq('id', id)
    .single();

  if (fetchErr || !existingAppt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // Authorization for patients
  if (req.user.role === 'patient') {
    const { data: patientRecord } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!patientRecord || existingAppt.patient_id !== patientRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Cannot cancel another patient\'s appointment');
    }
  }

  // Update to cancelled
  const { data: cancelledAppt, error: cancelErr } = await supabase
    .from('appointments')
    .update({
      status: 'cancelled',
      notes: cancellation_reason
        ? `Cancelled: ${cancellation_reason}`
        : existingAppt.notes,
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `)
    .single();

  if (cancelErr) {
    res.status(500);
    throw new Error(cancelErr.message || 'Failed to cancel appointment');
  }

  res.status(200).json({
    success: true,
    message: 'Appointment cancelled successfully',
    data: formatAppointment(cancelledAppt),
  });
});

/**
 * @route   PUT /api/appointments/:id/confirm
 * @desc    Confirm an appointment (Staff/Admin/Doctor)
 * @access  Private (Staff, Admin, Doctor)
 */
export const confirmAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'patient') {
    res.status(403);
    throw new Error('Patients cannot confirm appointments');
  }

  const { data: confirmedAppt, error } = await supabase
    .from('appointments')
    .update({ status: 'confirmed' })
    .eq('id', id)
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!appointments_doctor_id_fkey(
        id, specialization, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!appointments_department_id_fkey(id, name, location)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to confirm appointment');
  }

  if (!confirmedAppt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  res.status(200).json({
    success: true,
    message: 'Appointment confirmed successfully',
    data: formatAppointment(confirmedAppt),
  });
});

