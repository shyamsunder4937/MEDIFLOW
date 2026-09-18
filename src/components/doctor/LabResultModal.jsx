import React, { useEffect } from 'react';
import {
  FlaskConical,
  X,
  CheckCircle2,
  Clock,
  User,
  Building2,
  FileText,
  Info,
} from 'lucide-react';

export const LabResultModal = ({
  result,
  onClose,
  onMarkAsReviewed,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!result) return null;

  const isReviewed = result.status === 'Reviewed';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-modal-title"
    >
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-lg p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex-shrink-0">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <h3 id="lab-modal-title" className="text-base sm:text-lg font-bold text-[#0F172A]">
                {result.testName}
              </h3>
              <p className="text-xs text-[#64748B]">
                Laboratory Diagnostic Report • Specimen: {result.specimen || 'Clinical Sample'}
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

        {/* Patient Identity & Meta Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Patient</span>
            <span className="font-bold text-[#0F172A] mt-0.5 block truncate">
              {result.patientName}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Patient ID</span>
            <span className="font-semibold text-[#0F766E] mt-0.5 block">
              {result.patientId || `PAT-10${result.queueNumber || result.id}`}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Requested By</span>
            <span className="font-medium text-[#475569] mt-0.5 block truncate">
              {result.requestedBy || 'Dr. Arun Kumar'}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Received Time</span>
            <span className="font-medium text-[#0F172A] mt-0.5 block">
              {result.receivedTime}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Result Status</span>
            <span className={`inline-flex items-center gap-1 font-bold text-xs mt-0.5 ${
              isReviewed ? 'text-emerald-700' : 'text-blue-700'
            }`}>
              {isReviewed ? 'Reviewed' : 'Result Available'}
            </span>
          </div>

          {result.reviewedTime && (
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Reviewed At</span>
              <span className="font-medium text-emerald-800 mt-0.5 block">
                {result.reviewedTime}
              </span>
            </div>
          )}
        </div>

        {/* Diagnostic Panel Values */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Diagnostic Findings & Parameters
            </h4>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified by Pathology Lab
            </span>
          </div>

          {result.values && typeof result.values === 'object' ? (
            <div className="rounded-xl border border-[#E2E8F0] divide-y divide-slate-100 overflow-hidden text-xs">
              {Object.entries(result.values).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50/70 transition-colors">
                  <span className="text-[#475569] font-medium">{key}</span>
                  <span className="font-mono font-bold text-[#0F172A] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 text-xs text-[#64748B] text-center">
              Panel values within standard clinical limits.
            </div>
          )}
        </div>

        {/* Demo Disclaimer Note */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Demo result — for interface demonstration only.</strong> Diagnostic values are simulated for Phase 1 prototype display.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            Close
          </button>

          {!isReviewed ? (
            <button
              type="button"
              onClick={() => {
                onMarkAsReviewed(result.id);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark as Reviewed</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Already Reviewed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabResultModal;
