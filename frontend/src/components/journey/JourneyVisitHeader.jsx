import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, Users, ArrowRight, Stethoscope, Building2 } from 'lucide-react';

export const JourneyVisitHeader = ({ visit }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Visit Identity & Details */}
        <div className="space-y-3">
          {/* Tag & Live Status Indicator */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Current Visit
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{visit.status || 'IN PROGRESS'}</span>
            </div>
            <span className="text-xs text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-md font-medium">
              OPD Token {visit.formattedQueueNumber}
            </span>
          </div>

          {/* Department & Doctor */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              {visit.department}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#0F766E] font-semibold mt-1">
              <Stethoscope className="h-4 w-4 flex-shrink-0" />
              <span>{visit.doctor}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-[#64748B]">{visit.room}</span>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex items-center gap-4 text-xs text-[#64748B] pt-1">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>Today, {visit.appointmentTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#0F766E]" />
              <span>{visit.hospital}</span>
            </div>
          </div>
        </div>

        {/* Right: Queue Summary & Action */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
          {/* Queue Snapshot Chips */}
          <div className="flex items-center gap-3">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-xl text-center">
              <div className="text-[10px] font-bold text-[#64748B] uppercase">Queue</div>
              <div className="text-lg font-black text-[#0F766E] leading-tight">
                {visit.formattedQueueNumber}
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-xl text-left">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0F172A]">
                <Users className="h-3 w-3 text-[#0F766E]" />
                <span>{visit.patientsAhead} ahead</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
                <Clock className="h-3 w-3 text-amber-600" />
                <span>~{visit.estimatedWait} min wait</span>
              </div>
            </div>
          </div>

          {/* View Queue Button */}
          <button
            onClick={() => navigate('/patient/queue')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all shadow-xs group"
          >
            <span>View Queue</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
