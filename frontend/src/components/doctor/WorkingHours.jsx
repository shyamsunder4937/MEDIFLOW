import React from 'react';
import { Clock, Calendar, CheckCircle2, Moon } from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Clock className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Working Hours
            </h2>
            <p className="text-[11px] text-[#64748B]">
              OPD consultation schedule & clinical shift timings
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
          08:00 AM – 04:00 PM
        </span>
      </div>

      {/* Summary Banner */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
        <span className="text-[#64748B] font-medium">Standard OPD Duty:</span>
        <span className="font-bold text-[#0F172A]">Monday – Saturday (8 hrs/day)</span>
      </div>

      {/* Weekly Schedule List */}
      <div className="divide-y divide-slate-100 rounded-xl border border-[#E2E8F0] overflow-hidden text-xs">
        {schedule.map((item) => (
          <div
            key={item.day}
            className="flex items-center justify-between p-3 bg-white hover:bg-slate-50/70 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-[#0F172A]">
              <span className="w-24">{item.day}</span>
            </div>

            <div>
              {item.isOff ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  <Moon className="h-3 w-3" />
                  Day Off
                </span>
              ) : (
                <span className="font-mono text-[#0F766E] font-bold bg-[#CCFBF1]/30 px-2 py-0.5 rounded">
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
