import React from 'react';
import { Info, ShieldCheck, FileCheck } from 'lucide-react';

export const LabInformationCard = () => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 space-y-3.5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <Info className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#17221B] tracking-tight">
            About Your Lab Results
          </h3>
          <p className="text-xs text-[#64748B]">
            Hospital workflow & pathology guidelines
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
        Laboratory results are uploaded by authorized hospital staff. Your doctor will review these verified findings during your consultation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <ShieldCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#17221B] block">Quality Verified</span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block leading-relaxed">
              Every report undergoes automated analyzer calibration and pathologist verification.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
          <FileCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#17221B] block">Doctor Consultation</span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block leading-relaxed">
              Consult Dr. Arun Kumar before modifying your prescription or ongoing care routine.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

