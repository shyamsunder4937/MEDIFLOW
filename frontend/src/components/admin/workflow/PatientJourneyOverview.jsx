import React from 'react';
import {
  UserPlus,
  Users,
  Stethoscope,
  Microscope,
  Package,
  CheckCircle2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';

const STAGE_ICONS = {
  registration: UserPlus,
  queue: Users,
  doctor: Stethoscope,
  laboratory: Microscope,
  pharmacy: Package,
  completed: CheckCircle2,
};

export const PatientJourneyOverview = ({ stages }) => {
  return (
    <section aria-label="Patient Journey Overview" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              Patient Journey Pipeline
              <span className="text-[10px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                Live Overview
              </span>
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Continuous patient progression across registration, queue, consultation, lab diagnostics, and pharmacy fulfillment.
            </p>
          </div>
          <div className="text-[11px] text-[#64748B] font-medium flex items-center gap-1.5 self-start sm:self-auto">
            <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
            Avg. Total Journey: <span className="font-bold text-[#0F172A]">~58 min</span>
          </div>
        </div>

        {/* Connected Stages Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {stages.map((stage, idx) => {
            const Icon = STAGE_ICONS[stage.id] || UserPlus;
            const isLast = idx === stages.length - 1;

            return (
              <div
                key={stage.id}
                className="relative bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-[#E2E8F0] p-3.5 flex flex-col justify-between transition-all group hover:border-[#0F766E]/40 hover:shadow-xs"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#E2E8F0] text-[#0F766E] shadow-2xs group-hover:bg-[#CCFBF1] transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs text-[#0F172A]">
                      {stage.label}
                    </span>
                  </div>
                  <WorkflowStatusBadge status={stage.status} />
                </div>

                {/* Patient Count */}
                <div className="my-1.5">
                  <div className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                    {stage.count}{' '}
                    <span className="text-xs font-normal text-[#64748B]">
                      patients
                    </span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5 truncate">
                    {stage.description}
                  </div>
                </div>

                {/* Turnaround Time Footer */}
                <div className="pt-2 mt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-[#64748B]">
                  <span>Avg Stage:</span>
                  <span className="font-semibold text-[#0F766E]">{stage.avgTime}</span>
                </div>

                {/* Connector Arrow (Desktop / Wide screen indicator) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 h-5 w-5 rounded-full bg-white border border-[#E2E8F0] items-center justify-center text-[#94A3B8] shadow-2xs">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PatientJourneyOverview;
