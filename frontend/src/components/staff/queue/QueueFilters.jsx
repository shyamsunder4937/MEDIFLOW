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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 sm:p-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input (Patient Name, Token, or ID) */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient name, ID, or token..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-slate-50/70 pl-10 pr-4 py-2 text-xs text-[#17221B] placeholder:text-[#94A3B8] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all"
          />
        </div>

        {/* Dropdowns & Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Department Dropdown */}
          <select
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all cursor-pointer"
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
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all cursor-pointer"
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
            className="rounded-xl border border-[#E2E8F0] bg-slate-50/70 px-3 py-2 text-xs font-semibold text-[#17221B] focus:border-[#15803D] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DCFCE7] bg-[#F0FDF4] text-xs font-semibold text-[#15803D] hover:bg-[#DCFCE7] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueueFilters;

