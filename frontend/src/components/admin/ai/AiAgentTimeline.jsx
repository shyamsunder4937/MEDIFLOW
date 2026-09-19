import React from 'react';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { AiAgentModuleBadge } from './AiAgentModuleBadge';
import { AiAgentStatusBadge } from './AiAgentStatusBadge';

export const AiAgentTimeline = ({
  recentLogs,
  onViewDetails,
}) => {
  return (
    <section aria-label="Recent Agent Activity Timeline" className="mb-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
                Recent Agent Activity
              </h3>
              <p className="text-xs text-[#64748B]">
                Chronological stream of automated simulation triggers and events.
              </p>
            </div>
          </div>
          <span className="text-[10px] text-[#64748B] font-medium">
            Live local feed
          </span>
        </div>

        {/* Vertical Timeline List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentLogs.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onViewDetails(item)}
              className="p-3.5 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-[#E2E8F0] hover:border-[#0F766E]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {item.time}
                  </span>
                  <AiAgentStatusBadge status={item.status} />
                </div>

                <div className="font-bold text-xs text-[#0F172A] group-hover:text-[#0F766E] transition-colors line-clamp-1 mb-0.5">
                  {item.action}
                </div>

                <div className="text-[11px] text-[#64748B] truncate mb-2">
                  Patient: <span className="font-semibold text-[#0F172A]">{item.patient}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                <AiAgentModuleBadge module={item.module} />
                <span className="text-[#0F766E] font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Details <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiAgentTimeline;
