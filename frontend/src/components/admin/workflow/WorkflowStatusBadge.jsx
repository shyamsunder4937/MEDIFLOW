import React from 'react';
import {
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export const WorkflowStatusBadge = ({ status }) => {
  switch (status) {
    case 'In Progress':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          In Progress
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <Clock className="h-3 w-3 text-amber-600" />
          Waiting
        </span>
      );
    case 'Processing':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap">
          <Loader2 className="h-3 w-3 text-purple-600 animate-spin" />
          Processing
        </span>
      );
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Completed
        </span>
      );
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      );
    case 'Busy':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <Activity className="h-3 w-3 text-amber-600" />
          Busy
        </span>
      );
    case 'Attention':
    case 'Attention Required':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
          <AlertTriangle className="h-3 w-3 text-rose-600" />
          Attention
        </span>
      );
    case 'Normal':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          <CheckCircle2 className="h-3 w-3 text-slate-500" />
          Normal
        </span>
      );
  }
};

export default WorkflowStatusBadge;
