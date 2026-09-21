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
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-[#E2E8F0] my-auto overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E2E8F0] bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17221B]">Lab Result</h3>
              <p className="text-[11px] text-[#64748B]">
                Official Diagnostic Laboratory Summary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200 hover:text-[#17221B] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {/* Test Title & ID Banner */}
          <div className="bg-slate-50 border border-[#E2E8F0] rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2 py-0.5 rounded">
                  {result.shortName || 'Diagnostic Report'}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#17221B] mt-1">
                  {result.name}
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Ordered by {result.requestedBy} • {result.department}
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-1 font-mono text-xs">
                <span className="text-[10px] uppercase font-bold text-[#64748B]">
                  Test ID
                </span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] font-semibold text-[#17221B] shadow-2xs">
                  {result.id}
                </span>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5 pt-3.5 border-t border-[#E2E8F0] text-xs">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                <span className="text-[#64748B]">Patient:</span>
                <span className="font-semibold text-[#17221B]">
                  {result.patientName || 'Rahul Kumar'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                <span className="text-[#64748B]">Laboratory:</span>
                <span className="font-semibold text-[#17221B] truncate">
                  {result.laboratory || 'MediFlow Central Laboratory'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                <span className="text-[#64748B]">Collected:</span>
                <span className="font-semibold text-[#17221B]">
                  {result.collected || '18 September 2026, 11:20 AM'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                <span className="text-[#64748B]">Reported:</span>
                <span className="font-semibold text-[#17221B]">
                  {result.reported || '18 September 2026, 1:05 PM'}
                </span>
              </div>
            </div>
          </div>

          {/* RESULT Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#17221B] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#15803D]" />
                Result Parameters
              </h5>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                <CheckCircle2 className="h-3 w-3" />
                Verified Complete
              </span>
            </div>

            {/* Values Display */}
            {result.values && result.values.length > 0 ? (
              <div className="border border-[#E2E8F0] rounded-lg overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                        <th className="py-2 px-3.5">Parameter</th>
                        <th className="py-2 px-3.5">Observed Value</th>
                        <th className="py-2 px-3.5">Standard Reference Interval</th>
                        <th className="py-2 px-3.5 text-right">Indicator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {result.values.map((v, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-2.5 px-3.5 font-semibold text-[#17221B]">
                            {v.parameter}
                          </td>
                          <td className="py-2.5 px-3.5 font-mono font-bold text-[#15803D]">
                            {v.value}
                          </td>
                          <td className="py-2.5 px-3.5 text-[#64748B]">
                            {v.reference || 'Normal'}
                          </td>
                          <td className="py-2.5 px-3.5 text-right">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
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
              <div className="p-5 text-center rounded-lg bg-slate-50 border border-[#E2E8F0]">
                <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-[#17221B]">
                  Values are currently being processed
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Detailed biochemical numbers will populate upon completion.
                </p>
              </div>
            )}
          </div>

          {/* Reference Disclaimer Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-[#E2E8F0]">
            <AlertCircle className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#64748B] leading-relaxed">
              <span className="font-bold text-[#17221B]">Illustrative Data Notice: </span>
              Reference ranges shown here are illustrative mock data for the Phase 1 interface.
              This system does not provide medical self-diagnosis or advice.
            </div>
          </div>

          {/* Signoff verification footer */}
          <div className="flex items-center gap-2 text-[11px] text-[#64748B] pt-0.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#15803D]" />
            <span>
              Electronically verified by{' '}
              <strong className="text-[#17221B]">
                {result.verifiedBy || 'Dr. Swaminathan (Consultant Pathologist)'}
              </strong>
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 px-5 sm:px-6 py-3 border-t border-[#E2E8F0] bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#64748B] bg-white border border-[#E2E8F0] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onViewReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>View Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

