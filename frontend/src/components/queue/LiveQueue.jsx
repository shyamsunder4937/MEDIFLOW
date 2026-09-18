import React from 'react';
import { Users, User, CheckCircle2, Clock, PlayCircle, Radio } from 'lucide-react';

export const LiveQueue = ({ liveQueue = [] }) => {
  const getStatusBadge = (status, isCurrent) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'In Consultation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            In Consultation
          </span>
        );
      case 'Waiting':
      default:
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isCurrent
                ? 'bg-amber-100/80 text-amber-800 border border-amber-300'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            Waiting
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Live Queue
            </h3>
            <p className="text-xs text-[#64748B]">
              Patients around your position in General Medicine
            </p>
          </div>
        </div>

        {/* Real-time sync badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#64748B] bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 rounded-xl font-medium">
          <Radio className="h-3.5 w-3.5 text-[#0F766E] animate-pulse" />
          <span>Live OPD Feed</span>
        </div>
      </div>

      {/* Queue List / Table */}
      <div className="mt-4 divide-y divide-[#E2E8F0]/70">
        {liveQueue.map((item) => {
          const isCurrent = item.isCurrent;

          return (
            <div
              key={item.formattedNumber}
              className={`flex items-center justify-between py-3.5 px-3 sm:px-4 rounded-xl transition-all duration-150 ${
                isCurrent
                  ? 'bg-[#CCFBF1]/40 border-2 border-[#0F766E] shadow-xs my-1.5'
                  : 'hover:bg-slate-50/80'
              }`}
            >
              {/* Token Number & Patient Info */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Number Badge */}
                <div
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl font-black text-sm sm:text-base flex-shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-[#0F766E] text-white shadow-sm'
                      : item.status === 'Completed'
                      ? 'bg-slate-100 text-[#64748B]'
                      : item.status === 'In Consultation'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  {item.formattedNumber}
                </div>

                {/* Name & Note */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-[#0F766E] font-bold' : 'text-[#0F172A]'
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* YOU Badge */}
                    {isCurrent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#0F766E] text-white">
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
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <span>Showing neighboring tokens (#04 - #09)</span>
        <span className="text-[#0F766E] font-medium">Estimated 4 min / patient</span>
      </div>
    </div>
  );
};
