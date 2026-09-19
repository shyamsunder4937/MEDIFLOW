import React from 'react';
import {
  UserCheck,
  ClipboardList,
  Clock,
  Stethoscope,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { patientFlowStages } from '../../../data/adminMockData';

const stepIcons = {
  registered: ClipboardList,
  checked_in: UserCheck,
  waiting: Clock,
  in_consultation: Stethoscope,
  lab_pharmacy: FlaskConical,
  completed: CheckCircle2,
};

export const PatientFlowOverview = () => {
  return (
    <section className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
              Patient Flow Overview
            </h2>
            <span className="text-[11px] font-semibold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
              Live Flow
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time progression through registration, triage, consultation, and fulfillment
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#64748B]">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
            <span>Active Volume: <strong>332 Visits</strong></span>
          </div>
          <span className="text-[#CBD5E1]">|</span>
          <div className="flex items-center gap-1 text-[#0F766E] font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Flow Efficiency: 94%</span>
          </div>
        </div>
      </div>

      {/* Process Flow Cards — Horizontal on desktop, grid on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {patientFlowStages.map((stage, idx) => {
          const Icon = stepIcons[stage.id] || ClipboardList;
          const isLast = idx === patientFlowStages.length - 1;

          return (
            <div key={stage.id} className="relative group">
              <div className="h-full bg-slate-50/80 hover:bg-white border border-[#E2E8F0] hover:border-[#0F766E]/40 rounded-xl p-3.5 transition-all duration-150 flex flex-col justify-between hover:shadow-xs">
                {/* Step header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    Step 0{idx + 1}
                  </span>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: stage.bgColor, color: stage.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Stage info */}
                <div>
                  <div className="text-xs font-bold text-[#0F172A] tracking-tight mb-1">
                    {stage.label}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-xl sm:text-2xl font-black tracking-tight"
                      style={{ color: stage.color }}
                    >
                      {stage.count}
                    </span>
                    <span className="text-[10px] text-[#64748B] font-medium">patients</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] mb-1">
                    <span className="truncate">{stage.description}</span>
                  </div>
                  <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Arrow separator on wide screens */}
              {!isLast && (
                <div className="hidden xl:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-5 w-5 items-center justify-center rounded-full bg-white border border-[#E2E8F0] text-[#94A3B8] shadow-xs">
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PatientFlowOverview;
