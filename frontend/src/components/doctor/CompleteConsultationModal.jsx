import React from 'react';
import { CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';

export const CompleteConsultationModal = ({
  isOpen,
  onClose,
  onConfirm,
  patientName = 'Patient',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Icon & Title */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-[#0F172A]">
                Complete Consultation?
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Finish session and finalize orders for {patientName}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#475569] space-y-2 leading-relaxed">
          <p className="font-semibold text-[#0F172A]">
            Are you sure you want to complete this consultation?
          </p>
          <p className="text-[11px] text-[#64748B]">
            This will mark the clinical session as concluded and route the patient to their next stage (Lab requisition / Pharmacy dispensing).
          </p>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Complete Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteConsultationModal;
