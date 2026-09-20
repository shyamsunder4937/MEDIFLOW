// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Authentication & Authorization Middleware
// Uses Clerk for authentication verification + Supabase for user lookup
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';

/**
 * Middleware: Require Clerk Authentication
 * Verifies that the request has a valid Clerk session.
 * Fetches the corresponding user from Supabase and attaches to req.user.
 */
export const requireAuth = async (req, res, next) => {
  try {
    // Clerk middleware (clerkMiddleware()) must be mounted before this.
    // It populates req.auth with the verified session data.
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Authentication required',
      });
    }

    // Fetch user from Supabase by Clerk ID
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', req.auth.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database. Please sync your account.',
      });
    }

    // Check if user account is active
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: `Account is ${user.status}`,
      });
    }

    // Attach user to request for use in controllers (with name and clerkId alias)
    req.user = {
      ...user,
      name: user.full_name,
      clerkId: user.clerk_user_id,
    };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

/**
 * Middleware: Authorize Specific Roles
 * Ensures authenticated user has one of the required roles.
 *
 * Usage:
 *   router.get('/admin', requireAuth, authorizeRoles('admin'), controller)
 *   router.get('/medical', requireAuth, authorizeRoles('doctor', 'staff'), controller)
 *
 * @param {...string} roles - Allowed roles (patient, doctor, staff, admin)
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`,
        userRole: req.user.role,
      });
    }

    next();
  };
};

/**
 * Middleware: Admin Only
 * Shorthand for authorizeRoles('admin')
 */
export const adminOnly = authorizeRoles('admin');

/**
 * Middleware: Medical Staff Only
 * Allows doctors and staff members
 */
export const medicalStaffOnly = authorizeRoles('doctor', 'staff');

/**
 * Optional Auth Middleware
 * Attaches user if authenticated but doesn't reject if not.
 * Useful for endpoints that behave differently for authenticated users.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    if (req.auth && req.auth.userId) {
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_user_id', req.auth.userId)
        .single();

      if (user && user.status === 'active') {
        req.user = {
          ...user,
          name: user.full_name,
          clerkId: user.clerk_user_id,
        };
      }
    }
    next();
  } catch {
    // Don't fail the request, just continue without user
    next();
  }
};
