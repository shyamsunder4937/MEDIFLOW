import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, DoorOpen, ChevronRight } from 'lucide-react';
import { staffCurrentlyServing } from '../../../data/staffMockData';

export const CurrentlyServingCard = ({ serving = staffCurrentlyServing }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-teal-900 via-[#0F766E] to-[#115E59] rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute right-0 top-0 -mt-8 -mr-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left Side: Live Badge + Token + Patient details */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-white/20 text-[#CCFBF1] backdrop-blur-xs border border-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              CURRENTLY SERVING
            </span>
            <span className="text-xs text-teal-100 font-medium">
              Active Consultation Session
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <span className="font-mono font-black text-2xl sm:text-3xl text-white bg-white/15 px-3 py-1 rounded-xl border border-white/25 shadow-inner">
              {serving.token}
            </span>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{serving.patient}</span>
                <span className="text-xs font-normal text-teal-200">
                  ({serving.age}y • {serving.gender})
                </span>
              </div>
              <div className="text-xs text-teal-100 font-mono">
                ID: {serving.patientId} • Started at {serving.startTime}
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right info: Doctor, Department, Room, and Action */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:border-l md:border-teal-500/40 md:pl-5">
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-teal-100 font-medium">
              <Stethoscope className="h-3.5 w-3.5 text-[#CCFBF1]" />
              <span>{serving.doctor} ({serving.department})</span>
            </div>
            <div className="flex items-center gap-1.5 text-teal-200">
              <DoorOpen className="h-3.5 w-3.5 text-[#CCFBF1]" />
              <span className="font-bold text-white">{serving.room}</span>
              <span>•</span>
              <span className="text-[11px] text-emerald-300 font-semibold">{serving.status}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/staff/patients')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#0F766E] hover:bg-[#CCFBF1] text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
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
