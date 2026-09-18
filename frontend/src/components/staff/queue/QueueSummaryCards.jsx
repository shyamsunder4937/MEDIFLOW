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
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'hover:border-amber-300',
    },
    {
      id: 'in-consultation',
      title: 'In Consultation',
      value: inConsultationCount,
      subtext: 'Currently being seen',
      badge: 'In Rooms',
      icon: Stethoscope,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'hover:border-blue-300',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedCount,
      subtext: 'Visits completed today',
      badge: 'Discharged',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-300',
    },
    {
      id: 'average-wait',
      title: 'Average Wait',
      value: averageWait,
      subtext: 'Current average wait time',
      badge: 'OPD Flow',
      icon: Timer,
      iconBg: 'bg-teal-50',
      iconColor: 'text-[#0F766E]',
      borderColor: 'hover:border-teal-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs transition-all duration-150 flex flex-col justify-between space-y-3 ${card.borderColor}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-[#64748B]">
                {card.title}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} shadow-2xs flex-shrink-0`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {/* Value */}
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {card.value}
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-[#64748B] text-[11px] truncate">
                {card.subtext}
              </span>
              <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#0F766E] border border-slate-200">
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
