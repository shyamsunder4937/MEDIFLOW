import React from 'react';
import {
  Settings,
  User,
  Stethoscope,
  Users,
  Calendar,
  Microscope,
  Package,
  Activity,
  Bell,
} from 'lucide-react';

export const AdminNotificationCategoryBadge = ({ category }) => {
  switch (category) {
    case 'System':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          <Settings className="h-3 w-3 text-slate-500" />
          System
        </span>
      );
    case 'Patient':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
          <User className="h-3 w-3 text-blue-600" />
          Patient
        </span>
      );
    case 'Doctor':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <Stethoscope className="h-3 w-3 text-emerald-600" />
          Doctor
        </span>
      );
    case 'Queue':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap">
          <Users className="h-3 w-3 text-amber-600" />
          Queue
        </span>
      );
    case 'Appointment':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
          <Calendar className="h-3 w-3 text-indigo-600" />
          Appointment
        </span>
      );
    case 'Laboratory':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap">
          <Microscope className="h-3 w-3 text-purple-600" />
          Laboratory
        </span>
      );
    case 'Pharmacy':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 whitespace-nowrap">
          <Package className="h-3 w-3 text-teal-600" />
          Pharmacy
        </span>
      );
    case 'Workflow':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 whitespace-nowrap">
          <Activity className="h-3 w-3 text-cyan-600" />
          Workflow
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          <Bell className="h-3 w-3 text-slate-400" />
          {category || 'Alert'}
        </span>
      );
  }
};

export default AdminNotificationCategoryBadge;
