import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const LabResultsTable = ({ results, onViewResult }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* ── Desktop & Tablet Table View ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-5">Test Details</th>
              <th className="py-3 px-4">Test ID</th>
              <th className="py-3 px-4">Requested By</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
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
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                          isCompleted
                            ? 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isCompleted ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#17221B] group-hover:text-[#15803D] transition-colors truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                          {item.shortName || item.specimenType || 'Routine Panel'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Test ID */}
                  <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#475569]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {item.id}
                    </span>
                  </td>

                  {/* Requested By */}
                  <td className="py-3.5 px-4 text-[#17221B] font-medium">
                    {item.requestedBy}
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 text-[#64748B]">
                    {item.department}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-[#64748B] whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    {isCompleted ? (
                      <button
                        onClick={() => onViewResult(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                      >
                        <span>View Result</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        aria-disabled="true"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] bg-slate-50 border border-[#E2E8F0] cursor-not-allowed opacity-80"
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

      {/* ── Mobile Card View ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {results.map((item) => {
          const isCompleted = item.status === 'Completed';

          return (
            <div key={item.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
              {/* Card Header: Icon + Title + Status */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {isCompleted ? (
                      <FileText className="h-4.5 w-4.5" />
                    ) : (
                      <Clock className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#17221B] leading-snug truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[10px] font-semibold text-[#475569] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-[#64748B]">·</span>
                      <span className="text-[11px] text-[#64748B]">{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                    Requested By
                  </span>
                  <span className="text-[#17221B] font-medium truncate block mt-0.5">
                    {item.requestedBy}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block">
                    Department
                  </span>
                  <span className="text-[#17221B] font-medium truncate block mt-0.5">
                    {item.department}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-0.5">
                {isCompleted ? (
                  <button
                    onClick={() => onViewResult(item)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg text-xs font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>View Result</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg text-xs font-medium text-[#94A3B8] bg-slate-50 border border-[#E2E8F0] cursor-not-allowed opacity-80"
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

