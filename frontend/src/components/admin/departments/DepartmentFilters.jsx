import React from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

const STATUS_OPTIONS = ['All', 'Active', 'Inactive', 'Maintenance'];
const TYPE_OPTIONS = ['All', 'Clinical', 'Diagnostic', 'Support'];

export const DepartmentFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  onClearFilters,
  totalResults,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedStatus !== 'All' ||
    selectedType !== 'All';

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
            placeholder="Search departments by name, ID, or lead doctor..."
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
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 min-w-[130px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent cursor-pointer"
              aria-label="Filter by department status"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Department Type Dropdown */}
          <div className="flex items-center gap-1.5 min-w-[130px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent cursor-pointer"
              aria-label="Filter by department type"
            >
              <option value="All">Type: All</option>
              <option value="Clinical">Clinical</option>
              <option value="Diagnostic">Diagnostic</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors cursor-pointer"
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
            Showing <strong className="text-[#0F172A]">{totalResults}</strong>{' '}
            {totalResults === 1 ? 'department' : 'departments'}
          </span>
        </div>

        {isFiltered && (
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#94A3B8]">Active Filters:</span>
            {searchQuery && (
              <span className="bg-slate-100 text-[#0F172A] px-2 py-0.5 rounded-md font-medium border border-slate-200">
                "{searchQuery}"
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="bg-[#CCFBF1] text-[#0F766E] px-2 py-0.5 rounded-md font-semibold border border-[#0F766E]/20">
                Status: {selectedStatus}
              </span>
            )}
            {selectedType !== 'All' && (
              <span className="bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md font-semibold border border-sky-200">
                Type: {selectedType}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentFilters;
