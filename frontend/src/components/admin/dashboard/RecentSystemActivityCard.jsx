import React from 'react';
import {
  History,
  UserPlus,
  Stethoscope,
  FlaskConical,
  Pill,
  CalendarCheck,
  ShieldAlert,
  Clock,
} from 'lucide-react';
import { recentSystemActivityList } from '../../../data/adminMockData';

const getActivityIcon = (type) => {
  switch (type) {
    case 'patient':
      return {
        icon: UserPlus,
        color: 'text-[#0F766E]',
        bgColor: 'bg-[#CCFBF1]',
      };
    case 'doctor':
      return {
        icon: Stethoscope,
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
      };
    case 'lab':
      return {
        icon: FlaskConical,
        color: 'text-purple-700',
        bgColor: 'bg-purple-50',
      };
    case 'pharmacy':
      return {
        icon: Pill,
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
      };
    case 'appointment':
      return {
        icon: CalendarCheck,
        color: 'text-sky-700',
        bgColor: 'bg-sky-50',
      };
    case 'system':
    default:
      return {
        icon: ShieldAlert,
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
      };
  }
};

export const RecentSystemActivityCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              <History className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Recent System Activity
              </h3>
              <p className="text-xs text-[#64748B]">
                Live audit trail of operations across portals
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            Real-time Feed
          </span>
        </div>

        {/* Timeline List */}
        <div className="space-y-3">
          {recentSystemActivityList.map((item) => {
            const { icon: Icon, color, bgColor } = getActivityIcon(item.type);

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-[#E2E8F0] transition-colors text-xs"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${bgColor} ${color} flex-shrink-0 mt-0.5`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#0F172A] truncate">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono whitespace-nowrap flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>All hospital events logged in secure audit store</span>
        <span className="font-semibold text-[#0F766E]">Audit Active</span>
      </div>
    </div>
  );
};

export default RecentSystemActivityCard;
