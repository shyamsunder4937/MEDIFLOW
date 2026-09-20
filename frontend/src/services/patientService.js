// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Patient Service (Module 3: Patient Management)
// Centralized frontend API service for patient profiles and records
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
 * Fetch current authenticated patient's profile
 * @param {string} [token] - Optional Clerk token
 */
export const getCurrentPatientProfile = async (token) => {
  const headers = await getHeaders(token);
  const res = await fetch(`${API_BASE_URL}/patients/me`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch patient profile');
  }

  return json.data;
};

/**
 * Update current authenticated patient's profile
 * @param {string|null} patientId - Patient UUID or ID (optional, matches current user)
 * @param {Object} updates - Allowed update fields
 * @param {string} [token] - Optional Clerk token
 */
export const updatePatientProfile = async (patientId, updates, token) => {
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/patients/me`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update patient profile');
  }

  return json.data;
};

/**
 * Fetch a single patient by ID or human-readable patient_id (PAT-XXXXXX)
 * @param {string} patientId - UUID or PAT-XXXXXX
 * @param {string} [token]
 */
export const getPatientById = async (patientId, token) => {
  if (!patientId) throw new Error('Patient ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/patients/${encodeURIComponent(patientId)}`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch patient');
  }

  return json.data;
};

/**
 * Fetch patient by user UUID
 * @param {string} userId - User UUID
 * @param {string} [token]
 */
export const getPatientByUserId = async (userId, token) => {
  if (!userId) throw new Error('User ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/patients/by-user/${encodeURIComponent(userId)}`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch patient by user ID');
  }

  return json.data;
};

/**
 * Fetch patient by Clerk user ID
 * @param {string} clerkUserId - Clerk User ID (user_...)
 * @param {string} [token]
 */
export const getPatientByClerkUserId = async (clerkUserId, token) => {
  if (!clerkUserId) throw new Error('Clerk User ID is required');
  const headers = await getHeaders(token);

  const res = await fetch(`${API_BASE_URL}/patients/by-clerk/${encodeURIComponent(clerkUserId)}`, { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch patient by Clerk User ID');
  }

  return json.data;
};

/**
 * Fetch patient list with search and pagination (Admin only)
 * @param {Object} [options] - { patientId, search, status, page, limit }
 * @param {string} [token]
 */
export const getPatients = async (options = {}, token) => {
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/patients`);

  if (options.patientId) url.searchParams.append('patientId', options.patientId);
  if (options.search) url.searchParams.append('search', options.search);
  if (options.status) url.searchParams.append('status', options.status);
  if (options.page) url.searchParams.append('page', options.page);
  if (options.limit) url.searchParams.append('limit', options.limit);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch patients list');
  }

  return json;
};
