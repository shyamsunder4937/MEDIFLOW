import React from 'react';
import { Users, UserCheck, Clock, CalendarDays } from 'lucide-react';

export const PatientSummaryCards = ({
  totalCount = '1,248',
  todayCount = 128,
  waitingCount = 24,
  appointmentsCount = 42,
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Patients',
      value: totalCount,
      subtext: 'Registered patients',
      icon: Users,
      iconBg: 'bg-[#CCFBF1]',
      iconColor: 'text-[#0F766E]',
      badge: 'Hospital Registry',
      badgeColor: 'text-[#0F766E] bg-[#CCFBF1]',
    },
    {
      id: 'today',
      title: "Today's Patients",
      value: todayCount,
      subtext: 'Patients visiting today',
      icon: UserCheck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      badge: 'Active Today',
      badgeColor: 'text-blue-700 bg-blue-50',
    },
    {
      id: 'waiting',
      title: 'Waiting',
      value: waitingCount,
      subtext: 'Currently waiting',
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#D97706]',
      badge: 'OPD Queue',
      badgeColor: 'text-amber-700 bg-amber-50',
    },
    {
      id: 'appointments',
      title: 'Appointments',
      value: appointmentsCount,
      subtext: 'Scheduled today',
      icon: CalendarDays,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#16A34A]',
      badge: 'OPD Slots',
      badgeColor: 'text-emerald-700 bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md hover:border-[#0F766E]/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {card.title}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {card.value}
                </div>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[#64748B] font-medium">{card.subtext}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current/10 ${card.badgeColor}`}
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

export default PatientSummaryCards;
