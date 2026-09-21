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
    { id: 'all', label: 'All Results', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-xl border border-[#E2E8F0] shadow-xs">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                isActive
                  ? 'bg-[#15803D] text-white shadow-2xs'
                  : 'text-[#64748B] hover:text-[#17221B] hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`flex h-4.5 min-w-[18px] items-center justify-center px-1.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-[#64748B]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by test name, ID..."
          className="w-full pl-8.5 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#17221B] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-colors"
        />
      </div>
    </div>
  );
};

