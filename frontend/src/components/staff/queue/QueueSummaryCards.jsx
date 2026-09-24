import React from 'react';
import { Clock, Stethoscope, CheckCircle2, Timer } from 'lucide-react';

export const QueueSummaryCards = ({
  waitingCount = 24,
  inConsultationCount = 6,
  completedCount = 38,
  averageWait = '18 min',
}) => {
  const cards = [
    {
      id: 'waiting',
      title: 'Waiting',
      value: waitingCount,
      subtext: 'Patients waiting in OPD',
      badge: 'Active Queue',
      icon: Clock,
      badgeType: 'warning',
    },
    {
      id: 'in-consultation',
      title: 'In Consultation',
      value: inConsultationCount,
      subtext: 'Currently being seen',
      badge: 'In Rooms',
      icon: Stethoscope,
      badgeType: 'info',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedCount,
      subtext: 'Visits completed today',
      badge: 'Discharged',
      icon: CheckCircle2,
      badgeType: 'success',
    },
    {
      id: 'average-wait',
      title: 'Average Wait',
      value: averageWait,
      subtext: 'Current average wait time',
      badge: 'OPD Flow',
      icon: Timer,
      badgeType: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-4.5 hover:border-[#15803D]/40 transition-all duration-150 flex flex-col justify-between"
          >
            {/* Top row: Label and subtle icon */}
            <div className="flex items-center justify-between gap-2 pb-2">
              <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                {card.title}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-[#64748B] border border-slate-100 flex-shrink-0">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Middle: Prominent number */}
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#17221B] tracking-tight">
                {card.value}
              </div>
            </div>

            {/* Bottom: Subtext & Badge */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs gap-2">
              <span className="text-[#64748B] text-[11px] truncate">
                {card.subtext}
              </span>
              <span
                className={`inline-flex items-center gap-1 font-semibold text-[10px] px-2 py-0.5 rounded-md flex-shrink-0 ${
                  card.badgeType === 'warning'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : card.badgeType === 'info'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : card.badgeType === 'success'
                    ? 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]'
                    : 'bg-slate-50 text-[#475569] border border-[#E2E8F0]'
                }`}
              >
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QueueSummaryCards;

