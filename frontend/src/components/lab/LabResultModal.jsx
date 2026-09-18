import React, { useEffect } from 'react';
import {
  X,
  FileText,
  Building2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  Download,
  CheckCircle2,
} from 'lucide-react';

export const LabResultModal = ({ isOpen, onClose, result, onViewReport }) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] my-auto overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Lab Result</h3>
              <p className="text-[11px] text-[#64748B]">
                Official Diagnostic Laboratory Summary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 hover:text-[#0F172A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            aria-label="Close modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Test Title & ID Banner */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1]/70 px-2 py-0.5 rounded">
                  {result.shortName || 'Diagnostic Report'}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mt-1">
                  {result.name}
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Ordered by {result.requestedBy} • {result.department}
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-1 font-mono text-xs">
                <span className="text-[10px] uppercase font-bold text-[#94A3B8]">
                  Test ID
                </span>
                <span className="px-2 py-1 rounded bg-white border border-[#E2E8F0] font-semibold text-[#0F172A] shadow-xs">
                  {result.id}
                </span>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#E2E8F0]/70 text-xs">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-[#64748B] flex-shrink-0" />
                <span className="text-[#64748B]">Patient:</span>
                <span className="font-semibold text-[#0F172A]">
                  {result.patientName || 'Rahul Kumar'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-[#64748B] flex-shrink-0" />
                <span className="text-[#64748B]">Laboratory:</span>
                <span className="font-semibold text-[#0F172A] truncate">
                  {result.laboratory || 'MediFlow Central Laboratory'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[#64748B] flex-shrink-0" />
                <span className="text-[#64748B]">Collected:</span>
                <span className="font-semibold text-[#0F172A]">
                  {result.collected || '18 September 2026, 11:20 AM'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#64748B] flex-shrink-0" />
                <span className="text-[#64748B]">Reported:</span>
                <span className="font-semibold text-[#0F172A]">
                  {result.reported || '18 September 2026, 1:05 PM'}
                </span>
              </div>
            </div>
          </div>

          {/* RESULT Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
                Result Parameters
              </h5>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <CheckCircle2 className="h-3 w-3" />
                Verified Complete
              </span>
            </div>

            {/* Values Display */}
            {result.values && result.values.length > 0 ? (
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                        <th className="py-2.5 px-4">Parameter</th>
                        <th className="py-2.5 px-4">Observed Value</th>
                        <th className="py-2.5 px-4">Standard Reference Interval</th>
                        <th className="py-2.5 px-4 text-right">Indicator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {result.values.map((v, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">
                            {v.parameter}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#0F766E]">
                            {v.value}
                          </td>
                          <td className="py-3 px-4 text-[#64748B]">
                            {v.reference || 'Normal'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#16A34A] border border-emerald-200/70">
                              Normal
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Clock className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-[#0F172A]">
                  Values are currently being processed
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Detailed biochemical numbers will populate upon completion.
                </p>
              </div>
            )}
          </div>

          {/* Reference Disclaimer Note */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <AlertCircle className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#64748B] leading-relaxed">
              <span className="font-semibold text-[#0F172A]">Illustrative Data Notice: </span>
              Reference ranges shown here are illustrative mock data for the Phase 1 interface.
              This system does not provide medical diagnosis or self-treatment advice.
            </div>
          </div>

          {/* Signoff verification footer */}
          <div className="flex items-center gap-2 text-[11px] text-[#64748B] pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
            <span>
              Electronically verified by{' '}
              <strong className="text-[#334155]">
                {result.verifiedBy || 'Dr. N. Swaminathan (Consultant Pathologist)'}
              </strong>
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-3.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#475569] bg-white border border-[#CBD5E1] hover:bg-slate-50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onViewReport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <Download className="h-4 w-4" />
            <span>View Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
