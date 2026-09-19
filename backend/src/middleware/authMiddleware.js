// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - Authentication & Authorization Middleware
// Uses Clerk for authentication verification
// ═══════════════════════════════════════════════════════════════════════════

import { clerkClient } from '@clerk/express';
import User from '../models/User.js';

/**
 * Middleware: Require Clerk Authentication
 * Verifies that the request has a valid Clerk session
 * Attaches authenticated user info to req.auth
 */
export const requireAuth = async (req, res, next) => {
  try {
    // Clerk middleware should have already verified the session
    // and attached req.auth with userId
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Authentication required',
      });
    }

    // Fetch user from our database using Clerk ID
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database',
      });
    }

    // Check if user account is active
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: `Account is ${user.status}`,
      });
    }

    // Attach user to request for use in controllers
    req.user = user;
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
 * Ensures authenticated user has one of the required roles
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
 * Attaches user if authenticated but doesn't reject if not
 * Useful for endpoints that work differently for authenticated users
 */
export const optionalAuth = async (req, res, next) => {
  try {
    if (req.auth && req.auth.userId) {
      const user = await User.findOne({ clerkId: req.auth.userId });
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    // Don't fail the request, just continue without user
    next();
  }
};
