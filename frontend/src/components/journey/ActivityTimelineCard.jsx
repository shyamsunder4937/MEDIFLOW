import React from 'react';
import { History, Clock, ArrowUpRight } from 'lucide-react';

export const ActivityTimelineCard = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
            <History className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17221B] tracking-tight">
              Recent Activity
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time audit log of your hospital visit
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#64748B] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
          Today
        </span>
      </div>

      {/* ── Vertical Timeline ── */}
      <div className="mt-4 space-y-3.5 relative pl-2">
        {activities.map((item, idx) => {
          const isLatest = idx === activities.length - 1;

          return (
            <div key={item.id} className="relative flex items-start gap-3 group">
              {/* Connecting line */}
              {idx < activities.length - 1 && (
                <div className="absolute top-5 left-3 w-0.5 h-full -ml-[1px] bg-[#E2E8F0]" />
              )}

              {/* Timeline Dot */}
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                  isLatest
                    ? 'bg-[#15803D] text-white ring-3 ring-[#F0FDF4]'
                    : 'bg-slate-100 text-[#64748B] border border-slate-300'
                }`}
              >
                {isLatest ? (
                  <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#64748B]" />
                )}
              </div>

              {/* Text content */}
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isLatest ? 'text-[#15803D]' : 'text-[#17221B]'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#64748B] flex-shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#94A3B8]" />
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

