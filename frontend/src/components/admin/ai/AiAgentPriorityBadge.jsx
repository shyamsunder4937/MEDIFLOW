import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

export const AiAgentPriorityBadge = ({ priority }) => {
  if (priority === 'High') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
        <AlertCircle className="h-3 w-3 text-rose-600" />
        High
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
      <Check className="h-3 w-3 text-slate-400" />
      Normal
    </span>
  );
};

export default AiAgentPriorityBadge;
