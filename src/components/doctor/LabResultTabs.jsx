import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export const LabResultTabs = ({
  activeTab,
  onTabChange,
  pendingCount = 0,
  completedCount = 0,
}) => {
  const tabs = [
    {
      id: 'pending',
      label: 'Pending Reviews',
      icon: Clock,
      count: pendingCount,
    },
    {
      id: 'completed',
      label: 'Completed Results',
      icon: CheckCircle2,
      count: completedCount,
    },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-px overflow-x-auto select-none" role="tablist">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
              isActive
                ? 'border-[#0F766E] text-[#0F766E] bg-white'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? 'text-[#0F766E]' : 'text-[#94A3B8]'}`} />
            <span>{tab.label}</span>
            <span
              className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold transition-colors ${
                isActive
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-slate-100 text-[#64748B]'
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

export default LabResultTabs;
