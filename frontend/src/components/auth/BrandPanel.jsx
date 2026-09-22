import React from 'react';
import {
  Activity,
  ClipboardCheck,
  Clock,
  Stethoscope,
  FlaskConical,
  Pill,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react';

const JOURNEY_STAGES = [
  { name: 'Registration', sub: 'Check-in', icon: ClipboardCheck },
  { name: 'Queue', sub: 'Live routing', icon: Clock, highlight: true },
  { name: 'Doctor', sub: 'Consultation', icon: Stethoscope },
  { name: 'Laboratory', sub: 'Diagnostics', icon: FlaskConical },
  { name: 'Pharmacy', sub: 'Dispensation', icon: Pill },
  { name: 'Completed', sub: 'Discharge', icon: CheckCircle2 },
];

export const BrandPanel = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 lg:p-14 bg-[#F8FAFC] border-r border-[#E2E8F0] text-[#17221B] select-none overflow-y-auto">
      {/* ── Header: Hospital Brand Logo ── */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] shadow-2xs">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-[#17221B] block">
              MEDIFLOW
            </span>
            <span className="text-xs font-semibold text-[#64748B] block">
              Hospital Patient Coordination Platform
            </span>
          </div>
        </div>
      </div>

      {/* ── Center: Main Message & Signature Hospital Journey Visual ── */}
      <div className="my-auto py-8 space-y-7 max-w-xl">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#17221B] leading-snug">
            Connected care,<br />
            from registration to discharge.
          </h1>

          <p className="text-sm text-[#64748B] leading-relaxed max-w-lg">
            MediFlow brings patients, doctors, staff, laboratory, and pharmacy workflows together in one coordinated hospital experience.
          </p>
        </div>

        {/* ── Signature Visual: Hospital Patient Journey ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D]">
              Coordinated Patient Journey
            </span>
            <span className="text-[11px] text-[#64748B] font-medium">
              Registration → Completed
            </span>
          </div>

          {/* 6 Connected Stages */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 relative">
            {JOURNEY_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.name}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all ${
                    stage.highlight
                      ? 'bg-[#F0FDF4] border-[#15803D]/30 shadow-2xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg mb-2 ${
                      stage.highlight
                        ? 'bg-[#15803D] text-white shadow-2xs'
                        : 'bg-white text-[#15803D] border border-[#DCFCE7]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-bold text-[#17221B] leading-tight truncate w-full">
                    {stage.name}
                  </span>
                  <span className="text-[9.5px] text-[#64748B] mt-0.5 leading-tight truncate w-full">
                    {stage.sub}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Journey Caption */}
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] flex-shrink-0" />
            <span className="font-medium text-center">
              One patient journey, coordinated across the hospital.
            </span>
          </div>
        </div>
      </div>

      {/* ── Footer: Trust & Security Information ── */}
      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#15803D]" />
          <span>Role-based hospital access control</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
          <Lock className="h-3 w-3" />
          <span>Secure authentication</span>
        </div>
      </div>
    </div>
  );
};

export default BrandPanel;


