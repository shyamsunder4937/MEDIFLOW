import React from 'react';
import {
  CheckCircle,
  UserCheck,
  Clock,
  Stethoscope,
  FlaskConical,
  ClipboardCheck,
  Pill,
  Check,
  Circle,
  Sparkles,
} from 'lucide-react';

const iconMap = {
  CheckCircle: CheckCircle,
  UserCheck: UserCheck,
  Clock: Clock,
  Stethoscope: Stethoscope,
  FlaskConical: FlaskConical,
  ClipboardCheck: ClipboardCheck,
  Pill: Pill,
};

export const JourneyProgressCard = ({ stages }) => {
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const totalStages = stages.length;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Top Header & Progress Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Your Hospital Journey
            </h3>
            <p className="text-xs text-[#64748B]">
              Step-by-step progress tracking for your outpatient visit today
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-3 py-1 rounded-full">
            Stage 3 of 8: In Progress
          </span>
        </div>
      </div>

      {/* Progress Bar Gauge */}
      <div className="mt-4 mb-6">
        <div className="flex justify-between items-center text-xs text-[#64748B] mb-1.5 font-medium">
          <span>Overall Journey Progress</span>
          <span>{completedCount} of {totalStages} steps completed ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#0F766E] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Desktop: Horizontal Flow (8 Stages) ── */}
      <div className="hidden xl:grid xl:grid-cols-8 gap-2.5 relative">
        {stages.map((stage, idx) => {
          const IconComponent = iconMap[stage.icon] || Circle;
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isUpcoming = stage.status === 'upcoming';

          return (
            <div
              key={stage.id}
              className={`relative flex flex-col p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#CCFBF1]/50 border-2 border-[#0F766E] shadow-sm'
                  : isCompleted
                  ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                  : 'bg-white border-[#E2E8F0]/70 opacity-60'
              }`}
            >
              {/* Connector line on desktop */}
              {idx < stages.length - 1 && (
                <div
                  className={`hidden xl:block absolute top-6 -right-1.5 w-3 h-0.5 z-10 ${
                    isCompleted ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'
                  }`}
                />
              )}

              {/* Stage Icon */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-[#16A34A] text-white shadow-2xs'
                      : isCurrent
                      ? 'bg-[#0F766E] text-white ring-3 ring-[#CCFBF1]'
                      : 'bg-slate-100 text-[#64748B]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : (
                    <IconComponent className="h-3.5 w-3.5" />
                  )}
                </div>

                <span className="text-[10px] font-bold text-[#64748B]">
                  #{stage.id}
                </span>
              </div>

              {/* Title & Status */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4
                    className={`text-xs font-bold leading-tight line-clamp-2 ${
                      isCurrent ? 'text-[#0F766E]' : 'text-[#0F172A]'
                    }`}
                  >
                    {stage.title}
                  </h4>
                </div>

                <div className="pt-2">
                  <span
                    className={`inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'}
                  </span>
                  <p className="text-[10px] text-[#64748B] mt-1 font-medium truncate">
                    {stage.time || stage.estimated || '—'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tablet / Mobile: Responsive Stepper / List ── */}
      <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {stages.map((stage) => {
          const IconComponent = iconMap[stage.icon] || Circle;
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#CCFBF1]/40 border-2 border-[#0F766E] shadow-xs sm:col-span-2 md:col-span-2'
                  : isCompleted
                  ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                  : 'bg-white border-[#E2E8F0]/80 opacity-70'
              }`}
            >
              {/* Icon */}
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  isCompleted
                    ? 'bg-[#16A34A] text-white shadow-2xs'
                    : isCurrent
                    ? 'bg-[#0F766E] text-white ring-3 ring-[#CCFBF1]'
                    : 'bg-slate-100 text-[#64748B]'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : (
                  <IconComponent className="h-4 w-4" />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isCurrent ? 'text-[#0F766E]' : 'text-[#0F172A]'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCurrent
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {isCompleted ? '✓ Done' : isCurrent ? '● Active' : 'Upcoming'}
                  </span>
                </div>

                <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                  {stage.description}
                </p>

                <div className="text-[10px] font-semibold text-[#0F766E] mt-1">
                  {stage.time || stage.estimated || 'Pending'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
