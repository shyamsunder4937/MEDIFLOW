import React from 'react';
import { Stethoscope, FlaskConical, ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Stethoscope: Stethoscope,
  FlaskConical: FlaskConical,
  ClipboardCheck: ClipboardCheck,
};

export const NextStepsCard = ({ steps = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
            What Happens Next?
          </h3>
          <p className="text-xs text-[#64748B]">
            Upcoming stages in your visit plan
          </p>
        </div>
        <span className="text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full">
          3 Steps Ahead
        </span>
      </div>

      {/* 3 Step Cards */}
      <div className="mt-4 space-y-3">
        {steps.map((step, idx) => {
          const Icon = iconMap[step.icon] || CheckCircle2;
          const isNext = idx === 0;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                isNext
                  ? 'bg-teal-50/40 border-teal-200 shadow-2xs'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
              }`}
            >
              {/* Step number / icon */}
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isNext
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>

              {/* Step description */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#0F172A] truncate">
                    {step.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isNext
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-slate-200/70 text-[#64748B]'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
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
