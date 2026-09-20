// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Doctor Service (Module 2: Hospital Structure)
// Centralized frontend API service for doctors
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
 * Fetch doctors with optional filtering
 * @param {Object} [filters] - { departmentId, workingStatus }
 */
export const getDoctors = async (filters = {}) => {
  const url = new URL(`${API_BASE_URL}/doctors`);
  if (filters.departmentId) {
    url.searchParams.append('departmentId', filters.departmentId);
  }
  if (filters.workingStatus) {
    url.searchParams.append('workingStatus', filters.workingStatus);
  }

  const res = await fetch(url.toString());
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch doctors');
  }

  return json.data || [];
};

/**
 * Fetch a single doctor by ID
 * @param {string} id - Doctor UUID
 */
export const getDoctorById = async (id) => {
  if (!id) throw new Error('Doctor ID is required');

  const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch doctor');
  }

  return json.data;
};

/**
 * Convenience helper: get doctors by department
 * @param {string} departmentId
 */
export const getDoctorsByDepartment = async (departmentId) => {
  return getDoctors({ departmentId });
};

/**
 * Create a new doctor profile linked to user and department (Admin only)
 * @param {Object} doctorData - { user_id, department_id, specialization, qualification, license_number, room_number, phone, working_status }
 * @param {string} [token]
 */
export const createDoctor = async (doctorData, token) => {
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/doctors`, {
    method: 'POST',
    headers,
    body: JSON.stringify(doctorData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to create doctor profile');
  }

  return json.data;
};

/**
 * Update doctor profile details
 * @param {string} id - Doctor UUID
 * @param {Object} updates
 * @param {string} [token]
 */
export const updateDoctor = async (id, updates, token) => {
  if (!id) throw new Error('Doctor ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/doctors/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update doctor');
  }

  return json.data;
};

/**
 * Change a doctor's department (Admin only)
 * @param {string} id - Doctor UUID
 * @param {string} departmentId - Target Department UUID
 * @param {string} [token]
 */
export const changeDoctorDepartment = async (id, departmentId, token) => {
  if (!id || !departmentId) throw new Error('Doctor ID and departmentId are required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/doctors/${id}/department`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ departmentId }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to change doctor department');
  }

  return json.data;
};

/**
 * Change doctor working status (available, busy, unavailable, on_leave)
 * @param {string} id - Doctor UUID
 * @param {'available'|'busy'|'unavailable'|'on_leave'} workingStatus
 * @param {string} [token]
 */
export const changeDoctorWorkingStatus = async (id, workingStatus, token) => {
  if (!id || !workingStatus) throw new Error('Doctor ID and workingStatus are required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/doctors/${id}/working-status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ workingStatus }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to change working status');
  }

  return json.data;
};
