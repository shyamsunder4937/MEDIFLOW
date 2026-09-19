import React from 'react';
import {
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  Clock,
  LayoutGrid,
  ArrowUpRight,
} from 'lucide-react';
import { adminSummaryStats } from '../../../data/adminMockData';

const iconMap = {
  patients: {
    icon: Users,
    color: 'text-[#0F766E]',
    bgColor: 'bg-[#CCFBF1]',
    borderColor: 'border-[#0F766E]/20',
  },
  doctors: {
    icon: Stethoscope,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  staff: {
    icon: Building2,
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  appointments: {
    icon: CalendarDays,
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  waiting: {
    icon: Clock,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  departments: {
    icon: LayoutGrid,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
};

export const AdminSummaryCards = () => {
  return (
    <section aria-label="Hospital Overview Statistics" className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {adminSummaryStats.map((stat) => {
          const style = iconMap[stat.iconType] || iconMap.patients;
          const Icon = style.icon;

          return (
            <div
              key={stat.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#64748B] tracking-tight truncate">
                  {stat.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.bgColor} ${style.color} border ${style.borderColor} flex-shrink-0`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="truncate">{stat.supporting}</span>
                  {stat.trend && (
                    <span className="font-semibold text-[#0F766E] ml-1 flex-shrink-0">
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminSummaryCards;
