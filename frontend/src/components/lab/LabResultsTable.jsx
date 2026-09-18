import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  UserCheck,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const LabResultsTable = ({ results, onViewResult }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      {/* ── Desktop & Tablet Table View (hidden on small mobile) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]/80 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3.5 px-5">Test Details</th>
              <th className="py-3.5 px-4">Test ID</th>
              <th className="py-3.5 px-4">Requested By</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm">
            {results.map((item) => {
              const isCompleted = item.status === 'Completed';

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Test Name & Short info */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 ${
                          isCompleted
                            ? 'bg-[#CCFBF1]/70 text-[#0F766E]'
                            : 'bg-amber-50 text-[#D97706]'
                        }`}
                      >
                        {isCompleted ? (
                          <FileText className="h-4.5 w-4.5" />
                        ) : (
                          <Clock className="h-4.5 w-4.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                          {item.shortName || item.specimenType || 'Routine Panel'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Test ID */}
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-[#475569]">
                    <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0]">
                      {item.id}
                    </span>
                  </td>

                  {/* Requested By */}
                  <td className="py-4 px-4 text-[#334155] font-medium">
                    {item.requestedBy}
                  </td>

                  {/* Department */}
                  <td className="py-4 px-4 text-[#64748B]">
                    {item.department}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-[#64748B] whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200/60">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#D97706] border border-amber-200/60">
                        <Clock className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    {isCompleted ? (
                      <button
                        onClick={() => onViewResult(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] cursor-pointer"
                      >
                        <span>View Result</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        aria-disabled="true"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] cursor-not-allowed opacity-80"
                      >
                        <span>Pending</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card View (visible on < md screens) ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {results.map((item) => {
          const isCompleted = item.status === 'Completed';

          return (
            <div key={item.id} className="p-4 space-y-3.5 hover:bg-slate-50/50 transition-colors">
              {/* Card Header: Icon + Title + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-[#CCFBF1]/70 text-[#0F766E]'
                        : 'bg-amber-50 text-[#D97706]'
                    }`}
                  >
                    {isCompleted ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <Clock className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0F172A] leading-snug truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[11px] font-semibold text-[#475569] bg-[#F1F5F9] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                        {item.id}
                      </span>
                      <span className="text-[11px] text-[#64748B]">•</span>
                      <span className="text-[11px] text-[#64748B]">{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200/60">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-[#D97706] border border-amber-200/60">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]/70">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                    Requested By
                  </span>
                  <span className="text-[#334155] font-medium truncate block">
                    {item.requestedBy}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">
                    Department
                  </span>
                  <span className="text-[#334155] font-medium truncate block">
                    {item.department}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                {isCompleted ? (
                  <button
                    onClick={() => onViewResult(item)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.99] transition-all shadow-xs"
                  >
                    <span>View Result</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] cursor-not-allowed opacity-80"
                  >
                    <span>Pending Lab Processing</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
