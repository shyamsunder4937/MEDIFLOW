import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowRight, RefreshCw } from 'lucide-react';

export const CurrentStageCard = ({ journeyData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Current Stage Info */}
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2.5 py-0.5 rounded-full">
                Active Stage · Stage 3 of 8
              </span>
              <span className="text-xs text-[#64748B] flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Updated {journeyData.lastUpdated}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#17221B] tracking-tight">
              {journeyData.currentStage || 'Waiting for Consultation'}
            </h3>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md">
              {journeyData.doctor} will call you when it is your turn. Please remain seated in the OPD Block B waiting lounge.
            </p>
          </div>
        </div>

        {/* Right: Live Queue Action */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Your Token</span>
            <div className="text-2xl sm:text-3xl font-black text-[#15803D] tracking-tight">
              {journeyData.formattedQueueNumber}
            </div>
          </div>

          <button
            onClick={() => navigate('/patient/queue')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <span>View Live Queue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#E2E8F0]">
        
        {/* Token # */}
        <div className="bg-slate-50 border border-[#E2E8F0] p-3 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase">Queue Token</div>
            <div className="text-lg font-black text-[#17221B] mt-0.5">
              {journeyData.formattedQueueNumber}
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2 py-0.5 rounded">
            General Med
          </span>
        </div>

        {/* Patients Ahead */}
        <div className="bg-slate-50 border border-[#E2E8F0] p-3 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase">Patients Ahead</div>
            <div className="text-lg font-black text-[#17221B] mt-0.5">
              {journeyData.patientsAhead}
            </div>
          </div>
          <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </div>

        {/* Estimated Wait */}
        <div className="bg-slate-50 border border-[#E2E8F0] p-3 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#64748B] uppercase">Estimated Wait</div>
            <div className="text-lg font-black text-[#17221B] mt-0.5">
              {journeyData.estimatedWait} <span className="text-xs font-semibold text-[#64748B]">min</span>
            </div>
          </div>
          <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Clock className="h-4 w-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
