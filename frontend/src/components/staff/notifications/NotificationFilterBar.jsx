import React from 'react';
import { Search, X } from 'lucide-react';

export const NotificationFilterBar = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts = {},
}) => {
  const filterOptions = [
    { key: 'ALL', label: 'All', count: counts.all || 0 },
    { key: 'UNREAD', label: 'Unread', count: counts.unread || 0, isUnreadPill: true },
    { key: 'Patient', label: 'Patient', count: counts.patient || 0 },
    { key: 'Queue', label: 'Queue', count: counts.queue || 0 },
    { key: 'Appointment', label: 'Appointment', count: counts.appointment || 0 },
    { key: 'Lab', label: 'Lab', count: counts.lab || 0 },
    { key: 'Pharmacy', label: 'Pharmacy', count: counts.pharmacy || 0 },
    { key: 'Doctor', label: 'Doctor', count: counts.doctor || 0 },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 sm:p-4 space-y-3">
      {/* ── Search Input ── */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications by title, details, or category..."
          className="w-full pl-10 pr-9 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-xs sm:text-sm text-[#17221B] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#17221B] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Category Filter Pills ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onFilterChange(opt.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'bg-[#F8FAFC] hover:bg-slate-100 text-[#64748B] hover:text-[#17221B] border border-[#E2E8F0]'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : opt.isUnreadPill && opt.count > 0
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
