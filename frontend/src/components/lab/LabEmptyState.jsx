import React from 'react';
import { FlaskConical, RotateCcw } from 'lucide-react';

export const LabEmptyState = ({ onResetFilter, hasFilterActive }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 sm:p-12 text-center flex flex-col items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFBF1]/60 text-[#0F766E] mb-4 shadow-xs">
        <FlaskConical className="h-8 w-8" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
        No lab results found
      </h3>

      <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mt-1.5 leading-relaxed">
        Your laboratory results will appear here once they are available.
      </p>

      {hasFilterActive && onResetFilter && (
        <button
          onClick={onResetFilter}
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#0F766E] bg-[#CCFBF1]/50 hover:bg-[#CCFBF1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
};
