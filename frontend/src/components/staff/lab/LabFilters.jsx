import React from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const LabFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  departmentFilter,
  onDepartmentChange,
  onResetFilters,
  totalResults,
  totalCount,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 space-y-4 shadow-xs">
      {/* ── Top Bar: Search + Quick Controls ── */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient, request ID, doctor, or test..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full sm:w-44 px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Sample Required">Sample Required</option>
              <option value="Sample Collected">Sample Collected</option>
              <option value="Processing">Processing</option>
              <option value="Result Ready">Result Ready</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full sm:w-36 px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full sm:w-44 px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-all cursor-pointer whitespace-nowrap"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filters & Results Count ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5 font-medium">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#0F766E]" />
          <span>
            Showing <strong className="text-[#0F172A] font-bold">{totalResults}</strong> of{' '}
            <strong className="text-[#0F172A] font-bold">{totalCount}</strong> laboratory requests
          </span>
        </div>

        {isFiltered && (
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0F172A] text-[11px] font-semibold">
                Status: {statusFilter}
                <button
                  type="button"
                  onClick={() => onStatusChange('ALL')}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {priorityFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0F172A] text-[11px] font-semibold">
                Priority: {priorityFilter}
                <button
                  type="button"
                  onClick={() => onPriorityChange('ALL')}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {departmentFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0F172A] text-[11px] font-semibold">
                Dept: {departmentFilter}
                <button
                  type="button"
                  onClick={() => onDepartmentChange('ALL')}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0F172A] text-[11px] font-semibold">
                Query: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
