// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Queue Service (Module 5: Queue Management)
// Centralized frontend API service for queue operations
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
 * Check in patient for appointment (creates queue entry)
 * @param {string} appointmentId - Appointment UUID
 * @param {string} [priority='normal'] - Queue priority: 'normal' or 'priority'
 * @param {string} [token] - Optional Clerk token
 */
export const checkInPatient = async (appointmentId, priority = 'normal', token) => {
  if (!appointmentId) throw new Error('appointment_id is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/check-in`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ appointment_id: appointmentId, priority }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to check in patient');
  }

  return json.data;
};

/**
 * Get current patient's queue (today only)
 * @param {string} [token] - Optional Clerk token
 */
export const getMyQueue = async (token) => {
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/my`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch queue');
  }

  return json.data;
};

/**
 * Get doctor's queue for specific date
 * @param {string} [date] - Date in YYYY-MM-DD format (defaults to today)
 * @param {string} [token] - Optional Clerk token
 */
export const getMyDoctorQueue = async (date, token) => {
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/queues/doctor/my`);
  if (date) url.searchParams.append('date', date);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch doctor queue');
  }

  return json;
};

/**
 * Get department queue (staff/admin)
 * @param {string} departmentId - Department UUID
 * @param {string} [date] - Date in YYYY-MM-DD format (defaults to today)
 * @param {string} [status] - Filter by status
 * @param {string} [token] - Optional Clerk token
 */
export const getDepartmentQueue = async (departmentId, date, status, token) => {
  if (!departmentId) throw new Error('departmentId is required');
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/queues/department/${departmentId}`);
  if (date) url.searchParams.append('date', date);
  if (status) url.searchParams.append('status', status);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch department queue');
  }

  return json;
};

/**
 * Get queue by ID
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const getQueueById = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch queue');
  }

  return json.data;
};

/**
 * Get queue position (patients ahead)
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const getQueuePosition = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/position`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch queue position');
  }

  return json.data;
};

/**
 * Call patient (transition waiting → called)
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const callPatient = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/call`, {
    method: 'PUT',
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to call patient');
  }

  return json.data;
};

/**
 * Start consultation (transition called/waiting → in_consultation)
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const startConsultation = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/start-consultation`, {
    method: 'PUT',
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to start consultation');
  }

  return json.data;
};

/**
 * Complete queue entry (transition in_consultation → completed)
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const completeQueue = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/complete`, {
    method: 'PUT',
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to complete queue');
  }

  return json.data;
};

/**
 * Cancel queue entry
 * @param {string} queueId - Queue UUID
 * @param {string} [reason] - Cancellation reason
 * @param {string} [token] - Optional Clerk token
 */
export const cancelQueue = async (queueId, reason, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/cancel`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ reason }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to cancel queue');
  }

  return json.data;
};

/**
 * Mark patient as no-show
 * @param {string} queueId - Queue UUID
 * @param {string} [token] - Optional Clerk token
 */
export const markNoShow = async (queueId, token) => {
  if (!queueId) throw new Error('queueId is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/queues/${queueId}/no-show`, {
    method: 'PUT',
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to mark no-show');
  }

  return json.data;
};

/**
 * Get next patient to call for doctor
 * @param {string} doctorId - Doctor UUID
 * @param {string} [date] - Date in YYYY-MM-DD format (defaults to today)
 * @param {string} [token] - Optional Clerk token
 */
export const getNextPatient = async (doctorId, date, token) => {
  if (!doctorId) throw new Error('doctorId is required');
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/queues/doctor/${doctorId}/next`);
  if (date) url.searchParams.append('date', date);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch next patient');
  }

  return json.data;
};
