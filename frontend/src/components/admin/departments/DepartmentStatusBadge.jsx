import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
} from 'lucide-react';

export const DepartmentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      );
    case 'Maintenance':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <Wrench className="h-3 w-3 text-amber-600" />
          Maintenance
        </span>
      );
    case 'Inactive':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
          <Clock className="h-3 w-3 text-slate-400" />
          Inactive
        </span>
      );
  }
};

export default DepartmentStatusBadge;
