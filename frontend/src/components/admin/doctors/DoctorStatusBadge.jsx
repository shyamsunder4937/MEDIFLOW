import React from 'react';
import {
  CheckCircle2,
  Activity,
  Coffee,
  UserX,
  Clock,
} from 'lucide-react';

export const DoctorStatusBadge = ({ status }) => {
  switch (status) {
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 whitespace-nowrap">
          <Activity className="h-3 w-3 animate-pulse" />
          In Consultation
        </span>
      );
    case 'On Break':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <Coffee className="h-3 w-3 text-amber-600" />
          On Break
        </span>
      );
    case 'Unavailable':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
          <UserX className="h-3 w-3 text-rose-600" />
          Unavailable
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

export default DoctorStatusBadge;
