import React from 'react';
import { Clock, Moon } from 'lucide-react';

export const WorkingHours = ({ workingHours }) => {
  const schedule = workingHours?.schedule || [
    { day: 'Monday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Tuesday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Wednesday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Thursday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Friday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Saturday', hours: '08:00 AM – 04:00 PM', isOff: false },
    { day: 'Sunday', hours: 'Day Off', isOff: true },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#15803D]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
              Working Hours
            </h2>
            <p className="text-[11px] text-[#64748B]">
              OPD consultation schedule & clinical shift timings
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-0.5 rounded-full">
          08:00 AM – 04:00 PM
        </span>
      </div>

      {/* Summary Banner */}
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
        <span className="text-[#64748B] font-medium">Standard OPD Duty:</span>
        <span className="font-semibold text-[#17221B]">Monday – Saturday (8 hrs/day)</span>
      </div>

      {/* Weekly Schedule List */}
      <div className="divide-y divide-[#F1F5F9] rounded-lg border border-[#E2E8F0] overflow-hidden text-xs">
        {schedule.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between px-3.5 py-2.5 bg-white hover:bg-slate-50/60 transition-colors"
          >
            <div className="font-medium text-[#17221B]">
              <span>{item.day}</span>
            </div>

            <div>
              {item.isOff ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                  <Moon className="h-3 w-3" />
                  Day Off
                </span>
              ) : (
                <span className="font-mono text-xs text-[#17221B] font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                  {item.hours}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHours;

