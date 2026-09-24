import React from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const PharmacyFilters = ({
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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 space-y-3.5">
      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patient, prescription ID, doctor, or medication..."
            className="w-full pl-10 pr-9 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xs sm:text-sm text-[#17221B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#17221B] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Status Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#17221B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Dispensed">Dispensed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full sm:w-36 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#17221B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all cursor-pointer"
            >
              <option value="ALL">All Priority</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full sm:w-44 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs sm:text-sm font-medium text-[#17221B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100 text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#17221B] transition-all cursor-pointer whitespace-nowrap"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filters & Results Summary ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5 font-medium">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#15803D]" />
          <span>
            Showing <strong className="text-[#17221B] font-semibold">{totalResults}</strong> of{' '}
            <strong className="text-[#17221B] font-semibold">{totalCount}</strong> prescription orders
          </span>
        </div>

        {isFiltered && (
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#17221B] text-[11px] font-medium">
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#17221B] text-[11px] font-medium">
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#17221B] text-[11px] font-medium">
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#17221B] text-[11px] font-medium">
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
