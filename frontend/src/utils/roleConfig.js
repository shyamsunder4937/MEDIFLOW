// ─────────────────────────────────────────────────────────────────────────────
// MediFlow AI — Role Configuration & Management
// Centralized role definitions and routing logic
// ─────────────────────────────────────────────────────────────────────────────

export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  STAFF: 'staff',
  ADMIN: 'admin',
};

export const ROLE_ROUTES = {
  [USER_ROLES.PATIENT]: '/patient/dashboard',
  [USER_ROLES.DOCTOR]: '/doctor/dashboard',
  [USER_ROLES.STAFF]: '/staff/dashboard',
  [USER_ROLES.ADMIN]: '/admin/dashboard',
};

/**
 * Get user role from Clerk metadata or mock data
 * In Phase 2, this will use: user.publicMetadata.role or MongoDB
 */
export const getUserRole = (clerkUser) => {
  // Phase 2: Use Clerk metadata
  // return clerkUser?.publicMetadata?.role || USER_ROLES.PATIENT;

  // Phase 1: Mock role from localStorage (development only)
  const mockRole = localStorage.getItem('mediflow_user_role');
  if (mockRole && Object.values(USER_ROLES).includes(mockRole)) {
    return mockRole;
  }

  // Default to patient
  return USER_ROLES.PATIENT;
};

/**
 * Get redirect path based on user role
 */
export const getRoleRedirectPath = (role) => {
  return ROLE_ROUTES[role] || ROLE_ROUTES[USER_ROLES.PATIENT];
};

/**
 * Check if user has required role
 */
export const hasRole = (clerkUser, requiredRole) => {
  const userRole = getUserRole(clerkUser);
  return userRole === requiredRole;
};

/**
 * Check if user has admin role
 */
export const isAdmin = (clerkUser) => {
  return hasRole(clerkUser, USER_ROLES.ADMIN);
};

/**
 * PHASE 1 MOCK DATA: Email to role mapping
 * Remove this in Phase 2 when using real role system
 */
const MOCK_USER_ROLES = {
  // Admins
  'shyamsunder3476@gmail.com': USER_ROLES.ADMIN,
  'admin@mediflow.ai': USER_ROLES.ADMIN,
  'admin@example.com': USER_ROLES.ADMIN,
  
  // Doctors
  'yelluriharshith10@gmail.com': USER_ROLES.DOCTOR,
  'doctor@mediflow.ai': USER_ROLES.DOCTOR,
  'arun.kumar@mediflow.ai': USER_ROLES.DOCTOR,
  
  // Staff
  'staff@mediflow.ai': USER_ROLES.STAFF,
  'reception@mediflow.ai': USER_ROLES.STAFF,
  
  // Patients (default)
  // All other emails will be treated as patients
};

/**
 * Get role by email (Phase 1 mock implementation)
 */
export const getRoleByEmail = (email) => {
  if (!email) return USER_ROLES.PATIENT;
  return MOCK_USER_ROLES[email.toLowerCase()] || USER_ROLES.PATIENT;
};
