import React from 'react';
import {
  Clock,
  FlaskConical,
  TestTube2,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export const LabWorkflowGuide = () => {
  const steps = [
    { name: 'Pending', desc: 'Requisition Generated', icon: Clock, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'Sample Required', desc: 'Awaiting Phlebotomy', icon: FlaskConical, color: 'text-amber-800 bg-amber-50/80 border-amber-200' },
    { name: 'Sample Collected', desc: 'Barcoded & Logged', icon: TestTube2, color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { name: 'Processing', desc: 'Analyzer Running', icon: RefreshCw, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { name: 'Result Ready', desc: 'Verified Findings', icon: FileCheck, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'Completed', desc: 'Delivered to Doctor', icon: CheckCircle2, color: 'text-[#15803D] bg-[#F0FDF4] border-[#15803D]/20' },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#17221B]">
            Laboratory Requisition & Testing Pipeline
          </h2>
          <p className="text-xs text-[#64748B]">
            Standard specimen lifecycle from clinical order intake to report verification.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-semibold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-md border border-[#15803D]/20">
          Standard SOP
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-7 w-7 items-center justify-center rounded-md border ${step.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-[#17221B]">{step.name}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{step.desc}</div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
