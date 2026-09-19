import React from 'react';
import { Building2, RotateCcw } from 'lucide-react';

export const DepartmentEmptyState = ({ onClearFilters }) => {
  return (
    <div className="py-12 px-4 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B] mb-3 border border-slate-200">
        <Building2 className="h-6 w-6 text-[#94A3B8]" />
      </div>
      <h3 className="text-base font-bold text-[#0F172A] mb-1">
        No departments found
      </h3>
      <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-4">
        Try changing your search or filters.
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

export default DepartmentEmptyState;
