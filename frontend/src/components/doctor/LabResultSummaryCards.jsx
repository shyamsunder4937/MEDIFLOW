import React from 'react';
import { FlaskConical, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

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
      iconBg: 'bg-amber-100 text-amber-700',
      valueColor: 'text-[#0F172A]',
      accentBorder: 'border-l-4 border-l-amber-500',
    },
    {
      id: 'available',
      title: 'Available Results',
      value: availableCount,
      subtext: 'Diagnostic panels ready',
      icon: FlaskConical,
      iconBg: 'bg-blue-100 text-blue-700',
      valueColor: 'text-[#0F172A]',
      accentBorder: 'border-l-4 border-l-blue-500',
    },
    {
      id: 'reviewed',
      title: 'Reviewed Results',
      value: reviewedCount,
      subtext: 'Completed & signed today',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-100 text-emerald-700',
      valueColor: 'text-[#0F172A]',
      accentBorder: 'border-l-4 border-l-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs transition-all hover:shadow-sm ${card.accentBorder}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#64748B] block">
                  {card.title}
                </span>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  {card.subtext}
                </div>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0 ${card.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LabResultSummaryCards;
