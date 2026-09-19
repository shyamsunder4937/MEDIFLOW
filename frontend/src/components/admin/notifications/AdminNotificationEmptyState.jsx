import React from 'react';
import { BellOff, RotateCcw } from 'lucide-react';

export const AdminNotificationEmptyState = ({ onClearFilters }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center">
      <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
        <BellOff className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-800">
        No notifications found
      </h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">
        Try changing your search keywords or resetting your category, priority, and read status filters.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-300 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-slate-500" />
          Clear Filters
        </button>
      )}
    </div>
  );
};
