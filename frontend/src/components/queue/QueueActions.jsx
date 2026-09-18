import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, PhoneCall, LogOut, Sparkles } from 'lucide-react';

export const QueueActions = ({ onOpenReceptionModal, onOpenLeaveModal }) => {
  const navigate = useNavigate();

  const handleNavigateJourney = () => {
    navigate('/patient/journey');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
        <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Quick Actions
          </h3>
          <span className="text-sm font-bold text-[#0F172A]">
            Patient Services
          </span>
        </div>
      </div>

      {/* Button Stack */}
      <div className="mt-4 space-y-2.5">
        
        {/* Button 1: View My Journey */}
        <button
          onClick={handleNavigateJourney}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Compass className="h-4 w-4 text-[#CCFBF1] group-hover:rotate-45 transition-transform duration-300" />
            <span>View My Journey</span>
          </div>
          <span className="text-[11px] text-[#CCFBF1] font-medium group-hover:translate-x-0.5 transition-transform">
            Timeline →
          </span>
        </button>

        {/* Button 2: Contact Reception */}
        <button
          onClick={onOpenReceptionModal}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] border border-[#E2E8F0] text-xs font-semibold transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <PhoneCall className="h-4 w-4 text-[#0F766E]" />
            <span>Contact Reception</span>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Desk B-2
          </span>
        </button>

        {/* Button 3: Leave Queue */}
        <button
          onClick={onOpenLeaveModal}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-red-50/70 hover:bg-red-100/70 text-[#DC2626] border border-red-200/80 text-xs font-semibold transition-all"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="h-4 w-4 text-[#DC2626]" />
            <span>Leave Queue</span>
          </div>
          <span className="text-[10px] text-red-600 bg-red-100/60 px-2 py-0.5 rounded">
            Forfeit Spot
          </span>
        </button>

      </div>
    </div>
  );
};
