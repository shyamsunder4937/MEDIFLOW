import React from 'react';
import { Users, User, CheckCircle2, Clock, Radio } from 'lucide-react';

export const LiveQueue = ({ liveQueue = [] }) => {
  const getStatusBadge = (status, isCurrent) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-[#475569] border border-slate-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />
            Completed
          </span>
        );
      case 'In Consultation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/25">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
            </span>
            In Consultation
          </span>
        );
      case 'Waiting':
      default:
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isCurrent
                ? 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/30'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <Clock className="h-3 w-3 text-amber-600" />
            Waiting
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17221B] tracking-tight">
              Live Queue Breakdown
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time patient order in General Medicine OPD
            </p>
          </div>
        </div>

        {/* Real-time sync badge */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs text-[#64748B] bg-slate-50 border border-[#E2E8F0] px-2.5 py-1 rounded-lg font-medium">
          <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
          <span>Live OPD Feed</span>
        </div>
      </div>

      {/* ── Queue List / Table ── */}
      <div className="mt-3 divide-y divide-[#E2E8F0]/70">
        {liveQueue.map((item) => {
          const isCurrent = item.isCurrent;

          return (
            <div
              key={item.formattedNumber}
              className={`flex items-center justify-between py-3 px-3 sm:px-4 rounded-xl transition-all duration-150 ${
                isCurrent
                  ? 'bg-[#F0FDF4] border border-[#15803D]/30 shadow-2xs my-1'
                  : 'hover:bg-slate-50/80'
              }`}
            >
              {/* Token Number & Patient Info */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Number Badge */}
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg font-bold text-xs sm:text-sm flex-shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-[#15803D] text-white shadow-xs'
                      : item.status === 'Completed'
                      ? 'bg-slate-100 text-[#64748B]'
                      : item.status === 'In Consultation'
                      ? 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/25'
                      : 'bg-slate-50 text-[#17221B] border border-[#E2E8F0]'
                  }`}
                >
                  {item.formattedNumber}
                </div>

                {/* Name & Note */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm truncate ${
                        isCurrent ? 'text-[#15803D] font-bold' : 'text-[#17221B] font-semibold'
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* YOU Badge */}
                    {isCurrent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#15803D] text-white">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] truncate mt-0.5">
                    {item.waitTime}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                {getStatusBadge(item.status, isCurrent)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom helper footnote */}
      <div className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Showing neighboring tokens (#04 – #09)</span>
        <span className="text-[#15803D] font-semibold">Estimated ~4 min / patient</span>
      </div>
    </div>
  );
};
