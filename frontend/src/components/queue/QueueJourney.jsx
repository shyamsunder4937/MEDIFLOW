import React from 'react';
import { Check, Circle, Compass, ArrowRight } from 'lucide-react';

export const QueueJourney = ({ stages = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Hospital Journey
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time progress across your visit today
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-3 py-1 rounded-full">
          Stage 2 of 4 Active
        </span>
      </div>

      {/* Responsive Journey Flow */}
      <div className="mt-6">
        {/* Desktop / Tablet: Horizontal Stepper */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 relative">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isUpcoming = stage.status === 'upcoming';

            return (
              <div
                key={stage.id || stage.title}
                className={`relative rounded-xl p-4 transition-all ${
                  isCurrent
                    ? 'bg-[#CCFBF1]/50 border-2 border-[#0F766E] shadow-sm'
                    : isCompleted
                    ? 'bg-[#F8FAFC] border border-[#E2E8F0]'
                    : 'bg-white border border-[#E2E8F0]/70 opacity-70'
                }`}
              >
                {/* Connecting horizontal line indicator */}
                {idx < stages.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-7 -right-3 w-6 h-0.5 z-10 ${
                      isCompleted ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'
                    }`}
                  />
                )}

                {/* Status Indicator Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-[#16A34A] text-white'
                        : isCurrent
                        ? 'bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]'
                        : 'bg-slate-100 text-[#64748B] border border-[#E2E8F0]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="text-sm">●</span>
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-[#94A3B8]" />
                    )}
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-[#0F766E] text-white shadow-xs'
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
                      isCurrent ? 'text-[#0F766E]' : 'text-[#0F172A]'
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
        <div className="sm:hidden space-y-3">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id || stage.title}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#CCFBF1]/40 border-2 border-[#0F766E] shadow-xs'
                    : isCompleted
                    ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                    : 'bg-white border-[#E2E8F0]/80 opacity-75'
                }`}
              >
                {/* Icon */}
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isCompleted
                      ? 'bg-[#16A34A] text-white'
                      : isCurrent
                      ? 'bg-[#0F766E] text-white ring-2 ring-[#CCFBF1]'
                      : 'bg-slate-100 text-[#94A3B8] border border-[#E2E8F0]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : isCurrent ? (
                    <span>●</span>
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-bold truncate ${
                        isCurrent ? 'text-[#0F766E]' : 'text-[#0F172A]'
                      }`}
                    >
                      {stage.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-slate-100 text-[#64748B]'
                      }`}
                    >
                      {isCompleted ? '✓ Completed' : isCurrent ? '● Current' : 'Upcoming'}
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
