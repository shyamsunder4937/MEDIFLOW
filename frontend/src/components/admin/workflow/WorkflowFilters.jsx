import React from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

const STAGE_OPTIONS = [
  'All',
  'Registration',
  'Queue',
  'Doctor',
  'Laboratory',
  'Pharmacy',
  'Completed',
];

const DEPARTMENT_OPTIONS = [
  'All',
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Emergency',
];

const PRIORITY_OPTIONS = ['All', 'Normal', 'High'];

const STATUS_OPTIONS = [
  'All',
  'Waiting',
  'In Progress',
  'Processing',
  'Completed',
];

export const WorkflowFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStage,
  setSelectedStage,
  selectedDepartment,
  setSelectedDepartment,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
  onClearFilters,
  totalResults,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedStage !== 'All' ||
    selectedDepartment !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Stage Dropdown */}
          <div className="flex items-center min-w-[125px]">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by workflow stage"
            >
              <option value="All">Stage: All</option>
              {STAGE_OPTIONS.filter((s) => s !== 'All').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex items-center min-w-[135px]">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by department"
            >
              <option value="All">Dept: All</option>
              {DEPARTMENT_OPTIONS.filter((d) => d !== 'All').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div className="flex items-center min-w-[115px]">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by priority"
            >
              <option value="All">Priority: All</option>
              {PRIORITY_OPTIONS.filter((p) => p !== 'All').map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center min-w-[125px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by workflow status"
            >
              <option value="All">Status: All</option>
              {STATUS_OPTIONS.filter((st) => st !== 'All').map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Tags & Count Display */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>
            Active Workflows: <strong className="text-[#0F172A]">{totalResults}</strong>{' '}
            {totalResults === 1 ? 'patient' : 'patients'}
          </span>
        </div>

        {isFiltered && (
          <div className="flex items-center gap-1.5 text-[11px] flex-wrap">
            <span className="text-[#94A3B8]">Active Filters:</span>
            {searchQuery && (
              <span className="bg-slate-100 text-[#0F172A] px-2 py-0.5 rounded-md font-medium border border-slate-200">
                "{searchQuery}"
              </span>
            )}
            {selectedStage !== 'All' && (
              <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md font-semibold border border-purple-200">
                Stage: {selectedStage}
              </span>
            )}
            {selectedDepartment !== 'All' && (
              <span className="bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md font-semibold border border-sky-200">
                Dept: {selectedDepartment}
              </span>
            )}
            {selectedPriority !== 'All' && (
              <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded-md font-semibold border border-rose-200">
                Priority: {selectedPriority}
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="bg-[#CCFBF1] text-[#0F766E] px-2 py-0.5 rounded-md font-semibold border border-[#0F766E]/20">
                Status: {selectedStatus}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowFilters;
