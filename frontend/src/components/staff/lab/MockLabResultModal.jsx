import React from 'react';
import {
  X,
  FileCheck,
  Printer,
  AlertTriangle,
  User,
  Building2,
  TestTube2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const MockLabResultModal = ({ isOpen, onClose, labRequest }) => {
  if (!isOpen || !labRequest) return null;

  const results = labRequest.mockResults || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#E2E8F0] bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] shadow-inner">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  Diagnostic Laboratory Report
                </h2>
                <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-full border border-[#0F766E]/20">
                  {labRequest.id}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {labRequest.test} ({labRequest.category})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Important Phase 1 Mock Notice ── */}
        <div className="mx-5 sm:mx-6 mt-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Mock Result — Phase 1 Demonstration</span>
            <p className="text-[11px] text-amber-700 mt-0.5">
              These are mock sample values designed for UI workflow simulation. Demonstration values only. Not real medical advice or diagnosis.
            </p>
          </div>
        </div>

        {/* ── Patient & Specimen Metadata ── */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-xs">
            <div>
              <span className="text-[#64748B] block flex items-center gap-1">
                <User className="h-3 w-3 text-[#0F766E]" /> Patient:
              </span>
              <strong className="text-[#0F172A] font-bold block mt-0.5">
                {labRequest.patientName}
              </strong>
              <span className="text-[11px] text-[#94A3B8] font-mono">{labRequest.patientId}</span>
            </div>

            <div>
              <span className="text-[#64748B] block flex items-center gap-1">
                <Building2 className="h-3 w-3 text-[#0F766E]" /> Doctor:
              </span>
              <strong className="text-[#0F172A] font-bold block mt-0.5">
                {labRequest.doctor}
              </strong>
              <span className="text-[11px] text-[#64748B]">{labRequest.department}</span>
            </div>

            <div>
              <span className="text-[#64748B] block flex items-center gap-1">
                <TestTube2 className="h-3 w-3 text-[#0F766E]" /> Sample Type:
              </span>
              <strong className="text-[#0F172A] font-bold block mt-0.5">
                {labRequest.sampleType}
              </strong>
              <span className="text-[11px] font-mono text-[#0F766E]">{labRequest.sampleBarcode}</span>
            </div>

            <div>
              <span className="text-[#64748B] block flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#0F766E]" /> Collected:
              </span>
              <strong className="text-[#0F172A] font-bold block mt-0.5">
                {labRequest.collectedTime || 'Recorded'}
              </strong>
              <span className="text-[11px] text-[#64748B]">{labRequest.requestedDate}</span>
            </div>
          </div>

          {/* ── Test Analyte Parameters Table ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                Analyte Test Results & Observations
              </h3>
              <span className="text-[11px] font-semibold text-[#64748B]">
                Units & Biological Reference Intervals
              </span>
            </div>

            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-[#64748B]">
                    <th className="py-2.5 px-3.5 font-bold">Investigation / Parameter</th>
                    <th className="py-2.5 px-3.5 font-bold">Measured Value</th>
                    <th className="py-2.5 px-3.5 font-bold">Unit</th>
                    <th className="py-2.5 px-3.5 font-bold">Reference Interval</th>
                    <th className="py-2.5 px-3.5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((res, index) => {
                    const isAbnormal = res.status === 'Elevated' || res.status === 'Borderline';
                    return (
                      <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 font-semibold text-[#0F172A]">
                          {res.parameter}
                        </td>
                        <td className={`py-2.5 px-3.5 font-bold ${isAbnormal ? 'text-amber-700' : 'text-[#0F172A]'}`}>
                          {res.value}
                        </td>
                        <td className="py-2.5 px-3.5 text-[#64748B] font-mono">
                          {res.unit}
                        </td>
                        <td className="py-2.5 px-3.5 text-[#64748B]">
                          {res.reference}
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              isAbnormal
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Pathologist Verification Badge & Notes ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
              <span>
                Processed by: <strong className="text-[#0F172A]">{labRequest.technician}</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">
              Electronic Signature Verified
            </span>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-t border-[#E2E8F0] bg-slate-50/50">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-[#0F172A] shadow-2xs transition-all cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
