// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — User Service (Module 2: Hospital Structure)
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
 * Fetch users with optional role and status filters (Admin only)
 * @param {Object} [filters] - { role, status }
 * @param {string} [token]
 */
export const getUsers = async (filters = {}, token) => {
  const headers = await getHeaders(token);
  const url = new URL(`${API_BASE_URL}/users`);
  if (filters.role) url.searchParams.append('role', filters.role);
  if (filters.status) url.searchParams.append('status', filters.status);

  const res = await fetch(url.toString(), { headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Failed to fetch users');
  }

  return json.data || [];
};
