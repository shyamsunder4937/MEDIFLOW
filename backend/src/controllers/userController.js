// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - User Controller
// Handles user profile and account management via Supabase (PostgreSQL)
// ═══════════════════════════════════════════════════════════════════════════

import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

/**
 * @route   GET /api/users/me
 * @desc    Get current authenticated user profile
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user is already attached by requireAuth middleware
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.user.id)
    .single();

  if (error || !user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Provide both full_name & name, clerk_user_id & clerkId for frontend convenience
  const formattedUser = {
    ...user,
    name: user.full_name,
    clerkId: user.clerk_user_id,
  };

  res.status(200).json({
    success: true,
    data: formattedUser,
  });
});

/**
 * @route   PUT /api/users/me
 * @desc    Update current user profile
 * @access  Private
 */
export const updateCurrentUser = asyncHandler(async (req, res) => {
  const { name, full_name, phone, avatar_url, avatarUrl } = req.body;

  // Build update object with only provided fields
  const updates = {};
  if (full_name !== undefined || name !== undefined) {
    updates.full_name = full_name !== undefined ? full_name : name;
  }
  if (phone !== undefined) updates.phone = phone;
  if (avatar_url !== undefined || avatarUrl !== undefined) {
    updates.avatar_url = avatar_url !== undefined ? avatar_url : avatarUrl;
  }

  if (Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('No valid fields provided for update');
  }

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', req.user.id)
    .select()
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to update user');
  }

  const formattedUser = {
    ...updatedUser,
    name: updatedUser.full_name,
    clerkId: updatedUser.clerk_user_id,
  };

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: formattedUser,
  });
});

/**
 * @route   POST /api/users/sync
 * @desc    Sync user from Clerk to Supabase (called after Clerk auth)
 * @access  Public (or authenticated)
 */
export const syncUserFromClerk = asyncHandler(async (req, res) => {
  const { clerkId, clerk_user_id, email, name, full_name, role, avatarUrl, avatar_url, phone } = req.body;

  const targetClerkId = clerk_user_id || clerkId;
  const targetName = full_name || name;
  const targetAvatar = avatar_url || avatarUrl || null;

  if (!targetClerkId || !email || !targetName) {
    res.status(400);
    throw new Error('Missing required fields: clerkId, email, name');
  }

  // Upsert: insert or update if clerk_user_id already exists
  const upsertData = {
    clerk_user_id: targetClerkId,
    email,
    full_name: targetName,
    role: role || 'patient',
    status: 'active',
  };

  if (targetAvatar) upsertData.avatar_url = targetAvatar;
  if (phone) upsertData.phone = phone;

  const { data: user, error } = await supabase
    .from('users')
    .upsert(
      upsertData,
      {
        onConflict: 'clerk_user_id',
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to sync user');
  }

  const formattedUser = {
    ...user,
    name: user.full_name,
    clerkId: user.clerk_user_id,
  };

  res.status(200).json({
    success: true,
    message: 'User synced successfully',
    data: formattedUser,
  });
});

/**
 * @route   GET /api/users
 * @desc    Get users list with optional role and status filtering
 * @access  Private (Admin or Staff)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const { role, status } = req.query;

  let query = supabase
    .from('users')
    .select('id, clerk_user_id, full_name, email, phone, role, status, avatar_url, created_at')
    .order('created_at', { ascending: false });

  if (role) query = query.eq('role', role);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;

  if (error) {
    res.status(500);
    throw new Error(error.message || 'Failed to fetch users');
  }

  const formatted = (data || []).map((u) => ({
    ...u,
    name: u.full_name,
    clerkId: u.clerk_user_id,
  }));

  res.status(200).json({
    success: true,
    count: formatted.length,
    data: formatted,
  });
});
