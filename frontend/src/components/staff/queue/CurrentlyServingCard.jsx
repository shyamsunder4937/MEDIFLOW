import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, DoorOpen, ChevronRight, Activity } from 'lucide-react';
import { staffCurrentlyServing } from '../../../data/staffMockData';

export const CurrentlyServingCard = ({ serving = staffCurrentlyServing }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Token + Patient Identity + Status */}
        <div className="space-y-3">
          {/* Header Status Tag */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
              </span>
              CURRENTLY SERVING
            </span>
            <span className="text-xs text-[#64748B]">
              Active Consultation Session • Started at {serving.startTime}
            </span>
          </div>

          {/* Token & Patient Name */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-mono font-extrabold text-2xl sm:text-3xl text-[#15803D] bg-[#F0FDF4] px-3.5 py-1 rounded-xl border border-[#DCFCE7]">
              {serving.token}
            </span>
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#17221B] tracking-tight flex items-center gap-2">
                <span>{serving.patient}</span>
                <span className="text-xs font-normal text-[#64748B]">
                  ({serving.age}y • {serving.gender})
                </span>
              </div>
              <div className="text-xs text-[#64748B] font-mono">
                ID: {serving.patientId} • {serving.vitalStatus || 'Vitals checked'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Doctor, Department, Room and Action Button */}
        <div className="flex flex-wrap items-center gap-4 lg:border-l lg:border-[#E2E8F0] lg:pl-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <div className="space-y-1 text-xs min-w-[200px]">
            <div className="flex items-center gap-1.5 font-semibold text-[#17221B]">
              <Stethoscope className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
              <span>{serving.doctor}</span>
              <span className="text-[#64748B] font-normal">({serving.department})</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748B]">
              <span className="inline-flex items-center gap-1 font-semibold text-[#17221B] bg-slate-50 px-2 py-0.5 rounded border border-[#E2E8F0]">
                <DoorOpen className="h-3 w-3 text-[#64748B]" />
                {serving.room}
              </span>
              <span>•</span>
              <span className="text-[11px] text-[#15803D] font-semibold flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {serving.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/staff/patients')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <span>View Patient</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyServingCard;

