import React from 'react';

export const QueueTabs = ({
  activeTab = 'All',
  onTabChange,
  counts = { all: 8, waiting: 5, inConsultation: 1, completed: 2 },
}) => {
  const tabs = [
    { id: 'All', label: 'All Patients', count: counts.all },
    { id: 'Waiting', label: 'Waiting', count: counts.waiting },
    { id: 'In Consultation', label: 'In Consultation', count: counts.inConsultation },
    { id: 'Completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div
      role="tablist"
      aria-label="Queue Filter Tabs"
      className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-[#E2E8F0] overflow-x-auto w-full sm:w-auto"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] cursor-pointer ${
              isActive
                ? 'bg-[#15803D] text-white shadow-xs font-bold'
                : 'text-[#64748B] hover:text-[#17221B] hover:bg-white/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`flex h-4.5 min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-slate-200/80 text-[#64748B]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
