import React from 'react';
import {
  UserPlus,
  Users,
  Stethoscope,
  Microscope,
  Package,
  CheckCircle2,
} from 'lucide-react';

export const WorkflowStageBadge = ({ stage }) => {
  switch (stage) {
    case 'Registration':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          <UserPlus className="h-3 w-3 text-slate-500" />
          Registration
        </span>
      );
    case 'Queue':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap">
          <Users className="h-3 w-3 text-amber-600" />
          Queue
        </span>
      );
    case 'Doctor':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 whitespace-nowrap">
          <Stethoscope className="h-3 w-3 text-sky-600" />
          Doctor
        </span>
      );
    case 'Laboratory':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 whitespace-nowrap">
          <Microscope className="h-3 w-3 text-purple-600" />
          Laboratory
        </span>
      );
    case 'Pharmacy':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 whitespace-nowrap">
          <Package className="h-3 w-3 text-teal-600" />
          Pharmacy
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Completed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 whitespace-nowrap">
          {stage || 'Unknown'}
        </span>
      );
  }
};

export default WorkflowStageBadge;
