import React from 'react';
import {
  Clock,
  FlaskConical,
  TestTube2,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const LabWorkflowGuide = () => {
  const steps = [
    { name: 'Pending', desc: 'Requisition Generated', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'Sample Required', desc: 'Awaiting Phlebotomy', icon: FlaskConical, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'Sample Collected', desc: 'Barcoded & Logged', icon: TestTube2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: 'Processing', desc: 'Analyzer Running', icon: RefreshCw, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { name: 'Result Ready', desc: 'Verified by Pathologist', icon: FileCheck, color: 'text-[#0F766E] bg-[#CCFBF1] border-[#0F766E]/20' },
    { name: 'Completed', desc: 'Report Delivered', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0F172A]">
            Laboratory Specimen & Testing Workflow
          </h2>
          <p className="text-xs text-[#64748B]">
            Phase 1 mock testing pipeline from requisition intake to report verification.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20">
          Standard SOP
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between space-y-2 group hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${step.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-[#0F172A]">{step.name}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">{step.desc}</div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
