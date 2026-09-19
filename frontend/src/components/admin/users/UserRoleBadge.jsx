import React from 'react';
import {
  User,
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Shield,
} from 'lucide-react';

export const UserRoleBadge = ({ role }) => {
  switch (role) {
    case 'Patient':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <User className="h-3 w-3 text-sky-600" />
          Patient
        </span>
      );
    case 'Doctor':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Stethoscope className="h-3 w-3 text-emerald-600" />
          Doctor
        </span>
      );
    case 'Hospital Staff':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Building2 className="h-3 w-3 text-indigo-600" />
          Hospital Staff
        </span>
      );
    case 'Lab Staff':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <FlaskConical className="h-3 w-3 text-purple-600" />
          Lab Staff
        </span>
      );
    case 'Pharmacy Staff':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Pill className="h-3 w-3 text-amber-600" />
          Pharmacy Staff
        </span>
      );
    case 'Admin':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
          <Shield className="h-3 w-3 text-[#0F766E]" />
          Admin
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <User className="h-3 w-3 text-slate-500" />
          {role || 'User'}
        </span>
      );
  }
};

export default UserRoleBadge;
