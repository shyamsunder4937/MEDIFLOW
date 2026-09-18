import React, { useState } from 'react';
import {
  FlaskConical,
  FileText,
  Eye,
  CheckCircle2,
  X,
} from 'lucide-react';

export const PatientLabResults = ({ labResults = [] }) => {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-[#0F766E]" />
          Existing Lab Results
        </h2>
        <span className="text-[10px] font-semibold text-[#64748B] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
          {labResults.length} Available
        </span>
      </div>

      {labResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-2.5 px-3">Test</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {labResults.map((result, idx) => (
                <tr key={`${result.test}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#0F172A]">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-[#0F766E]" />
                      <span>{result.test}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      {result.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#64748B]">
                    {result.date}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedResult(result)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/50 border border-transparent hover:border-[#0F766E]/20 transition-all cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Result</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-[#64748B] space-y-1">
          <FlaskConical className="h-6 w-6 text-slate-300 mx-auto" />
          <p className="font-semibold text-[#0F172A]">No lab results available</p>
          <p className="text-[11px] text-[#94A3B8]">
            No completed diagnostic panels on file for this patient.
          </p>
        </div>
      )}

      {/* Lab Result Details Modal */}
      {selectedResult && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedResult(null)}
        >
          <div
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#0F766E]" />
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {selectedResult.test}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="p-1 rounded-lg text-[#64748B] hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-[#64748B]">Report Date:</span>
                <span className="font-semibold text-[#0F172A]">{selectedResult.date}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-[#64748B]">Verification Status:</span>
                <span className="font-semibold text-emerald-700">Verified by Pathology Lab</span>
              </div>

              <div className="p-3 rounded-xl bg-[#CCFBF1]/30 border border-[#0F766E]/20 space-y-1">
                <span className="font-bold text-[11px] text-[#0F766E] uppercase tracking-wider block">
                  Diagnostic Findings (Sample Values)
                </span>
                <p className="text-[#0F172A] font-mono text-xs leading-relaxed">
                  {selectedResult.results || 'Panel values within normal reference range.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#115E59] transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
