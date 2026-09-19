import React from 'react';
import {
  CheckCircle2,
  Clock,
  Eye,
  Bot,
} from 'lucide-react';

export const AiAgentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          Completed
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <Clock className="h-3 w-3 text-amber-600" />
          Pending
        </span>
      );
    case 'Review':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 whitespace-nowrap">
          <Eye className="h-3 w-3 text-sky-600" />
          Review
        </span>
      );
    case 'Simulation':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap">
          <Bot className="h-3 w-3 text-purple-600" />
          Simulation
        </span>
      );
  }
};

export default AiAgentStatusBadge;
