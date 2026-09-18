import React from 'react';
import { Info, ShieldCheck, UserCheck } from 'lucide-react';

export const PharmacyInformationCard = () => (
  <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 space-y-4">
    <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
        <Info className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Pharmacy Information</h3>
        <p className="text-[11px] text-[#64748B]">Usage & disclaimer guidelines</p>
      </div>
    </div>

    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
      Your prescriptions and pharmacy orders are displayed here for tracking purposes.
      Medication decisions should always follow instructions from your healthcare professional.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
        <ShieldCheck className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-[#0F172A] block">Verified Dispensing</span>
          <span className="text-[11px] text-[#64748B]">
            All prescriptions are verified by a licensed hospital pharmacist before dispensation.
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]/70">
        <UserCheck className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-[#0F172A] block">Doctor's Orders Only</span>
          <span className="text-[11px] text-[#64748B]">
            MediFlow dispenses only what your doctor has prescribed for your current visit.
          </span>
        </div>
      </div>
    </div>
  </div>
);
