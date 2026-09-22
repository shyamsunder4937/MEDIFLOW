import React from 'react';
import { History, Calendar, User, Stethoscope, FileText } from 'lucide-react';

export const PreviousVisits = ({ previousVisits = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight flex items-center gap-2">
          <History className="h-4 w-4 text-[#15803D]" />
          Previous Visits
        </h2>
        <span className="text-[10px] font-medium text-[#64748B] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
          {previousVisits.length} Records Found
        </span>
      </div>

      {previousVisits.length > 0 ? (
        <div className="space-y-2.5">
          {previousVisits.map((visit, index) => (
            <div
              key={`${visit.date}-${index}`}
              className="p-3 rounded-lg bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors space-y-2 text-xs"
            >
              {/* Date & Department Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#15803D]" />
                  <span className="font-bold text-[#17221B]">
                    Visit — {visit.date}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-[#64748B]">
                  {visit.department}
                </span>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-1.5 text-[#64748B] text-[11px]">
                <Stethoscope className="h-3 w-3 text-[#94A3B8]" />
                <span>Consulting Doctor: </span>
                <span className="font-medium text-[#17221B]">{visit.doctor}</span>
              </div>

              {/* Summary */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-100 text-[#475569] leading-relaxed">
                <span className="font-semibold text-[#17221B]">Summary: </span>
                {visit.summary}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-[#64748B] space-y-1">
          <FileText className="h-6 w-6 text-slate-300 mx-auto" />
          <p className="font-medium text-[#17221B]">No previous visits recorded</p>
          <p className="text-[11px] text-[#94A3B8]">
            This is the patient's first registered visit at MediFlow.
          </p>
        </div>
      )}
    </div>
  );
};
