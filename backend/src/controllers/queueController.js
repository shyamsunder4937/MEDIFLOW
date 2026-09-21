// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Queue Controller (Module 5: Queue Management)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const VALID_STATUSES = ['waiting', 'called', 'in_consultation', 'completed', 'cancelled', 'no_show'];
const VALID_PRIORITIES = ['normal', 'priority'];

/**
 * Helper: Format queue with joined data
 */
const formatQueue = (queue) => {
  if (!queue) return null;
  
  const patient = queue.patient || {};
  const doctor = queue.doctor || {};
  const department = queue.department || {};
  const appointment = queue.appointment || {};
  
  return {
    ...queue,
    patientName: patient.user?.full_name || 'Unknown Patient',
    patientNumber: patient.patient_id || '',
    doctorName: doctor.user?.full_name || 'Unknown Doctor',
    doctorRoom: doctor.room_number || '',
    departmentName: department.name || 'Unknown Department',
    appointmentNumber: appointment.appointment_number || '',
    appointmentTime: appointment.start_time || '',
  };
};

/**
 * @route   POST /api/queues/check-in
 * @desc    Check in patient and create queue entry
 * @access  Private (Staff, Admin)
 */
export const checkInPatient = asyncHandler(async (req, res) => {
  const { appointment_id, priority = 'normal' } = req.body;

  if (!appointment_id) {
    res.status(400);
    throw new Error('appointment_id is required');
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    res.status(400);
    throw new Error(`Invalid priority. Allowed: ${VALID_PRIORITIES.join(', ')}`);
  }

  // 1. Verify appointment exists and get details
  const { data: appointment, error: aptErr } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patients!appointments_patient_id_fkey(id, patient_id, user:users!patients_user_id_fkey(full_name, status)),
      doctor:doctors!appointments_doctor_id_fkey(id, user:users!doctors_user_id_fkey(full_name, status), working_status),
      department:departments!appointments_department_id_fkey(id, name, status)
    `)
    .eq('id', appointment_id)
    .single();

  if (aptErr || !appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // 2. Validate appointment status
  if (!['scheduled', 'confirmed'].includes(appointment.status)) {
    res.status(400);
    throw new Error(`Cannot check in appointment with status: ${appointment.status}`);
  }

  // 3. Validate appointment date (must be today or in the past for check-in)
  const today = new Date().toISOString().split('T')[0];
  if (appointment.appointment_date > today) {
    res.status(400);
    throw new Error('Cannot check in for future appointments');
  }

  // 4. Verify patient is active
  if (appointment.patient?.user?.status !== 'active') {
    res.status(400);
    throw new Error('Patient account is not active');
  }

  // 5. Verify doctor is active and available
  if (appointment.doctor?.user?.status !== 'active') {
    res.status(400);
    throw new Error('Doctor is not active');
  }

  if (appointment.doctor?.working_status === 'on_leave' || appointment.doctor?.working_status === 'unavailable') {
    res.status(400);
    throw new Error('Doctor is currently unavailable');
  }

  // 6. Verify department is active
  if (appointment.department?.status !== 'active') {
    res.status(400);
    throw new Error('Department is not active');
  }

  // 7. Check if already checked in (duplicate prevention)
  const { data: existingQueue } = await supabase
    .from('queues')
    .select('id, queue_number, status')
    .eq('appointment_id', appointment_id)
    .single();

  if (existingQueue) {
    res.status(409);
    throw new Error(`Patient already checked in with queue number ${existingQueue.queue_number}`);
  }

  // 8. Generate queue number (thread-safe)
  const queueDate = appointment.appointment_date;
  const { data: queueNumberResult, error: queueNumErr } = await supabase
    .rpc('generate_queue_number', {
      p_department_id: appointment.department_id,
      p_queue_date: queueDate
    });

  if (queueNumErr) {
    res.status(500);
    throw new Error('Failed to generate queue number: ' + queueNumErr.message);
  }

  const queueNumber = queueNumberResult;

  // 9. Create queue entry
  const { data: newQueue, error: createErr } = await supabase
    .from('queues')
    .insert({
      queue_number: queueNumber,
      patient_id: appointment.patient_id,
      appointment_id: appointment.id,
      doctor_id: appointment.doctor_id,
      department_id: appointment.department_id,
      queue_date: queueDate,
      status: 'waiting',
      priority: priority,
      check_in_time: new Date().toISOString(),
    })
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name, location),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, start_time)
    `)
    .single();

  if (createErr) {
    res.status(500);
    throw new Error(createErr.message || 'Failed to create queue entry');
  }

  res.status(201).json({
    success: true,
    message: 'Patient checked in successfully',
    data: formatQueue(newQueue),
  });
});

/**
 * @route   GET /api/queues/my
 * @desc    Get current user's queue (patient)
 * @access  Private (Patient)
 */
export const getMyQueue = asyncHandler(async (req, res) => {
  if (req.user.role !== 'patient') {
    res.status(403);
    throw new Error('Only patients can access this endpoint');
  }

  // Get patient record
  const { data: patientRecord } = await supabase
    .from('patients')
    .select('id')
    .eq('user_id', req.user.id)
    .single();

  if (!patientRecord) {
    res.status(404);
    throw new Error('Patient profile not found');
  }

  // Get today's queue entry
  const today = new Date().toISOString().split('T')[0];
  const { data: queue, error } = await supabase
    .from('queues')
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, phone)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, specialization, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name, location),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, start_time, reason)
    `)
    .eq('patient_id', patientRecord.id)
    .eq('queue_date', today)
    .in('status', ['waiting', 'called', 'in_consultation'])
    .single();

  if (error || !queue) {
    res.status(404);
    throw new Error('No active queue found for today');
  }

  res.status(200).json({
    success: true,
    data: formatQueue(queue),
  });
});

/**
 * @route   GET /api/queues/doctor/my
 * @desc    Get doctor's queue for today
 * @access  Private (Doctor)
 */
export const getMyDoctorQueue = asyncHandler(async (req, res) => {
  if (req.user.role !== 'doctor') {
    res.status(403);
    throw new Error('Only doctors can access this endpoint');
  }

  const { date } = req.query;
  const queueDate = date || new Date().toISOString().split('T')[0];

  // Get doctor record
  const { data: doctorRecord } = await supabase
    .from('doctors')
    .select('id')
    .eq('user_id', req.user.id)
    .single();

  if (!doctorRecord) {
    res.status(404);
    throw new Error('Doctor profile not found');
  }

  // Get doctor's queue
  const { data, error } = await supabase
    .from('queues')
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, phone)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, start_time, reason)
    `)
    .eq('doctor_id', doctorRecord.id)
    .eq('queue_date', queueDate)
    .order('priority', { ascending: false }) // priority first
    .order('queue_number', { ascending: true }); // then by queue number

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch queue');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data: data.map(formatQueue),
  });
});

/**
 * @route   GET /api/queues/department/:departmentId
 * @desc    Get department queue (staff/admin)
 * @access  Private (Staff, Admin)
 */
export const getDepartmentQueue = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const { date, status } = req.query;

  const queueDate = date || new Date().toISOString().split('T')[0];

  let query = supabase
    .from('queues')
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, phone)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name, location),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, start_time, reason)
    `)
    .eq('department_id', departmentId)
    .eq('queue_date', queueDate);

  if (status) {
    query = query.eq('status', status);
  }

  query = query
    .order('priority', { ascending: false })
    .order('queue_number', { ascending: true });

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch department queue');
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data: data.map(formatQueue),
  });
});

/**
 * @route   GET /api/queues/:id
 * @desc    Get single queue entry by ID
 * @access  Private (Owner, Doctor, Staff, Admin)
 */
export const getQueueById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: queue, error } = await supabase
    .from('queues')
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, email, phone)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, specialization, user:users!doctors_user_id_fkey(full_name, email)
      ),
      department:departments!queues_department_id_fkey(id, name, code, location),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, start_time, reason)
    `)
    .eq('id', id)
    .single();

  if (error || !queue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  // Authorization checks
  if (req.user.role === 'patient') {
    const { data: patientRecord } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!patientRecord || queue.patient_id !== patientRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Access denied');
    }
  } else if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || queue.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Access denied');
    }
  }

  res.status(200).json({
    success: true,
    data: formatQueue(queue),
  });
});

/**
 * @route   PUT /api/queues/:id/call
 * @desc    Call next patient (transition waiting → called)
 * @access  Private (Doctor, Staff, Admin)
 */
export const callPatient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Verify queue exists
  const { data: existingQueue, error: fetchErr } = await supabase
    .from('queues')
    .select('*, doctor:doctors(user_id)')
    .eq('id', id)
    .single();

  if (fetchErr || !existingQueue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  // Authorization: Doctor can only call their own patients
  if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || existingQueue.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Can only call your own patients');
    }
  }

  // Validate status transition
  if (existingQueue.status !== 'waiting') {
    res.status(400);
    throw new Error(`Cannot call patient with status: ${existingQueue.status}`);
  }

  // Update status to called
  const { data: updatedQueue, error: updateErr } = await supabase
    .from('queues')
    .update({
      status: 'called',
      called_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number)
    `)
    .single();

  if (updateErr) {
    res.status(500);
    throw new Error(updateErr.message || 'Failed to call patient');
  }

  res.status(200).json({
    success: true,
    message: 'Patient called successfully',
    data: formatQueue(updatedQueue),
  });
});

/**
 * @route   PUT /api/queues/:id/start-consultation
 * @desc    Start consultation (transition called → in_consultation)
 * @access  Private (Doctor, Staff, Admin)
 */
export const startConsultation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: existingQueue, error: fetchErr } = await supabase
    .from('queues')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchErr || !existingQueue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  // Authorization: Doctor can only start consultation for their patients
  if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || existingQueue.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Can only start consultation for your patients');
    }
  }

  // Validate status transition
  if (!['called', 'waiting'].includes(existingQueue.status)) {
    res.status(400);
    throw new Error(`Cannot start consultation from status: ${existingQueue.status}`);
  }

  const { data: updatedQueue, error: updateErr } = await supabase
    .from('queues')
    .update({
      status: 'in_consultation',
      consultation_started_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number)
    `)
    .single();

  if (updateErr) {
    res.status(500);
    throw new Error(updateErr.message || 'Failed to start consultation');
  }

  res.status(200).json({
    success: true,
    message: 'Consultation started successfully',
    data: formatQueue(updatedQueue),
  });
});

/**
 * @route   PUT /api/queues/:id/complete
 * @desc    Complete queue entry (transition in_consultation → completed)
 * @access  Private (Doctor, Staff, Admin)
 */
export const completeQueue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: existingQueue, error: fetchErr } = await supabase
    .from('queues')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchErr || !existingQueue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  // Authorization
  if (req.user.role === 'doctor') {
    const { data: doctorRecord } = await supabase
      .from('doctors')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!doctorRecord || existingQueue.doctor_id !== doctorRecord.id) {
      res.status(403);
      throw new Error('Forbidden: Can only complete your own consultations');
    }
  }

  // Validate status transition
  if (existingQueue.status !== 'in_consultation') {
    res.status(400);
    throw new Error(`Cannot complete queue from status: ${existingQueue.status}`);
  }

  const { data: updatedQueue, error: updateErr } = await supabase
    .from('queues')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number)
    `)
    .single();

  if (updateErr) {
    res.status(500);
    throw new Error(updateErr.message || 'Failed to complete queue');
  }

  res.status(200).json({
    success: true,
    message: 'Queue completed successfully',
    data: formatQueue(updatedQueue),
  });
});

/**
 * @route   PUT /api/queues/:id/cancel
 * @desc    Cancel queue entry
 * @access  Private (Staff, Admin)
 */
export const cancelQueue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const { data: updatedQueue, error } = await supabase
    .from('queues')
    .update({
      status: 'cancelled',
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to cancel queue');
  }

  if (!updatedQueue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  res.status(200).json({
    success: true,
    message: 'Queue cancelled successfully',
    data: formatQueue(updatedQueue),
  });
});

/**
 * @route   PUT /api/queues/:id/no-show
 * @desc    Mark patient as no-show
 * @access  Private (Staff, Admin)
 */
export const markNoShow = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: updatedQueue, error } = await supabase
    .from('queues')
    .update({
      status: 'no_show',
    })
    .eq('id', id)
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name)
      ),
      doctor:doctors!queues_doctor_id_fkey(
        id, room_number, user:users!doctors_user_id_fkey(full_name)
      ),
      department:departments!queues_department_id_fkey(id, name),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number)
    `)
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to mark no-show');
  }

  if (!updatedQueue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  res.status(200).json({
    success: true,
    message: 'Patient marked as no-show',
    data: formatQueue(updatedQueue),
  });
});

/**
 * @route   GET /api/queues/:id/position
 * @desc    Get queue position (patients ahead)
 * @access  Private (Owner, Doctor, Staff, Admin)
 */
export const getQueuePosition = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get the queue entry
  const { data: queue, error } = await supabase
    .from('queues')
    .select('queue_number, department_id, queue_date, status, priority')
    .eq('id', id)
    .single();

  if (error || !queue) {
    res.status(404);
    throw new Error('Queue entry not found');
  }

  // Count patients ahead (considering priority)
  const { count: patientsAhead, error: countErr } = await supabase
    .from('queues')
    .select('*', { count: 'exact', head: true })
    .eq('department_id', queue.department_id)
    .eq('queue_date', queue.queue_date)
    .in('status', ['waiting', 'called'])
    .or(
      `and(priority.eq.priority,queue_number.lt.${queue.queue_number}),priority.eq.priority,and(priority.eq.normal,queue_number.lt.${queue.queue_number})`
    );

  if (countErr) {
    res.status(500);
    throw new Error('Failed to calculate queue position');
  }

  res.status(200).json({
    success: true,
    data: {
      queueNumber: queue.queue_number,
      status: queue.status,
      patientsAhead: patientsAhead || 0,
    },
  });
});

/**
 * @route   GET /api/queues/doctor/:doctorId/next
 * @desc    Get next patient for doctor to call
 * @access  Private (Doctor, Staff, Admin)
 */
export const getNextPatient = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  const queueDate = date || new Date().toISOString().split('T')[0];

  // Get next waiting patient (priority first, then queue_number)
  const { data: nextPatient, error } = await supabase
    .from('queues')
    .select(`
      *,
      patient:patients!queues_patient_id_fkey(
        id, patient_id, user:users!patients_user_id_fkey(full_name, phone)
      ),
      appointment:appointments!queues_appointment_id_fkey(id, appointment_number, reason)
    `)
    .eq('doctor_id', doctorId)
    .eq('queue_date', queueDate)
    .eq('status', 'waiting')
    .order('priority', { ascending: false })
    .order('queue_number', { ascending: true })
    .limit(1)
    .single();

  if (error || !nextPatient) {
    res.status(404);
    throw new Error('No waiting patients found');
  }

  res.status(200).json({
    success: true,
    data: formatQueue(nextPatient),
  });
});
