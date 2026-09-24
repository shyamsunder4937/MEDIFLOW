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
        className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#17221B]">
                  Diagnostic Laboratory Report
                </h2>
                <span className="font-mono text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#15803D]/20">
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
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17221B] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Phase 1 Mock Notice ── */}
        <div className="mx-4 sm:mx-5 mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Mock Result — Phase 1 Demonstration</span>
            <p className="text-[11px] text-amber-700 mt-0.5">
              These values represent test findings formatted for hospital staff verification and workflow simulation.
            </p>
          </div>
        </div>

        {/* ── Patient & Specimen Summary ── */}
        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <div>
              <span className="text-[#64748B] flex items-center gap-1">
                <User className="h-3 w-3 text-[#15803D]" /> Patient:
              </span>
              <strong className="text-[#17221B] font-semibold block mt-0.5">
                {labRequest.patientName}
              </strong>
              <span className="text-[11px] text-[#64748B] font-mono">{labRequest.patientId}</span>
            </div>

            <div>
              <span className="text-[#64748B] flex items-center gap-1">
                <Building2 className="h-3 w-3 text-[#15803D]" /> Doctor:
              </span>
              <strong className="text-[#17221B] font-semibold block mt-0.5">
                {labRequest.doctor}
              </strong>
              <span className="text-[11px] text-[#64748B]">{labRequest.department}</span>
            </div>

            <div>
              <span className="text-[#64748B] flex items-center gap-1">
                <TestTube2 className="h-3 w-3 text-[#15803D]" /> Sample:
              </span>
              <strong className="text-[#17221B] font-semibold block mt-0.5">
                {labRequest.sampleType}
              </strong>
              <span className="text-[11px] font-mono text-[#15803D]">{labRequest.sampleBarcode}</span>
            </div>

            <div>
              <span className="text-[#64748B] flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#15803D]" /> Logged:
              </span>
              <strong className="text-[#17221B] font-semibold block mt-0.5">
                {labRequest.collectedTime || 'Recorded'}
              </strong>
              <span className="text-[11px] text-[#64748B]">{labRequest.requestedDate}</span>
            </div>
          </div>

          {/* ── Test Analyte Parameters Table ── */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-[#17221B]">
                Analyte Results & Reference Intervals
              </h3>
              <span className="text-[11px] font-medium text-[#64748B]">
                Standard Biological Ranges
              </span>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B]">
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Parameter</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Measured Value</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Unit</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider">Reference Interval</th>
                    <th className="py-2.5 px-3.5 font-semibold text-[11px] uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((res, index) => {
                    const isAbnormal = res.status === 'Elevated' || res.status === 'Borderline';
                    return (
                      <tr key={index} className="hover:bg-[#F8FAFC]/70 transition-colors">
                        <td className="py-2.5 px-3.5 font-semibold text-[#17221B]">
                          {res.parameter}
                        </td>
                        <td className={`py-2.5 px-3.5 font-bold ${isAbnormal ? 'text-amber-800' : 'text-[#17221B]'}`}>
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
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              isAbnormal
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20'
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-2 text-[#64748B]">
              <ShieldCheck className="h-4 w-4 text-[#15803D]" />
              <span>
                Technician on Duty: <strong className="text-[#17221B]">{labRequest.technician}</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">
              Electronic Signature Verified
            </span>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="flex items-center justify-between p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-semibold text-[#17221B] transition-all cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[#64748B]" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
