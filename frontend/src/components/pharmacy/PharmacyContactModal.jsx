import React, { useEffect } from 'react';
import { X, PhoneCall, MapPin } from 'lucide-react';

export const PharmacyContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
              <PhoneCall className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Pharmacy Contact</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-[#475569] leading-relaxed">
            Please contact the hospital pharmacy counter for assistance with your prescription.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <MapPin className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-[#0F172A]">MediFlow Hospital Pharmacy</p>
                <p className="text-[#64748B]">Ground Floor, OPD Block A · Counter 02</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <PhoneCall className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-[#0F172A]">+91 (080) 4123-8900 · Ext. 1101</p>
                <p className="text-[#64748B]">OPD Hours: 8:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#94A3B8] italic">
            Phone dialling is not enabled in this Phase 1 interface. Please visit the counter directly.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
