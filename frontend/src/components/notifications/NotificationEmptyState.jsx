import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellOff, ArrowRight } from 'lucide-react';

export const NotificationEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#94A3B8] mb-5">
        <BellOff className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold text-[#0F172A] mb-2">You're all caught up</h3>
      <p className="text-sm text-[#64748B] max-w-sm mb-6">
        There are no new notifications at the moment. We'll notify you about appointments, queue
        updates, and test results.
      </p>
      <button
        onClick={() => navigate('/patient/dashboard')}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white text-sm font-semibold rounded-xl hover:bg-[#115E59] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
      >
        Go to Dashboard
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
