import React from 'react';
import {
  UserCheck,
  ListOrdered,
  Calendar,
  FlaskConical,
  Pill,
  Stethoscope,
  Bell,
} from 'lucide-react';

export const NotificationCategoryBadge = ({ category }) => {
  switch (category) {
    case 'Patient':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <UserCheck className="h-3 w-3 text-blue-600" />
          <span>Patient</span>
        </span>
      );

    case 'Queue':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <ListOrdered className="h-3 w-3 text-amber-600" />
          <span>Queue</span>
        </span>
      );

    case 'Appointment':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
          <Calendar className="h-3 w-3 text-purple-600" />
          <span>Appointment</span>
        </span>
      );

    case 'Lab':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
          <FlaskConical className="h-3 w-3 text-sky-600" />
          <span>Lab</span>
        </span>
      );

    case 'Pharmacy':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <Pill className="h-3 w-3 text-[#15803D]" />
          <span>Pharmacy</span>
        </span>
      );

    case 'Doctor':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Stethoscope className="h-3 w-3 text-emerald-600" />
          <span>Doctor</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Bell className="h-3 w-3 text-slate-500" />
          <span>{category || 'Alert'}</span>
        </span>
      );
  }
};
