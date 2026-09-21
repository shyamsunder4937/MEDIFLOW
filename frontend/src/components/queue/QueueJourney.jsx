import React from 'react';
import { Check, Circle, Compass } from 'lucide-react';

export const QueueJourney = ({ stages = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17221B] tracking-tight">
              Hospital Journey
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time progress across your clinical visit today
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2.5 py-0.5 rounded-full">
          Stage 2 of 4 Active
        </span>
      </div>

      {/* ── Responsive Journey Flow ── */}
      <div className="mt-5">
        {/* Desktop / Tablet: Horizontal Stepper */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-3.5 relative">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isUpcoming = stage.status === 'upcoming';

            return (
              <div
                key={stage.id || stage.title}
                className={`relative rounded-xl p-4 transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#F0FDF4] border border-[#15803D]/40 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/70 border border-[#E2E8F0]'
                    : 'bg-white border border-[#E2E8F0]/70 opacity-70'
                }`}
              >
                {/* Connecting horizontal line indicator */}
                {idx < stages.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-6 -right-2.5 w-5 h-0.5 z-10 ${
                      isCompleted ? 'bg-[#15803D]' : 'bg-[#E2E8F0]'
                    }`}
                  />
                )}

                {/* Status Indicator Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-[#15803D] text-white'
                        : isCurrent
                        ? 'bg-[#15803D] text-white ring-3 ring-[#F0FDF4]'
                        : 'bg-slate-100 text-[#64748B] border border-[#E2E8F0]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="text-xs">●</span>
                    ) : (
                      <Circle className="h-3 w-3 text-[#94A3B8]" />
                    )}
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-slate-100 text-[#475569] border border-slate-200'
                        : isCurrent
                        ? 'bg-[#15803D] text-white shadow-2xs'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'}
                  </span>
                </div>

                {/* Stage Title & Info */}
                <div className="space-y-1">
                  <h4
                    className={`text-sm font-bold tracking-tight ${
                      isCurrent ? 'text-[#15803D]' : 'text-[#17221B]'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-tight">
                    {stage.description}
                  </p>
                  <div className="text-[11px] font-semibold text-[#64748B] pt-1">
                    {stage.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical Stepper */}
        <div className="sm:hidden space-y-2.5">
          {stages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id || stage.title}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#F0FDF4] border border-[#15803D]/40 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/70 border-[#E2E8F0]'
                    : 'bg-white border-[#E2E8F0]/80 opacity-75'
                }`}
              >
                {/* Icon */}
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-[#15803D] text-white'
                      : isCurrent
                      ? 'bg-[#15803D] text-white ring-2 ring-[#F0FDF4]'
                      : 'bg-slate-100 text-[#94A3B8] border border-[#E2E8F0]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="text-[10px]">●</span>
                  ) : (
                    <Circle className="h-2.5 w-2.5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-bold truncate ${
                        isCurrent ? 'text-[#15803D]' : 'text-[#17221B]'
                      }`}
                    >
                      {stage.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-slate-100 text-[#475569]'
                          : isCurrent
                          ? 'bg-[#15803D] text-white'
                          : 'bg-slate-100 text-[#64748B]'
                      }`}
                    >
                      {isCompleted ? '✓ Done' : isCurrent ? '● Current' : 'Upcoming'}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {stage.description}
                  </p>
                  <span className="text-[11px] font-medium text-[#64748B] block mt-1">
                    {stage.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
