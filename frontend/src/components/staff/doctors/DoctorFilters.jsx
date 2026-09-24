import React from 'react';
import { Search, RotateCcw, Filter, X } from 'lucide-react';

export const DoctorFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  departmentFilter,
  onDepartmentChange,
  onResetFilters,
  totalResults,
  totalCount,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 sm:p-4 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* ── Search Input ── */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search doctor name, department, or specialization..."
            className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-9.5 pr-8 py-2 text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#94A3B8] hover:text-[#17221B] hover:bg-slate-200/60 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* ── Dropdowns Row ── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[130px]">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by doctor status"
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Available">Available</option>
              <option value="In Consultation">In Consultation</option>
              <option value="On Break">On Break</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[140px]">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              aria-label="Filter by department"
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#64748B] hover:text-[#17221B] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filter Bar ── */}
      {isFiltered && (
        <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#94A3B8]">
              <Filter className="h-3 w-3" /> Active Filters:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] text-[11px] font-semibold border border-[#15803D]/20">
                Query: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#17221B] text-[11px] font-semibold border border-slate-200">
                Status: {statusFilter}
                <button
                  type="button"
                  onClick={() => onStatusChange('ALL')}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  aria-label="Remove status filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {departmentFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#17221B] text-[11px] font-semibold border border-slate-200">
                Dept: {departmentFilter}
                <button
                  type="button"
                  onClick={() => onDepartmentChange('ALL')}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  aria-label="Remove department filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-[#64748B]">
            Showing <strong className="text-[#17221B] font-bold">{totalResults}</strong> of {totalCount} doctors
          </span>
        </div>
      )}
    </div>
  );
};

export default DoctorFilters;
