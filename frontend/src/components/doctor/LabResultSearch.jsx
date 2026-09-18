import React from 'react';
import { Search, X } from 'lucide-react';

export const LabResultSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search patient or test..."
        className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all shadow-2xs"
        aria-label="Search patient or test"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
          aria-label="Clear search query"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default LabResultSearch;
