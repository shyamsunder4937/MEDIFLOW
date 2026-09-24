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
      subtext: 'Registered in MediFlow',
      icon: Users,
      iconBg: 'bg-[#F0FDF4]',
      iconColor: 'text-[#15803D]',
      badge: 'Hospital Registry',
      badgeColor: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/20',
      valueColor: 'text-[#17221B]',
      borderHover: 'hover:border-[#15803D]/40',
    },
    {
      id: 'today',
      title: "Today's Patients",
      value: todayCount,
      subtext: 'Visiting hospital today',
      icon: UserCheck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      badge: 'Active Today',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      valueColor: 'text-[#17221B]',
      borderHover: 'hover:border-blue-300',
    },
    {
      id: 'waiting',
      title: 'Waiting',
      value: waitingCount,
      subtext: 'Currently in OPD queue',
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-[#D97706]',
      badge: 'OPD Queue',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      valueColor: 'text-amber-800',
      borderHover: 'hover:border-amber-300',
    },
    {
      id: 'appointments',
      title: 'Appointments',
      value: appointmentsCount,
      subtext: 'Scheduled slots today',
      icon: CalendarDays,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#16A34A]',
      badge: 'OPD Slots',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      valueColor: 'text-[#17221B]',
      borderHover: 'hover:border-emerald-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-4.5 shadow-2xs ${card.borderHover} transition-all duration-150 flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  {card.title}
                </span>
                <div className={`text-2xl sm:text-[28px] font-extrabold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </div>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} flex-shrink-0`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[#64748B] text-[11px] font-medium">{card.subtext}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${card.badgeColor}`}
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
