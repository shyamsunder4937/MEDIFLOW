import React from 'react';
import { Activity, RotateCcw } from 'lucide-react';

export const WorkflowEmptyState = ({ onClearFilters }) => {
  return (
    <div className="py-12 px-4 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B] mb-3 border border-slate-200">
        <Activity className="h-6 w-6 text-[#94A3B8]" />
      </div>
      <h3 className="text-base font-bold text-[#0F172A] mb-1">
        No active workflows found
      </h3>
      <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-4">
        Try changing your search query or adjusting the selected stage/department filters.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0F766E] bg-[#CCFBF1] hover:bg-[#CCFBF1]/80 rounded-xl border border-[#0F766E]/20 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default WorkflowEmptyState;
