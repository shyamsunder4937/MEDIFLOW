import React from 'react';
import { Clock, FlaskConical, CheckCircle2 } from 'lucide-react';

export const LabResultSummaryCards = ({
  pendingCount = 4,
  availableCount = 6,
  reviewedCount = 12,
}) => {
  const cards = [
    {
      id: 'pending',
      title: 'Results Awaiting Review',
      value: pendingCount,
      subtext: 'Pending physician sign-off',
      icon: Clock,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50 border border-amber-200',
      badge: {
        text: 'Action Needed',
        bg: 'bg-amber-50 text-amber-700 border border-amber-200',
      },
    },
    {
      id: 'available',
      title: 'Available Results',
      value: availableCount,
      subtext: 'Diagnostic panels ready',
      icon: FlaskConical,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4] border border-[#DCFCE7]',
      badge: {
        text: 'In System',
        bg: 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]',
      },
    },
    {
      id: 'reviewed',
      title: 'Reviewed Results',
      value: reviewedCount,
      subtext: 'Completed & signed today',
      icon: CheckCircle2,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4] border border-[#DCFCE7]',
      badge: {
        text: 'Completed',
        bg: 'bg-slate-100 text-[#475569] border border-slate-200',
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs transition-all hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#64748B] block">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs text-[#64748B] pt-0.5">
                  {card.subtext}
                </div>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 ${card.iconBg} ${card.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LabResultSummaryCards;

