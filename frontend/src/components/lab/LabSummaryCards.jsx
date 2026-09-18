import React from 'react';
import { FlaskConical, Clock, CheckCircle2 } from 'lucide-react';

export const LabSummaryCards = ({ summary }) => {
  const { totalTests = 8, pendingResults = 2, completedResults = 6 } = summary || {};

  const cards = [
    {
      id: 'total',
      label: 'Total Tests',
      value: totalTests,
      description: 'Ordered & conducted diagnostic tests',
      icon: FlaskConical,
      iconBg: 'bg-[#CCFBF1]/60 text-[#0F766E]',
      badge: 'All Orders',
      badgeClass: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
      indicatorDot: 'bg-[#0F766E]',
    },
    {
      id: 'pending',
      label: 'Pending Results',
      value: pendingResults,
      description: 'Awaiting lab processing or verification',
      icon: Clock,
      iconBg: 'bg-amber-50 text-[#D97706]',
      badge: 'In Processing',
      badgeClass: 'bg-amber-50 text-[#D97706] border-amber-200/70',
      indicatorDot: 'bg-[#D97706] animate-pulse',
    },
    {
      id: 'completed',
      label: 'Completed Results',
      value: completedResults,
      description: 'Ready for doctor and patient review',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-[#16A34A]',
      badge: 'Ready to View',
      badgeClass: 'bg-emerald-50 text-[#16A34A] border-emerald-200/70',
      indicatorDot: 'bg-[#16A34A]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} shadow-xs flex-shrink-0`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    {card.label}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${card.indicatorDot}`} />
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {card.id === 'pending' ? 'Requires Attention' : card.id === 'completed' ? 'Verified Reports' : 'Visit Total'}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${card.badgeClass}`}
              >
                {card.badge}
              </span>
            </div>

            <div className="mt-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
