import React from 'react';
import { Search, RotateCcw, Filter, X } from 'lucide-react';

export const PatientFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  genderFilter,
  onGenderChange,
  departmentFilter,
  onDepartmentChange,
  onResetFilters,
  totalResults,
  totalCount,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    genderFilter !== 'ALL' ||
    departmentFilter !== 'ALL';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3.5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* ── Search Input ── */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient name, ID (e.g. P-1001), or phone number..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/70 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* ── Dropdowns Row ── */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Status Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[130px]">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by status"
              className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/80 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Waiting">Waiting</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          {/* Gender Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[110px]">
            <select
              value={genderFilter}
              onChange={(e) => onGenderChange(e.target.value)}
              aria-label="Filter by gender"
              className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/80 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all cursor-pointer"
            >
              <option value="ALL">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              aria-label="Filter by department"
              className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/80 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filter Badges Bar ── */}
      {isFiltered && (
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#94A3B8]">
              <Filter className="h-3 w-3" /> Active:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#CCFBF1]/60 text-[#0F766E] text-[11px] font-medium border border-[#0F766E]/20">
                Query: "{searchQuery}"
                <button type="button" onClick={() => onSearchChange('')} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {statusFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#0F172A] text-[11px] font-medium border border-slate-200">
                Status: {statusFilter}
                <button type="button" onClick={() => onStatusChange('ALL')} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {genderFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#0F172A] text-[11px] font-medium border border-slate-200">
                Gender: {genderFilter}
                <button type="button" onClick={() => onGenderChange('ALL')} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {departmentFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#0F172A] text-[11px] font-medium border border-slate-200">
                Dept: {departmentFilter}
                <button type="button" onClick={() => onDepartmentChange('ALL')} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-[#64748B]">
            Showing <strong className="text-[#0F172A]">{totalResults}</strong> of {totalCount} patients
          </span>
        </div>
      )}
    </div>
  );
};

export default PatientFilters;
