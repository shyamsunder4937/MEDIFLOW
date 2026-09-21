import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, PhoneCall, LogOut, Sparkles } from 'lucide-react';

export const QueueActions = ({ onOpenReceptionModal, onOpenLeaveModal }) => {
  const navigate = useNavigate();

  const handleNavigateJourney = () => {
    navigate('/patient/journey');
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
        <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#17221B] uppercase tracking-wider">
            Quick Actions
          </h3>
        </div>
      </div>

      {/* ── Button Stack ── */}
      <div className="mt-3.5 space-y-2">
        {/* Button 1: View My Journey (Primary Action) */}
        <button
          onClick={handleNavigateJourney}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors shadow-2xs group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            <span>View My Journey</span>
          </div>
          <span className="text-[11px] text-emerald-100 font-normal group-hover:translate-x-0.5 transition-transform">
            Timeline →
          </span>
        </button>

        {/* Button 2: Contact Reception (Secondary Action) */}
        <button
          onClick={onOpenReceptionModal}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 text-[#17221B] border border-[#E2E8F0] text-xs font-semibold transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
        >
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-[#15803D]" />
            <span>Contact Reception</span>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Desk B-2
          </span>
        </button>

        {/* Button 3: Leave Queue (Danger Action) */}
        <button
          onClick={onOpenLeaveModal}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-[#E2E8F0] hover:border-rose-200 text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <div className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Leave Queue</span>
          </div>
          <span className="text-[10px] text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            Forfeit Spot
          </span>
        </button>
      </div>
    </div>
  );
};
