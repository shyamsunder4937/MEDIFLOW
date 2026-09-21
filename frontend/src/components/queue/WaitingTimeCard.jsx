import React from 'react';
import { Clock, Info, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WaitingTimeCard = ({ estimatedWait = 24, lastUpdated = '10:36 AM' }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
      <div>
        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#17221B] uppercase tracking-wider">
                Estimated Wait
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#64748B] bg-slate-50 border border-[#E2E8F0] px-2.5 py-0.5 rounded-lg">
            <RefreshCw className="h-3 w-3 text-[#64748B]" />
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* ── Large Time Display ── */}
        <div className="mt-4 text-center sm:text-left py-1">
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-3xl sm:text-4xl font-black text-[#17221B] tracking-tight">
              {estimatedWait}
            </span>
            <span className="text-base font-semibold text-[#64748B]">
              minutes
            </span>
          </div>

          <p className="text-xs text-[#64748B] mt-1">
            Last refreshed at <span className="font-semibold text-[#17221B]">{lastUpdated}</span>
          </p>
        </div>

        {/* ── Hospital Operations Notice ── */}
        <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-slate-50/80 p-3.5 flex items-start gap-2.5 text-[#17221B]">
          <Info className="h-4 w-4 text-[#15803D] flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold text-[#17221B]">Hospital Schedule Advisory</p>
            <p className="text-[#64748B] mt-0.5">
              Wait times are calculated in real time and may vary depending on clinical complexity and emergency triage.
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer Metrics ── */}
      <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] grid grid-cols-2 gap-2.5 text-xs">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] block uppercase font-bold">Average Pace</span>
          <span className="font-bold text-[#17221B] mt-0.5 block">~4 min / patient</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] block uppercase font-bold">Lounge Status</span>
          <span className="font-bold text-[#15803D] mt-0.5 block flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" /> Zone B Open
          </span>
        </div>
      </div>
    </div>
  );
};
