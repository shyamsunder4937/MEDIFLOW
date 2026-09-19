// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - User Controller
// Handles user profile and account management
// ═══════════════════════════════════════════════════════════════════════════

import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

/**
 * @route   GET /api/users/me
 * @desc    Get current authenticated user profile
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user is already attached by requireAuth middleware
  const user = await User.findById(req.user._id).select('-__v');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @route   PUT /api/users/me
 * @desc    Update current user profile
 * @access  Private
 */
export const updateCurrentUser = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update allowed fields only
  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
});

/**
 * @route   POST /api/users/sync
 * @desc    Sync user from Clerk to MongoDB
 * @access  Private (called after Clerk authentication)
 */
export const syncUserFromClerk = asyncHandler(async (req, res) => {
  const { clerkId, email, name, role } = req.body;

  if (!clerkId || !email || !name) {
    res.status(400);
    throw new Error('Missing required fields: clerkId, email, name');
  }

  // Check if user already exists
  let user = await User.findOne({ clerkId });

  if (user) {
    // Update existing user
    user.name = name;
    user.email = email;
    if (role) user.role = role;
    await user.save();
  } else {
    // Create new user
    user = await User.create({
      clerkId,
      email,
      name,
      role: role || 'patient',
      status: 'active',
    });
  }

  res.status(200).json({
    success: true,
    message: 'User synced successfully',
    data: user,
  });
});
