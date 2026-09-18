import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const QueueFilters = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  doctorFilter,
  onDoctorChange,
  statusFilter,
  onStatusChange,
  onResetFilters,
  isFiltered,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input (Patient Name or Token) */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient name or token..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/70 pl-10 pr-4 py-2.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Dropdown */}
          <select
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          {/* Doctor Dropdown */}
          <select
            value={doctorFilter}
            onChange={(e) => onDoctorChange(e.target.value)}
            aria-label="Filter by doctor"
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all cursor-pointer"
          >
            <option value="ALL">All Doctors</option>
            <option value="Dr. Sharma">Dr. Sharma</option>
            <option value="Dr. Kumar">Dr. Kumar</option>
            <option value="Dr. Priya">Dr. Priya</option>
            <option value="Dr. Ahmed">Dr. Ahmed</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by status"
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="Waiting">Waiting</option>
            <option value="Called">Called</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueFilters;
