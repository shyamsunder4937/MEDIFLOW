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
      iconBg: 'bg-[#CCFBF1]',
      iconColor: 'text-[#0F766E]',
    },
    {
      id: 'waiting-patients',
      title: stats.waitingPatients.label,
      value: stats.waitingPatients.value,
      subtext: stats.waitingPatients.subtext,
      badge: stats.waitingPatients.averageWaitTime,
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      id: 'today-appointments',
      title: stats.todayAppointments.label,
      value: stats.todayAppointments.value,
      subtext: stats.todayAppointments.subtext,
      badge: 'Today',
      icon: CalendarDays,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 'available-doctors',
      title: stats.availableDoctors.label,
      value: stats.availableDoctors.value,
      subtext: stats.availableDoctors.subtext,
      badge: 'Active Shift',
      icon: Stethoscope,
      iconBg: 'bg-teal-50',
      iconColor: 'text-[#0F766E]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs hover:border-[#0F766E]/40 hover:shadow-sm transition-all duration-150 flex flex-col justify-between space-y-3"
          >
            {/* Top row: Title and Icon */}
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                {card.title}
              </span>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} shadow-2xs flex-shrink-0`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {/* Middle: Big Value */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {card.value}
              </div>
            </div>

            {/* Bottom: Subtext & Badge */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-[#64748B] text-[11px] truncate">
                {card.subtext}
              </span>
              {card.badge && (
                <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-[#0F766E] border border-slate-200">
                  {card.id === 'patients-today' && <TrendingUp className="h-3 w-3 text-emerald-600" />}
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
