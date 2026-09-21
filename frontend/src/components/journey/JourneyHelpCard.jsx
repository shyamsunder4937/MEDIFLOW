import React from 'react';
import { HelpCircle, PhoneCall, FileQuestion } from 'lucide-react';

export const JourneyHelpCard = ({ onOpenReceptionModal, onOpenHelpModal }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <div className="h-9 w-9 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#17221B] tracking-tight">
            Need Assistance?
          </h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            If you need help during your hospital visit, contact the OPD reception coordinator or review patient visit instructions.
          </p>

          <div className="mt-4 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onOpenReceptionModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Contact Reception</span>
            </button>

            <button
              onClick={onOpenHelpModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8FAFC] hover:bg-slate-100 text-[#17221B] border border-[#E2E8F0] text-xs font-semibold transition-colors cursor-pointer"
            >
              <FileQuestion className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Visit Guidelines</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

