import React from 'react';
import {
  Clock,
  TestTube2,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export const LabStatCards = ({
  pendingCount = 8,
  collectedCount = 5,
  processingCount = 4,
  resultsReadyCount = 3,
}) => {
  const cards = [
    {
      label: 'Pending Requests',
      value: pendingCount,
      subtext: 'Awaiting lab processing',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Samples Collected',
      value: collectedCount,
      subtext: 'Ready for processing',
      icon: TestTube2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Processing',
      value: processingCount,
      subtext: 'Tests currently processing',
      icon: RefreshCw,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
    },
    {
      label: 'Results Ready',
      value: resultsReadyCount,
      subtext: 'Awaiting review',
      icon: CheckCircle2,
      color: 'text-[#0F766E]',
      bg: 'bg-[#CCFBF1]',
      border: 'border-[#0F766E]/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-[#64748B]">
                {card.label}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color} ${card.border} border`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-medium">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
