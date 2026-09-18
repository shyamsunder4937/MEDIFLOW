import React from 'react';
import { User, MapPin, Building2, CheckCircle, Stethoscope, Clock } from 'lucide-react';

export const DoctorInfoCard = ({ doctor }) => {
  const {
    name,
    department,
    room,
    roomFull,
    status,
    specialization,
    avatar,
    experience,
    currentlyServing,
  } = doctor;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
      <div>
        {/* Header Label */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0F766E]">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
                Assigned Doctor
              </span>
              <span className="text-sm font-bold text-[#0F172A]">
                Consultation Specialist
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {status}
          </div>
        </div>

        {/* Doctor Info Body */}
        <div className="mt-5 flex items-start gap-4">
          {/* Avatar with fallback */}
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-16 w-16 rounded-2xl object-cover border-2 border-[#CCFBF1] shadow-xs"
              />
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-teal-100 flex items-center justify-center text-[#0F766E] border-2 border-[#CCFBF1]">
                <User className="h-8 w-8" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#E2E8F0]">
              <CheckCircle className="h-3.5 w-3.5 text-[#16A34A] fill-white" />
            </div>
          </div>

          {/* Name & Specialization */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight truncate">
              {name}
            </h3>
            <p className="text-xs font-medium text-[#0F766E] mt-0.5">
              {department}
            </p>
            <p className="text-[11px] text-[#64748B] mt-1">
              {specialization} • {experience}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {/* Department */}
          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-medium">
              <Building2 className="h-3.5 w-3.5 text-[#64748B]" />
              Department
            </div>
            <div className="text-xs font-bold text-[#0F172A] truncate">
              {department}
            </div>
          </div>

          {/* Room */}
          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
              Room
            </div>
            <div className="text-xs font-bold text-[#0F766E]">
              Room {room}
            </div>
          </div>
        </div>

        {/* Room description & Currently Serving */}
        <div className="mt-3 bg-slate-50 border border-dashed border-[#CBD5E1] rounded-xl p-3 text-xs space-y-1">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-[11px] font-medium">Location:</span>
            <span className="font-semibold text-[#0F172A]">{roomFull || `Room ${room}`}</span>
          </div>
          {currentlyServing && (
            <div className="flex items-center justify-between text-[#64748B] pt-1 border-t border-slate-200/60">
              <span className="text-[11px] font-medium flex items-center gap-1">
                <Clock className="h-3 w-3 text-blue-600" />
                Current in room:
              </span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                {currentlyServing}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
