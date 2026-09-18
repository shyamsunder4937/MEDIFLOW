import React from 'react';
import { HelpCircle, PhoneCall, FileQuestion, ArrowRight } from 'lucide-react';

export const JourneyHelpCard = ({ onOpenReceptionModal, onOpenHelpModal }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center flex-shrink-0">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
            Need Help?
          </h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            If you need assistance during your visit, please contact the hospital reception desk or view patient visit guidelines.
          </p>

          <div className="mt-4 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onOpenReceptionModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#CCFBF1]" />
              <span>Contact Reception</span>
            </button>

            <button
              onClick={onOpenHelpModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] border border-[#E2E8F0] text-xs font-semibold transition-all"
            >
              <FileQuestion className="h-3.5 w-3.5 text-[#64748B]" />
              <span>View Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
