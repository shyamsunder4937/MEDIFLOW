import React from 'react';
import { Search, RotateCcw, Filter, X } from 'lucide-react';

export const AppointmentFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  departmentFilter,
  onDepartmentChange,
  doctorFilter,
  onDoctorChange,
  typeFilter,
  onTypeChange,
  onResetFilters,
  totalResults,
  totalCount,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    statusFilter !== 'ALL' ||
    departmentFilter !== 'ALL' ||
    doctorFilter !== 'ALL' ||
    typeFilter !== 'ALL';

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 sm:p-4 shadow-2xs space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3">
        {/* ── Search Input ── */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient name, ID (e.g. APT-1001), or doctor..."
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
          <div className="flex-1 sm:flex-initial min-w-[125px]">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by status"
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="Waiting">Waiting</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[135px]">
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

          {/* Doctor Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[125px]">
            <select
              value={doctorFilter}
              onChange={(e) => onDoctorChange(e.target.value)}
              aria-label="Filter by doctor"
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
            >
              <option value="ALL">All Doctors</option>
              <option value="Dr. Sharma">Dr. Sharma</option>
              <option value="Dr. Kumar">Dr. Kumar</option>
              <option value="Dr. Priya">Dr. Priya</option>
              <option value="Dr. Ahmed">Dr. Ahmed</option>
              <option value="Dr. Iyer">Dr. Iyer</option>
            </select>
          </div>

          {/* Type Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[125px]">
            <select
              value={typeFilter}
              onChange={(e) => onTypeChange(e.target.value)}
              aria-label="Filter by appointment type"
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/15 transition-all cursor-pointer"
            >
              <option value="ALL">All Types</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="New Patient">New Patient</option>
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

            {doctorFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#17221B] text-[11px] font-semibold border border-slate-200">
                Doctor: {doctorFilter}
                <button
                  type="button"
                  onClick={() => onDoctorChange('ALL')}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  aria-label="Remove doctor filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {typeFilter !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[#17221B] text-[11px] font-semibold border border-slate-200">
                Type: {typeFilter}
                <button
                  type="button"
                  onClick={() => onTypeChange('ALL')}
                  className="hover:text-red-600 cursor-pointer ml-0.5"
                  aria-label="Remove type filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-[#64748B]">
            Showing <strong className="text-[#17221B] font-bold">{totalResults}</strong> of {totalCount} appointments
          </span>
        </div>
      )}
    </div>
  );
};

export default AppointmentFilters;
