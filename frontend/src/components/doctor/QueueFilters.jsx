import React from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';

export const QueueFilters = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  isFiltered,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search patient by name or queue number..."
          aria-label="Search patient queue"
          className="w-full rounded-lg border border-[#E2E8F0] bg-slate-50/70 pl-10 pr-9 py-2 text-xs text-[#17221B] placeholder:text-[#94A3B8] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#17221B] cursor-pointer"
            aria-label="Clear search text"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <select
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
            className="rounded-lg border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all pr-8 cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-[#15803D] hover:bg-[#F0FDF4] hover:border-[#15803D]/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
