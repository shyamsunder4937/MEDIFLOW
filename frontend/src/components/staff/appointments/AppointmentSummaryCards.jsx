import React from 'react';
import { CalendarDays, Clock, UserCheck, CheckCircle2 } from 'lucide-react';

export const AppointmentSummaryCards = ({
  todayCount = 42,
  upcomingCount = 18,
  checkedInCount = 12,
  completedCount = 24,
}) => {
  const cards = [
    {
      id: 'today',
      title: "Today's Appointments",
      value: todayCount,
      subtext: 'Scheduled today',
      icon: CalendarDays,
      iconBg: 'bg-[#CCFBF1]',
      iconColor: 'text-[#0F766E]',
      badge: 'Active Today',
      badgeColor: 'text-[#0F766E] bg-[#CCFBF1]',
    },
    {
      id: 'upcoming',
      title: 'Upcoming',
      value: upcomingCount,
      subtext: 'Appointments remaining',
      icon: Clock,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      badge: 'Remaining',
      badgeColor: 'text-blue-700 bg-blue-50',
    },
    {
      id: 'checkedIn',
      title: 'Checked In',
      value: checkedInCount,
      subtext: 'Patients checked in',
      icon: UserCheck,
      iconBg: 'bg-teal-50',
      iconColor: 'text-[#0F766E]',
      badge: 'In Hospital',
      badgeColor: 'text-teal-700 bg-teal-50',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedCount,
      subtext: 'Completed today',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#16A34A]',
      badge: 'Finished',
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

export default AppointmentSummaryCards;
