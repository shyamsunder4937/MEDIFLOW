import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export const QueueUpdate = ({ recentUpdate, onDismiss }) => {
  if (!recentUpdate) return null;

  return (
    <div className="bg-[#F0FDF4] rounded-xl border border-[#15803D]/25 p-3.5 sm:p-4 shadow-2xs transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Accent icon */}
          <div className="h-8 w-8 rounded-lg bg-[#15803D] flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
            <ArrowUpRight className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#17221B] uppercase tracking-wider">
                {recentUpdate.title || 'Queue Updated'}
              </span>
              <span className="inline-flex items-center px-2 py-0.2 rounded text-[10px] font-bold bg-white text-[#15803D] border border-[#15803D]/20">
                Position Advanced
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#17221B] mt-0.5 font-medium">
              {recentUpdate.message || 'Your position changed from #9 to #7.'}
            </p>
          </div>
        </div>

        {/* Right timestamp & dismiss */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-[11px] text-[#64748B] font-medium whitespace-nowrap bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
            {recentUpdate.timeAgo || '2 minutes ago'}
          </span>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-[#64748B] hover:text-[#17221B] p-1 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
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
