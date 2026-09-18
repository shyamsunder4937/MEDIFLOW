import React from 'react';
import { Search, CheckCheck } from 'lucide-react';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'Appointment', label: 'Appointments' },
  { id: 'Queue', label: 'Queue' },
  { id: 'Laboratory', label: 'Laboratory' },
  { id: 'Pharmacy', label: 'Pharmacy' },
];

export const NotificationFilters = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onMarkAllRead,
  hasUnread,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
              activeTab === tab.id
                ? 'bg-[#0F766E] text-white shadow-sm'
                : 'bg-slate-50 text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Mark All Read */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-all"
          />
        </div>

        {/* Mark All Read */}
        {hasUnread && (
          <button
            onClick={onMarkAllRead}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-xs font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] whitespace-nowrap"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>
    </div>
  );
};
