import React from 'react';
import { FlaskConical, RotateCcw } from 'lucide-react';

export const LabEmptyState = ({ onResetFilter, hasFilterActive }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-8 sm:p-12 text-center flex flex-col items-center justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 mb-3.5">
        <FlaskConical className="h-7 w-7" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#17221B]">
        No lab results found
      </h3>

      <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mt-1 leading-relaxed">
        Your laboratory results will appear here once they are registered and verified.
      </p>

      {hasFilterActive && onResetFilter && (
        <button
          onClick={onResetFilter}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
};

