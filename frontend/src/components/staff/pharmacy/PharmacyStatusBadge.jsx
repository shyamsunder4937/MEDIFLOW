import React from 'react';
import {
  Clock,
  Pill,
  CheckCircle2,
  PackageCheck,
  XCircle,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export const PharmacyStatusBadge = ({ status }) => {
  switch (status) {
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          <span>Pending</span>
        </span>
      );

    case 'Preparing':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <RefreshCw className="h-3.5 w-3.5 text-blue-600 animate-spin" />
          <span>Preparing</span>
        </span>
      );

    case 'Ready':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <PackageCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Ready for Pickup</span>
        </span>
      );

    case 'Dispensed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
          <span>Dispensed</span>
        </span>
      );

    case 'Cancelled':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <XCircle className="h-3.5 w-3.5 text-rose-600" />
          <span>Cancelled</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Pill className="h-3.5 w-3.5 text-slate-500" />
          <span>{status || 'Unknown'}</span>
        </span>
      );
  }
};

export const PharmacyPriorityBadge = ({ priority }) => {
  if (priority === 'Urgent') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
        <AlertTriangle className="h-3 w-3 text-rose-600" />
        <span>Urgent</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
      <span>Normal</span>
    </span>
  );
};
