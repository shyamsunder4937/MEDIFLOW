import React from 'react';
import { ArrowUpRight, Bell, Sparkles, X } from 'lucide-react';

export const QueueUpdate = ({ recentUpdate, onDismiss }) => {
  if (!recentUpdate) return null;

  return (
    <div className="bg-white rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/50 via-white to-teal-50/30 p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          {/* Accent icon */}
          <div className="h-10 w-10 rounded-xl bg-[#0F766E] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
            <ArrowUpRight className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-[#0F172A] tracking-tight">
                {recentUpdate.title || 'Queue Updated'}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CCFBF1] text-[#0F766E]">
                Position Advanced
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#334155] mt-0.5 font-medium">
              {recentUpdate.message || 'Your position changed from #9 to #7.'}
            </p>
          </div>
        </div>

        {/* Right timestamp & dismiss */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-[#64748B] font-medium whitespace-nowrap bg-white px-2.5 py-1 rounded-lg border border-[#E2E8F0] shadow-2xs">
            {recentUpdate.timeAgo || '2 minutes ago'}
          </span>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-[#94A3B8] hover:text-[#64748B] p-1 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Dismiss update"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
