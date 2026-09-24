import React from 'react';
import { Users, Clock, CalendarDays, Stethoscope, TrendingUp } from 'lucide-react';
import { staffSummaryStats } from '../../data/staffMockData';

export const StaffStatCards = ({ stats = staffSummaryStats }) => {
  const cards = [
    {
      id: 'patients-today',
      title: stats.patientsToday.label,
      value: stats.patientsToday.value,
      subtext: stats.patientsToday.subtext,
      badge: stats.patientsToday.trend,
      icon: Users,
      badgeType: 'positive',
    },
    {
      id: 'waiting-patients',
      title: stats.waitingPatients.label,
      value: stats.waitingPatients.value,
      subtext: stats.waitingPatients.subtext,
      badge: stats.waitingPatients.averageWaitTime,
      icon: Clock,
      badgeType: 'warning',
    },
    {
      id: 'today-appointments',
      title: stats.todayAppointments.label,
      value: stats.todayAppointments.value,
      subtext: stats.todayAppointments.subtext,
      badge: `${stats.todayAppointments.completed} completed`,
      icon: CalendarDays,
      badgeType: 'neutral',
    },
    {
      id: 'available-doctors',
      title: stats.availableDoctors.label,
      value: stats.availableDoctors.value,
      subtext: stats.availableDoctors.subtext,
      badge: `${stats.availableDoctors.totalDoctors} on duty`,
      icon: Stethoscope,
      badgeType: 'accent',
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
            {/* Top row: Label & subtle icon */}
            <div className="flex items-center justify-between gap-2 pb-2">
              <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                {card.title}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-[#64748B] border border-slate-100 flex-shrink-0">
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Middle: Prominent operational number */}
            <div className="my-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#17221B] tracking-tight">
                {card.value}
              </div>
            </div>

            {/* Bottom: Subtext & Compact badge */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs gap-2">
              <span className="text-[#64748B] text-[11px] truncate">
                {card.subtext}
              </span>
              {card.badge && (
                <span
                  className={`inline-flex items-center gap-1 font-semibold text-[10px] px-2 py-0.5 rounded-md flex-shrink-0 ${
                    card.badgeType === 'positive'
                      ? 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]'
                      : card.badgeType === 'warning'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : card.badgeType === 'accent'
                      ? 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]'
                      : 'bg-slate-50 text-[#475569] border border-[#E2E8F0]'
                  }`}
                >
                  {card.badgeType === 'positive' && (
                    <TrendingUp className="h-3 w-3 text-[#15803D]" />
                  )}
                  {card.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffStatCards;

