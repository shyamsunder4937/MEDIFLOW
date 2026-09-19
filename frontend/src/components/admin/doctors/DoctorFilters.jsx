import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';

export const DoctorFilters = ({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedStatus,
  setSelectedStatus,
  onClearFilters,
  totalResults,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDepartment !== 'All Departments' ||
    selectedSpecialization !== 'All Specializations' ||
    selectedStatus !== 'All Status';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor by name, ID, specialization..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded-md"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Filter */}
          <div className="relative min-w-[145px]">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          {/* Specialization Filter */}
          <div className="relative min-w-[155px]">
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
            >
              <option value="All Specializations">All Specializations</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Available">Available</option>
              <option value="In Consultation">In Consultation</option>
              <option value="On Break">On Break</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Counter & Active Filter Tags */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-[#64748B]">
        <div>
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'doctor' : 'doctors'} matching criteria
        </div>

        {hasActiveFilters && (
          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            <span className="text-[#94A3B8]">Filters active:</span>
            {selectedDepartment !== 'All Departments' && (
              <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200 font-medium">
                {selectedDepartment}
              </span>
            )}
            {selectedSpecialization !== 'All Specializations' && (
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
                {selectedSpecialization}
              </span>
            )}
            {selectedStatus !== 'All Status' && (
              <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200 font-medium">
                {selectedStatus}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFilters;
