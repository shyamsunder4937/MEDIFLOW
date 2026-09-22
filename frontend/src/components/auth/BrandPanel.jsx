import React from 'react';
import { Activity, Check, ShieldCheck, Lock } from 'lucide-react';

export const BrandPanel = () => {
  const features = [
    'Patient & appointment coordination',
    'Doctor and queue management',
    'Laboratory & pharmacy workflow',
  ];

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

      {/* ── Main Message & Value Proposition ── */}
      <div className="my-auto py-8 space-y-7 max-w-md">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-bold tracking-tight text-[#17221B] leading-snug">
            Connected care,<br />
            from registration to discharge.
          </h1>

          <p className="text-sm text-[#64748B] leading-relaxed">
            Coordinate every step of the hospital journey across patients, doctors, queues, laboratory, and pharmacy workflows.
          </p>
        </div>

        {/* ── 3 Hospital Workflow Features ── */}
        <div className="space-y-3.5 pt-2">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#17221B]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
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



