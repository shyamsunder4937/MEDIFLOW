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
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
      <div>
        {/* ── Header Label ── */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#17221B] uppercase tracking-wider block">
                Assigned Doctor
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-[#15803D]/25 text-[#15803D] px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
            </span>
            <span>{status}</span>
          </div>
        </div>

        {/* ── Doctor Info Body ── */}
        <div className="mt-4 flex items-start gap-3.5">
          {/* Avatar with fallback */}
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-14 w-14 rounded-xl object-cover border border-[#E2E8F0]"
              />
            ) : (
              <div className="h-14 w-14 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#15803D] border border-[#15803D]/20 font-bold">
                <User className="h-7 w-7" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-4.5 w-4.5 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#E2E8F0]">
              <CheckCircle className="h-3.5 w-3.5 text-[#15803D] fill-white" />
            </div>
          </div>

          {/* Name & Specialization */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#17221B] tracking-tight truncate">
              {name}
            </h3>
            <p className="text-xs font-semibold text-[#15803D] mt-0.5">
              {department}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              {specialization} · {experience}
            </p>
          </div>
        </div>

        {/* ── Details Grid ── */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {/* Department */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5 font-bold uppercase">
              <Building2 className="h-3 w-3 text-[#64748B]" />
              Department
            </div>
            <div className="text-xs font-bold text-[#17221B] truncate">
              {department}
            </div>
          </div>

          {/* Room */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] mb-0.5 font-bold uppercase">
              <MapPin className="h-3 w-3 text-[#15803D]" />
              Room
            </div>
            <div className="text-xs font-bold text-[#15803D]">
              Room {room}
            </div>
          </div>
        </div>

        {/* ── Room description & Currently Serving ── */}
        <div className="mt-3 bg-slate-50/70 border border-[#E2E8F0] rounded-lg p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-medium">Location:</span>
            <span className="font-semibold text-[#17221B]">{roomFull || `Room ${room}`}</span>
          </div>
          {currentlyServing && (
            <div className="flex items-center justify-between text-[#64748B] pt-1.5 border-t border-[#E2E8F0]">
              <span className="text-xs font-medium flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#64748B]" />
                In consultation:
              </span>
              <span className="font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2 py-0.5 rounded text-[11px]">
                {currentlyServing}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
