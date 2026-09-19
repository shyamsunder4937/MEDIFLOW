// ═══════════════════════════════════════════════════════════════════════════
// MediFlow AI - User Model
// Primary user record synchronized with Clerk authentication
// ═══════════════════════════════════════════════════════════════════════════

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Clerk authentication ID (unique identifier from Clerk)
    clerkId: {
      type: String,
      required: [true, 'Clerk ID is required'],
      unique: true,
      index: true,
    },

    // User basic information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },

    phone: {
      type: String,
      trim: true,
      default: null,
    },

    // Role-based access control
    role: {
      type: String,
      required: [true, 'User role is required'],
      enum: {
        values: ['patient', 'doctor', 'staff', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'patient',
    },

    // Account status management
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive', 'suspended'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },

    // Additional metadata (for future expansion)
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    collection: 'users',
  }
);

// Indexes for performance
// Note: email already has unique index from schema definition above
userSchema.index({ role: 1, status: 1 });
userSchema.index({ createdAt: -1 });

// Instance methods
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  // Remove sensitive fields if needed
  return user;
};

// Static methods
userSchema.statics.findByClerkId = function (clerkId) {
  return this.findOne({ clerkId });
};

userSchema.statics.findActiveUsers = function (role = null) {
  const query = { status: 'active' };
  if (role) query.role = role;
  return this.find(query);
};

const User = mongoose.model('User', userSchema);

export default User;
