import React from 'react';
import { Stethoscope, FlaskConical, ClipboardCheck, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Stethoscope: Stethoscope,
  FlaskConical: FlaskConical,
  ClipboardCheck: ClipboardCheck,
};

export const NextStepsCard = ({ steps = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#17221B] tracking-tight">
            What Happens Next?
          </h3>
          <p className="text-xs text-[#64748B]">
            Upcoming milestones in your consultation visit plan
          </p>
        </div>
        <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2.5 py-0.5 rounded-full">
          3 Steps Ahead
        </span>
      </div>

      {/* ── Step Items ── */}
      <div className="mt-3.5 space-y-2.5">
        {steps.map((step, idx) => {
          const Icon = iconMap[step.icon] || CheckCircle2;
          const isNext = idx === 0;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                isNext
                  ? 'bg-[#F0FDF4] border-[#15803D]/30 shadow-2xs'
                  : 'bg-slate-50/70 border-[#E2E8F0]'
              }`}
            >
              {/* Step number / icon */}
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isNext
                    ? 'bg-[#15803D] text-white shadow-2xs'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              {/* Step description */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#17221B] truncate">
                    {step.title}
                  </h4>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isNext
                        ? 'bg-[#15803D] text-white'
                        : 'bg-slate-200/70 text-[#64748B]'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
