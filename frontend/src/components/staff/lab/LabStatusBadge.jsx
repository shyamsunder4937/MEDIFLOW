import React from 'react';
import {
  Clock,
  FlaskConical,
  TestTube2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const LabStatusBadge = ({ status }) => {
  switch (status) {
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="h-3.5 w-3.5 text-amber-600" />
          <span>Pending</span>
        </span>
      );

    case 'Sample Required':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50/80 text-amber-900 border border-amber-200">
          <FlaskConical className="h-3.5 w-3.5 text-amber-600" />
          <span>Sample Required</span>
        </span>
      );

    case 'Sample Collected':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
          <TestTube2 className="h-3.5 w-3.5 text-sky-600" />
          <span>Sample Collected</span>
        </span>
      );

    case 'Processing':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <RefreshCw className="h-3.5 w-3.5 text-blue-600 animate-spin" />
          <span>Processing</span>
        </span>
      );

    case 'Result Ready':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>Result Ready</span>
        </span>
      );

    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
          <span>Completed</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <span>{status || 'Unknown'}</span>
        </span>
      );
  }
};

export const LabPriorityBadge = ({ priority }) => {
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
