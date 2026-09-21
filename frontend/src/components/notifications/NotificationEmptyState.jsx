import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellOff, ArrowRight } from 'lucide-react';

export const NotificationEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[360px] bg-white rounded-xl border border-[#E2E8F0] p-8 text-center shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] mb-4">
        <BellOff className="h-8 w-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#17221B] mb-1.5">You're all caught up</h3>
      <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mb-6 leading-relaxed">
        There are no new notifications matching your filter at the moment. We'll notify you about appointments, queue
        updates, and diagnostic results.
      </p>
      <button
        onClick={() => navigate('/patient/dashboard')}
        className="flex items-center gap-2 px-4 py-2 bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
      >
        <span>Return to Dashboard</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
