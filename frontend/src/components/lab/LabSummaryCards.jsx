import React from 'react';
import { FlaskConical, Clock, CheckCircle2 } from 'lucide-react';

export const LabSummaryCards = ({ summary }) => {
  const { totalTests = 8, pendingResults = 2, completedResults = 6 } = summary || {};

  const cards = [
    {
      id: 'total',
      label: 'Total Tests',
      value: totalTests,
      description: 'Prescribed & recorded diagnostic orders',
      icon: FlaskConical,
      iconBg: 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20',
      badge: 'All Orders',
      badgeClass: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
      indicatorDot: 'bg-[#15803D]',
    },
    {
      id: 'pending',
      label: 'Pending Results',
      value: pendingResults,
      description: 'Awaiting lab processing or verification',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      badge: 'In Processing',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
      indicatorDot: 'bg-amber-600 animate-pulse',
    },
    {
      id: 'completed',
      label: 'Completed Results',
      value: completedResults,
      description: 'Ready for doctor and patient review',
      icon: CheckCircle2,
      iconBg: 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20',
      badge: 'Ready to View',
      badgeClass: 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/20',
      indicatorDot: 'bg-[#15803D]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    {card.label}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${card.indicatorDot}`} />
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {card.id === 'pending' ? 'Requires Attention' : card.id === 'completed' ? 'Verified Reports' : 'Visit Total'}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${card.badgeClass}`}
              >
                {card.badge}
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#17221B] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

