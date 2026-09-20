// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Department Service (Module 2: Hospital Structure)
// Centralized frontend API service for hospital departments
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
 * Fetch all departments (active by default, or all if includeInactive is true)
 * @param {Object} options - { includeInactive: boolean }
 */
export const getDepartments = async (options = {}) => {
  const url = new URL(`${API_BASE_URL}/departments`);
  if (options.includeInactive) {
    url.searchParams.append('all', 'true');
  }

  const res = await fetch(url.toString());
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch departments');
  }

  return json.data || [];
};

/**
 * Fetch a single department by ID with associated doctors and staff
 * @param {string} id - Department UUID
 */
export const getDepartmentById = async (id) => {
  if (!id) throw new Error('Department ID is required');

  const res = await fetch(`${API_BASE_URL}/departments/${id}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch department');
  }

  return json.data;
};

/**
 * Create a new hospital department (Admin only)
 * @param {Object} departmentData - { name, code, description, location, status }
 * @param {string} [token] - Optional Clerk token
 */
export const createDepartment = async (departmentData, token) => {
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/departments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(departmentData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to create department');
  }

  return json.data;
};

/**
 * Update department details (Admin only)
 * @param {string} id - Department UUID
 * @param {Object} updates - Fields to update
 * @param {string} [token] - Optional Clerk token
 */
export const updateDepartment = async (id, updates, token) => {
  if (!id) throw new Error('Department ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/departments/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update department');
  }

  return json.data;
};

/**
 * Toggle department status active/inactive (Admin only)
 * @param {string} id - Department UUID
 * @param {'active'|'inactive'} status - Target status
 * @param {string} [token] - Optional Clerk token
 */
export const toggleDepartmentStatus = async (id, status, token) => {
  if (!id) throw new Error('Department ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/departments/${id}/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update department status');
  }

  return json.data;
};
