// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Staff Service (Module 2: Hospital Structure)
// Centralized frontend API service for hospital staff
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
 * Fetch staff members with optional filtering
 * @param {Object} [filters] - { departmentId, workingStatus, staffType }
 */
export const getStaff = async (filters = {}) => {
  const url = new URL(`${API_BASE_URL}/staff`);
  if (filters.departmentId) {
    url.searchParams.append('departmentId', filters.departmentId);
  }
  if (filters.workingStatus) {
    url.searchParams.append('workingStatus', filters.workingStatus);
  }
  if (filters.staffType) {
    url.searchParams.append('staffType', filters.staffType);
  }

  const res = await fetch(url.toString());
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch staff members');
  }

  return json.data || [];
};

/**
 * Fetch a single staff member by ID
 * @param {string} id - Staff UUID
 */
export const getStaffById = async (id) => {
  if (!id) throw new Error('Staff ID is required');

  const res = await fetch(`${API_BASE_URL}/staff/${id}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch staff member');
  }

  return json.data;
};

/**
 * Convenience helper: get staff by department
 * @param {string} departmentId
 */
export const getStaffByDepartment = async (departmentId) => {
  return getStaff({ departmentId });
};

/**
 * Create a new staff profile linked to user and department (Admin only)
 * @param {Object} staffData - { user_id, department_id, employee_id, staff_type, phone, working_status }
 * @param {string} [token]
 */
export const createStaff = async (staffData, token) => {
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers,
    body: JSON.stringify(staffData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to create staff profile');
  }

  return json.data;
};

/**
 * Update staff profile details
 * @param {string} id - Staff UUID
 * @param {Object} updates
 * @param {string} [token]
 */
export const updateStaff = async (id, updates, token) => {
  if (!id) throw new Error('Staff ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/staff/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update staff');
  }

  return json.data;
};

/**
 * Change a staff member's department (Admin only)
 * @param {string} id - Staff UUID
 * @param {string} [departmentId] - Target Department UUID (can be null/empty)
 * @param {string} [token]
 */
export const changeStaffDepartment = async (id, departmentId, token) => {
  if (!id) throw new Error('Staff ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/staff/${id}/department`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ departmentId: departmentId || null }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to change staff department');
  }

  return json.data;
};

/**
 * Change staff member working status
 * @param {string} id - Staff UUID
 * @param {'available'|'busy'|'unavailable'|'on_leave'} workingStatus
 * @param {string} [token]
 */
export const changeStaffWorkingStatus = async (id, workingStatus, token) => {
  if (!id || !workingStatus) throw new Error('Staff ID and workingStatus are required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/staff/${id}/working-status`, {
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
