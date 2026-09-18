import React from 'react';
import { History, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ActivityTimelineCard = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
            <History className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Recent Activity
            </h3>
            <p className="text-xs text-[#64748B]">
              Real-time audit log of your hospital visit
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full">
          Today
        </span>
      </div>

      {/* Vertical Timeline */}
      <div className="mt-5 space-y-4 relative pl-2">
        {activities.map((item, idx) => {
          const isLatest = idx === activities.length - 1;

          return (
            <div key={item.id} className="relative flex items-start gap-3.5 group">
              {/* Connecting line */}
              {idx < activities.length - 1 && (
                <div className="absolute top-5 left-3.5 w-0.5 h-full -ml-[1px] bg-[#E2E8F0] group-hover:bg-[#CBD5E1] transition-colors" />
              )}

              {/* Timeline Dot */}
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                  isLatest
                    ? 'bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]'
                    : 'bg-slate-100 text-[#64748B] border border-[#CBD5E1]'
                }`}
              >
                {isLatest ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-[#64748B]" />
                )}
              </div>

              {/* Text content */}
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isLatest ? 'text-[#0F766E]' : 'text-[#0F172A]'
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
