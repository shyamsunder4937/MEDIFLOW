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
      subtext: 'Awaiting phlebotomy / order intake',
      icon: Clock,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      label: 'Samples Collected',
      value: collectedCount,
      subtext: 'Logged & ready for analyzer',
      icon: TestTube2,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50',
    },
    {
      label: 'Processing',
      value: processingCount,
      subtext: 'Diagnostic assays running',
      icon: RefreshCw,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      label: 'Results Ready',
      value: resultsReadyCount,
      subtext: 'Awaiting clinical review',
      icon: CheckCircle2,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                {card.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
