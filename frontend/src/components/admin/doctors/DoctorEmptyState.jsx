import React from 'react';
import { Stethoscope, RotateCcw } from 'lucide-react';

export const DoctorEmptyState = ({ onClearFilters }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-xs">
      <div className="flex justify-center mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#64748B] border border-slate-200">
          <Stethoscope className="h-8 w-8" />
        </div>
      </div>
      <h3 className="text-base font-bold text-[#0F172A] mb-1">
        No doctors found
      </h3>
      <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-5">
        Try changing your search keywords or adjusting your department, specialization, and status filters.
      </p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] text-white text-xs font-semibold rounded-xl hover:bg-[#115E59] transition-all shadow-xs cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Clear Filters
      </button>
    </div>
  );
};

export default DoctorEmptyState;
