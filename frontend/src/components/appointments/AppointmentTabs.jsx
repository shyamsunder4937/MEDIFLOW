import React from 'react';
import { Calendar, History, XCircle, Search } from 'lucide-react';

export const AppointmentTabs = ({ activeTab, onTabChange, counts, searchQuery, onSearchChange }) => {
  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: Calendar,
      count: counts.upcoming ?? 0,
      activeColor: 'text-[#15803D] border-[#15803D]/40 bg-[#F0FDF4]'
    },
    {
      id: 'past',
      label: 'Past',
      icon: History,
      count: counts.past ?? 0,
      activeColor: 'text-[#17221B] border-slate-400 bg-slate-100'
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: XCircle,
      count: counts.cancelled ?? 0,
      activeColor: 'text-rose-700 border-rose-300 bg-rose-50'
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 border-b border-[#E2E8F0] pb-3.5">
      {/* Tab switch buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] whitespace-nowrap cursor-pointer ${
                isActive
                  ? `${tab.activeColor} shadow-2xs`
                  : 'text-[#64748B] border-transparent hover:text-[#17221B] hover:bg-slate-100'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                  isActive
                    ? 'bg-white shadow-2xs'
                    : 'bg-slate-100 text-[#64748B]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Search */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search doctor, department..."
          className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#17221B] placeholder-[#94A3B8] focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#17221B] cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
