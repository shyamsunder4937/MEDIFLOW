import React from 'react';
import { Bot, RotateCcw } from 'lucide-react';

export const AiAgentEmptyState = ({ onClearFilters }) => {
  return (
    <div className="py-12 px-4 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-700 mb-3 border border-purple-200">
        <Bot className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-[#0F172A] mb-1">
        No simulated activity found
      </h3>
      <p className="text-xs text-[#64748B] max-w-sm mx-auto mb-4">
        Try modifying your search query or resetting the module, priority, or status filters.
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default AiAgentEmptyState;
