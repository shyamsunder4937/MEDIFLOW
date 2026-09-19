import React from 'react';
import { Activity, CheckCircle2, UserCheck, Clock, CalendarCheck } from 'lucide-react';

export const AppointmentTimelineWidget = ({ appointments = [] }) => {
  const total = appointments.length || 1;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const checkedInCount = appointments.filter((a) => a.status === 'Checked In').length;
  const waitingCount = appointments.filter((a) => a.status === 'Waiting').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  const confirmedPct = Math.round((confirmedCount / total) * 100);
  const checkedInPct = Math.round((checkedInCount / total) * 100);
  const waitingPct = Math.round((waitingCount / total) * 100);
  const completedPct = Math.round((completedCount / total) * 100);

  const stages = [
    {
      label: 'Scheduled',
      count: confirmedCount,
      pct: confirmedPct,
      color: 'bg-blue-500',
      text: 'text-blue-700',
      bg: 'bg-blue-50',
      icon: CalendarCheck,
    },
    {
      label: 'Checked In',
      count: checkedInCount,
      pct: checkedInPct,
      color: 'bg-[#0F766E]',
      text: 'text-[#0F766E]',
      bg: 'bg-[#CCFBF1]/60',
      icon: UserCheck,
    },
    {
      label: 'In OPD Queue',
      count: waitingCount,
      pct: waitingPct,
      color: 'bg-amber-500',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      icon: Clock,
    },
    {
      label: 'Completed',
      count: completedCount,
      pct: completedPct,
      color: 'bg-emerald-500',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Today's Appointment Flow</h3>
            <p className="text-[11px] text-[#64748B]">Real-time patient check-in & completion progress</p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#64748B]">
          {completedCount} of {appointments.length} done
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        <div style={{ width: `${completedPct}%` }} className="bg-emerald-500 h-full transition-all" title={`Completed: ${completedCount}`} />
        <div style={{ width: `${waitingPct}%` }} className="bg-amber-500 h-full transition-all" title={`Waiting: ${waitingCount}`} />
        <div style={{ width: `${checkedInPct}%` }} className="bg-[#0F766E] h-full transition-all" title={`Checked In: ${checkedInCount}`} />
        <div style={{ width: `${confirmedPct}%` }} className="bg-blue-500 h-full transition-all" title={`Scheduled: ${confirmedCount}`} />
      </div>

      {/* Stage Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.label}
              className={`p-2.5 rounded-xl border border-slate-100 ${stage.bg} flex items-center gap-2`}
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${stage.color} text-white shadow-2xs flex-shrink-0`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-bold ${stage.text}`}>
                  {stage.count}
                </div>
                <div className="text-[10px] text-[#64748B] font-medium truncate">
                  {stage.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentTimelineWidget;
