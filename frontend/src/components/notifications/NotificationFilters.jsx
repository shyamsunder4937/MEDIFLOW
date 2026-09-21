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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-3.5">
      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
              activeTab === tab.id
                ? 'bg-[#15803D] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 hover:text-[#17221B] border border-[#E2E8F0]'
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
            placeholder="Search notifications by title, description or category..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs sm:text-sm text-[#17221B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
          />
        </div>

        {/* Mark All Read */}
        {hasUnread && (
          <button
            onClick={onMarkAllRead}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] text-xs font-semibold rounded-lg transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] whitespace-nowrap"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>
    </div>
  );
};
