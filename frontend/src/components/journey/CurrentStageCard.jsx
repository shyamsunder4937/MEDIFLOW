import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowRight, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export const CurrentStageCard = ({ journeyData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border-2 border-[#0F766E] shadow-sm p-6 relative overflow-hidden">
      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F766E]" />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Current Stage Info */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
                Current Stage • Stage 3
              </span>
              <span className="text-xs text-[#64748B] flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Updated {journeyData.lastUpdated}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              {journeyData.currentStage || 'Waiting for Consultation'}
            </h3>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md">
              {journeyData.doctor} will call you when it is your turn. Please stay near OPD Block B waiting lounge.
            </p>
          </div>
        </div>

        {/* Right: Live Queue Badge */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Your Token</span>
            <div className="text-3xl font-black text-[#0F766E] tracking-tight">
              {journeyData.formattedQueueNumber}
            </div>
          </div>

          <button
            onClick={() => navigate('/patient/queue')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs group"
          >
            <span>View Live Queue</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
        
        {/* Token # */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-[#64748B]">Queue Token</div>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">
              {journeyData.formattedQueueNumber}
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
            General Med
          </span>
        </div>

        {/* Patients Ahead */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-[#64748B]">Patients Ahead</div>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">
              {journeyData.patientsAhead}
            </div>
          </div>
          <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </div>

        {/* Estimated Wait */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-[#64748B]">Estimated Wait</div>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">
              {journeyData.estimatedWait} <span className="text-xs font-medium text-[#64748B]">min</span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="h-4 w-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
