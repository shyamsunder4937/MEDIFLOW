import React from 'react';
import { Search } from 'lucide-react';

export const LabResultFilters = ({
  activeFilter,
  onFilterChange,
  counts,
  searchQuery,
  onSearchChange,
}) => {
  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                isActive
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`flex h-5 min-w-[20px] items-center justify-center px-1.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F1F5F9] text-[#64748B]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative sm:w-64 px-1 pb-1 sm:p-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by test name, ID..."
          className="w-full pl-9 pr-3.5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
        />
      </div>
    </div>
  );
};
