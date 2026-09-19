import React from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

const MODULE_OPTIONS = [
  'All',
  'Queue',
  'Doctor',
  'Laboratory',
  'Pharmacy',
  'Workflow',
  'Appointments',
];

const PRIORITY_OPTIONS = ['All', 'Normal', 'High'];

const STATUS_OPTIONS = [
  'All',
  'Completed',
  'Pending',
  'Review',
  'Simulation',
];

export const AiAgentFilters = ({
  searchQuery,
  setSearchQuery,
  selectedModule,
  setSelectedModule,
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
  onClearFilters,
  totalResults,
}) => {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedModule !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity, patient, or activity ID..."
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

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Module Filter */}
          <div className="flex items-center min-w-[130px]">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by module"
            >
              <option value="All">Module: All</option>
              {MODULE_OPTIONS.filter((m) => m !== 'All').map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center min-w-[120px]">
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

          {/* Status Filter */}
          <div className="flex items-center min-w-[125px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#0F766E] cursor-pointer"
              aria-label="Filter by status"
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

      {/* Active Filter Tags */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>
            Activity Records: <strong className="text-[#0F172A]">{totalResults}</strong>{' '}
            {totalResults === 1 ? 'log' : 'logs'}
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
            {selectedModule !== 'All' && (
              <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md font-semibold border border-purple-200">
                Module: {selectedModule}
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

export default AiAgentFilters;
