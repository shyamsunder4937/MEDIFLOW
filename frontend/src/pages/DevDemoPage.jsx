import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Stethoscope, Building2, Shield, ArrowRight } from 'lucide-react';
import { USER_ROLES } from '../utils/roleConfig';

/**
 * Development Demo Page
 * Quick access to different portals for testing
 * Only accessible in development mode
 */
export const DevDemoPage = () => {
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.PATIENT);
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    // Set mock role in localStorage
    localStorage.setItem('mediflow_user_role', selectedRole);
    
    // Navigate to appropriate dashboard
    const routes = {
      [USER_ROLES.PATIENT]: '/patient/dashboard',
      [USER_ROLES.DOCTOR]: '/doctor/dashboard',
      [USER_ROLES.STAFF]: '/staff/dashboard',
      [USER_ROLES.ADMIN]: '/admin/dashboard',
    };
    
    navigate(routes[selectedRole]);
  };

  const roles = [
    {
      id: USER_ROLES.PATIENT,
      name: 'Patient Portal',
      icon: User,
      description: 'Access patient dashboard and appointments',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: USER_ROLES.DOCTOR,
      name: 'Doctor Portal',
      icon: Stethoscope,
      description: 'Manage consultations and patient queue',
      color: 'bg-green-50 text-green-600',
    },
    {
      id: USER_ROLES.STAFF,
      name: 'Staff Portal',
      icon: Building2,
      description: 'Hospital operations and registrations',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: USER_ROLES.ADMIN,
      name: 'Admin Portal',
      icon: Shield,
      description: 'System administration and configuration',
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E] text-white shadow-lg">
              <Activity className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">MediFlow AI - Development Demo</h1>
          <p className="text-sm text-[#64748B]">
            Quick access to different portals for testing
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-amber-900">Development Mode Only</span>
          </div>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-4">
          <label className="text-sm font-semibold text-[#0F172A] mb-4 block">
            Select Portal to Test
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-[#0F766E] bg-[#CCFBF1]/30 shadow-sm'
                      : 'border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-3 ${role.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold text-sm text-[#0F172A] mb-1">
                    {role.name}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    {role.description}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleDemoAccess}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm"
          >
            Enter {roles.find(r => r.id === selectedRole)?.name}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold text-blue-900 mb-1">
            ℹ️ Phase 1 Development Testing
          </p>
          <p className="text-xs text-blue-700">
            This page is for development testing only. In production, use the proper authentication flow.
          </p>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 flex justify-center gap-4 text-xs">
          <a href="/sign-in" className="text-[#0F766E] hover:underline font-semibold">
            → Go to Sign In
          </a>
          <a href="/admin/login" className="text-[#0F766E] hover:underline font-semibold">
            → Admin Login
          </a>
        </div>
      </div>
    </div>
  );
};
