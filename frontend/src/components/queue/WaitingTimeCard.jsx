import React from 'react';
import { Clock, Info, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export const WaitingTimeCard = ({ estimatedWait = 24, lastUpdated = '10:36 AM' }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Estimated Waiting Time
              </h3>
              <span className="text-sm font-bold text-[#0F172A]">
                OPD Schedule Forecast
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#64748B] bg-slate-50 border border-[#E2E8F0] px-2.5 py-1 rounded-full">
            <RefreshCw className="h-3 w-3 text-[#64748B]" />
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Large Time Display */}
        <div className="mt-5 text-center sm:text-left py-2">
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              {estimatedWait}
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#64748B]">
              minutes
            </span>
          </div>

          <p className="text-xs text-[#64748B] mt-1.5">
            Last updated: <span className="font-semibold text-[#0F172A]">{lastUpdated}</span>
          </p>
        </div>

        {/* Information Message with MediFlow Info Color (#2563EB) */}
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 flex items-start gap-3 text-blue-900">
          <Info className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-medium text-[#2563EB]">Hospital Operations Notice</p>
            <p className="text-blue-800/90 mt-0.5">
              Estimated waiting time may change based on hospital operations, triage escalations, or emergency consultations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-5 pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-3 text-xs">
        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[11px] text-[#64748B] block">Average Pace</span>
          <span className="font-bold text-[#0F172A] mt-0.5 block">8–10 min/case</span>
        </div>
        <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
          <span className="text-[11px] text-[#64748B] block">Lounge Seating</span>
          <span className="font-bold text-[#16A34A] mt-0.5 block flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Zone B Open
          </span>
        </div>
      </div>
    </div>
  );
};
