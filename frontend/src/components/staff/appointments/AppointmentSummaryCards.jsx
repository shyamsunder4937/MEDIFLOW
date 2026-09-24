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
      subtext: 'Scheduled visits today',
      icon: CalendarDays,
      iconBg: 'bg-[#F0FDF4]',
      iconColor: 'text-[#15803D]',
      badge: 'Active Today',
      badgeColor: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/20',
      valueColor: 'text-[#17221B]',
      borderHover: 'hover:border-[#15803D]/40',
    },
    {
      id: 'upcoming',
      title: 'Upcoming',
      value: upcomingCount,
      subtext: 'Slots remaining today',
      icon: Clock,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      badge: 'Pending Arrival',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      valueColor: 'text-[#17221B]',
      borderHover: 'hover:border-blue-300',
    },
    {
      id: 'checkedIn',
      title: 'Checked In',
      value: checkedInCount,
      subtext: 'Patients at OPD desk',
      icon: UserCheck,
      iconBg: 'bg-[#F0FDF4]',
      iconColor: 'text-[#15803D]',
      badge: 'In Hospital',
      badgeColor: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/20',
      valueColor: 'text-[#15803D]',
      borderHover: 'hover:border-[#15803D]/40',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedCount,
      subtext: 'Finished consultations',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-[#16A34A]',
      badge: 'Concluded',
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

export default AppointmentSummaryCards;
