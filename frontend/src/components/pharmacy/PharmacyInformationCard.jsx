import React from 'react';
import { Info, ShieldCheck, UserCheck } from 'lucide-react';

export const PharmacyInformationCard = () => (
  <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 space-y-4">
    <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
        <Info className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#17221B]">Pharmacy Information</h3>
        <p className="text-xs text-[#64748B]">Usage & verification guidelines</p>
      </div>
    </div>

    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
      Your prescriptions and pharmacy orders are displayed here for tracking purposes.
      Medication decisions should always follow instructions from your healthcare professional.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <ShieldCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-[#17221B] block">Verified Dispensing</span>
          <span className="text-xs text-[#64748B] mt-0.5 block">
            All prescriptions are verified by a licensed hospital pharmacist before dispensation.
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <UserCheck className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-[#17221B] block">Doctor's Orders Only</span>
          <span className="text-xs text-[#64748B] mt-0.5 block">
            MediFlow dispenses only what your doctor has prescribed for your current visit.
          </span>
        </div>
      </div>
    </div>
  </div>
);
