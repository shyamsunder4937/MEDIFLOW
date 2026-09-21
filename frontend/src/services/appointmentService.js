// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Appointment Service (Module 4: Appointment Management)
// Centralized frontend API service for appointment operations
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = async (token) => {
  const authToken = token || (await window.Clerk?.session?.getToken?.());
  const headers = { 'Content-Type': 'application/json' };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return headers;
};

/**
 * Create a new appointment
 * @param {Object} appointmentData - { doctor_id, department_id, appointment_date, start_time, end_time, appointment_type, reason, notes }
 * @param {string} [token] - Optional Clerk token
 */
export const createAppointment = async (appointmentData, token) => {
  const headers = await getHeaders(token);
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(appointmentData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to create appointment');
  }

  return json.data;
};

/**
 * Get current user's appointments (patient or doctor)
 * @param {Object} [options] - { status, date, upcoming }
 * @param {string} [token] - Optional Clerk token
 */
export const getMyAppointments = async (options = {}, token) => {
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/appointments/my`);

  if (options.status) url.searchParams.append('status', options.status);
  if (options.date) url.searchParams.append('date', options.date);
  if (options.upcoming) url.searchParams.append('upcoming', 'true');

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch appointments');
  }

  return json;
};

/**
 * Get all appointments (admin/staff only)
 * @param {Object} [options] - { patient_id, doctor_id, department_id, status, date, page, limit }
 * @param {string} [token] - Optional Clerk token
 */
export const getAppointments = async (options = {}, token) => {
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/appointments`);

  if (options.patient_id) url.searchParams.append('patient_id', options.patient_id);
  if (options.doctor_id) url.searchParams.append('doctor_id', options.doctor_id);
  if (options.department_id) url.searchParams.append('department_id', options.department_id);
  if (options.status) url.searchParams.append('status', options.status);
  if (options.date) url.searchParams.append('date', options.date);
  if (options.page) url.searchParams.append('page', options.page);
  if (options.limit) url.searchParams.append('limit', options.limit);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch appointments');
  }

  return json;
};

/**
 * Get appointment by ID or appointment_number
 * @param {string} id - UUID or appointment_number (APT-XXXXXX)
 * @param {string} [token] - Optional Clerk token
 */
export const getAppointmentById = async (id, token) => {
  if (!id) throw new Error('Appointment ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/appointments/${encodeURIComponent(id)}`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch appointment');
  }

  return json.data;
};

/**
 * Update appointment
 * @param {string} id - Appointment UUID
 * @param {Object} updates - { status, appointment_date, start_time, end_time, notes, reason }
 * @param {string} [token] - Optional Clerk token
 */
export const updateAppointment = async (id, updates, token) => {
  if (!id) throw new Error('Appointment ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/appointments/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update appointment');
  }

  return json.data;
};

/**
 * Cancel appointment
 * @param {string} id - Appointment UUID or appointment_number
 * @param {string} [cancellation_reason] - Reason for cancellation
 * @param {string} [token] - Optional Clerk token
 */
export const cancelAppointment = async (id, cancellation_reason, token) => {
  if (!id) throw new Error('Appointment ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/appointments/${encodeURIComponent(id)}/cancel`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ cancellation_reason }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to cancel appointment');
  }

  return json.data;
};

/**
 * Confirm appointment (staff/admin/doctor only)
 * @param {string} id - Appointment UUID
 * @param {string} [token] - Optional Clerk token
 */
export const confirmAppointment = async (id, token) => {
  if (!id) throw new Error('Appointment ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/appointments/${encodeURIComponent(id)}/confirm`, {
    method: 'PUT',
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to confirm appointment');
  }

  return json.data;
};

