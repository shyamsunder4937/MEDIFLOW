import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  'All',
  'System',
  'Patient',
  'Doctor',
  'Queue',
  'Appointment',
  'Laboratory',
  'Pharmacy',
  'Workflow',
];

const PRIORITIES = ['All', 'Normal', 'High', 'Critical'];

const READ_STATUSES = ['All', 'Unread', 'Read'];

export const AdminNotificationFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedReadStatus,
  onReadStatusChange,
  onClearFilters,
  totalResults,
}) => {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedReadStatus !== 'All';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* ── Top Bar: Search Input & Clear Filters ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications by title, message, patient, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-colors placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
              title="Clear search text"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Counter & Clear Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{totalResults}</span> {totalResults === 1 ? 'notification' : 'notifications'}
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom Bar: Filter Dropdowns ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-colors text-slate-700 font-medium cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            Priority
          </label>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-colors text-slate-700 font-medium cursor-pointer"
          >
            {PRIORITIES.map((pri) => (
              <option key={pri} value={pri}>
                {pri === 'All' ? 'All Priorities' : `${pri} Priority`}
              </option>
            ))}
          </select>
        </div>

        {/* Read Status Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            Read Status
          </label>
          <select
            value={selectedReadStatus}
            onChange={(e) => onReadStatusChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-colors text-slate-700 font-medium cursor-pointer"
          >
            {READ_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Statuses' : `${status} Only`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
