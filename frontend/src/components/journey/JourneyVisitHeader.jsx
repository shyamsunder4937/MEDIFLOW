import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, Users, ArrowRight, Stethoscope, Building2, MapPin } from 'lucide-react';

export const JourneyVisitHeader = ({ visit }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Visit Identity & Details */}
        <div className="space-y-2.5 min-w-0">
          {/* Tag & Live Status Indicator */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Current Visit
            </span>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-[#15803D]/25 text-[#15803D] px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
              </span>
              <span>{visit.status || 'IN PROGRESS'}</span>
            </div>
            <span className="text-xs text-[#17221B] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Token {visit.formattedQueueNumber}
            </span>
          </div>

          {/* Department & Doctor */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221B] tracking-tight">
              {visit.department}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#15803D] font-semibold mt-0.5 flex-wrap">
              <Stethoscope className="h-4 w-4 flex-shrink-0" />
              <span>{visit.doctor}</span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-xs font-medium text-[#64748B]">{visit.room}</span>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex items-center gap-4 text-xs text-[#64748B] pt-0.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Today, {visit.appointmentTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#64748B]" />
              <span>{visit.hospital}</span>
            </div>
          </div>
        </div>

        {/* Right: Queue Summary & Action */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3.5 pt-3.5 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
          {/* Queue Snapshot Chips */}
          <div className="flex items-center gap-2.5">
            <div className="bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-center">
              <div className="text-[10px] font-bold text-[#64748B] uppercase">Token</div>
              <div className="text-base font-black text-[#15803D] leading-tight">
                {visit.formattedQueueNumber}
              </div>
            </div>

            <div className="bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-left">
              <div className="flex items-center gap-1 text-xs font-semibold text-[#17221B]">
                <Users className="h-3 w-3 text-[#15803D]" />
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <span>View Queue Status</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
