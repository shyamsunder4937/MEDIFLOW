import React from 'react';
import { Calendar, CheckCircle2, Stethoscope, Hourglass } from 'lucide-react';
import { doctorDashboardData } from '../../data/doctorMockData';

export const TodayOverview = () => {
  const schedule = doctorDashboardData.todaySchedule;

  const getTimelineDot = (status) => {
    switch (status) {
      case 'In Consultation':
        return {
          bg: 'bg-blue-600 ring-4 ring-blue-100',
          icon: Stethoscope,
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'Completed':
        return {
          bg: 'bg-[#15803D] ring-4 ring-emerald-100',
          icon: CheckCircle2,
          badge: 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]',
        };
      case 'Waiting':
      default:
        return {
          bg: 'bg-amber-500 ring-4 ring-amber-100',
          icon: Hourglass,
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#15803D]" />
            Today's Timeline Overview
          </h2>
          <p className="text-xs text-[#64748B]">
            Chronological schedule of consultations for Dr. Arun
          </p>
        </div>
        <span className="text-[11px] font-medium text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#DCFCE7]">
          7 Slots Total
        </span>
      </div>

      <div className="mt-4 relative pl-3 sm:pl-4">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute left-[23px] sm:left-[27px] top-3 bottom-3 w-0.5 bg-slate-200" />

        <div className="space-y-3 sm:space-y-3.5">
          {schedule.map((item, index) => {
            const dotConfig = getTimelineDot(item.status);
            const isCurrent = item.status === 'In Consultation';

            return (
              <div
                key={`${item.time}-${index}`}
                className={`relative flex items-start gap-3.5 p-2 sm:p-2.5 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-blue-50/40 border border-blue-200/80 shadow-xs'
                    : 'hover:bg-slate-50/60'
                }`}
              >
                {/* Timeline Dot with Pulse if In Consultation */}
                <div className="relative z-10 flex-shrink-0 mt-0.5">
                  <div
                    className={`h-3.5 w-3.5 rounded-full ${dotConfig.bg} flex items-center justify-center`}
                  >
                    {isCurrent && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#17221B]">
                        {item.time}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#17221B] font-bold text-[10px]">
                        {item.queueNo}
                      </span>
                      <span className="font-semibold text-xs text-[#17221B] truncate">
                        {item.patientName}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-0.5 truncate">
                      {item.category} • {item.duration}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${dotConfig.badge}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
