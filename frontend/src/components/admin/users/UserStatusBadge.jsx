import React from 'react';
import { CheckCircle2, UserX, AlertCircle } from 'lucide-react';

export const UserStatusBadge = ({ status }) => {
  switch (status) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      );
    case 'Inactive':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Inactive
        </span>
      );
    case 'Suspended':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="h-3 w-3 text-rose-600" />
          Suspended
        </span>
      );
  }
};

export default UserStatusBadge;
