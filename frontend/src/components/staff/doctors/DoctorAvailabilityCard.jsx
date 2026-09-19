import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorStatusBadge } from './DoctorStatusBadge';
import {
  DoorOpen,
  User,
  Clock,
  ListOrdered,
  CalendarDays,
  RefreshCw,
  Eye,
  Building2,
} from 'lucide-react';

export const DoctorAvailabilityCard = ({ doctor, onOpenUpdateStatus }) => {
  const navigate = useNavigate();

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return 'DR';
    const clean = name.replace(/^Dr\.\s*/i, '').trim();
    const parts = clean.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return clean.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(doctor.name);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md hover:border-[#0F766E]/30 transition-all duration-200 flex flex-col justify-between group space-y-4">
      {/* ── Top Row: Avatar + Name + Specialty + Status ── */}
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-sm flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <div>
              <h3
                onClick={() => navigate(`/staff/doctors/${doctor.id}`)}
                className="font-bold text-sm sm:text-base text-[#0F172A] group-hover:text-[#0F766E] transition-colors cursor-pointer"
              >
                {doctor.name}
              </h3>
              <div className="text-[11px] text-[#0F766E] font-semibold flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{doctor.department}</span>
              </div>
            </div>
          </div>

          <DoctorStatusBadge status={doctor.status} />
        </div>

        {/* Specialization & Qualifications */}
        <div className="text-xs text-[#64748B] space-y-0.5">
          <div className="font-medium text-[#0F172A] truncate">
            {doctor.specialization}
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono">
            {doctor.qualifications || 'MBBS, MD'}
          </div>
        </div>

        {/* Room & Floor */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-[#475569]">
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <DoorOpen className="h-3.5 w-3.5 text-[#0F766E]" />
            <span>{doctor.room}</span>
          </div>
          <span className="text-[11px] text-[#64748B]">{doctor.floor || 'OPD Wing B'}</span>
        </div>

        {/* ── Metrics Grid: Current Patient, Waiting Queue, Appointments ── */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Current Patient */}
          <div className="col-span-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
              <User className="h-3 w-3 text-[#0F766E]" />
              <span>Current Patient:</span>
            </div>
            <div className="font-bold text-xs text-[#0F172A] truncate">
              {doctor.currentPatient || (
                <span className="text-[#94A3B8] font-normal italic">None (Waiting for intake)</span>
              )}
            </div>
          </div>

          {/* Waiting Queue */}
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="text-[11px] text-[#64748B] font-medium">Waiting Queue</div>
            <div className="text-sm font-extrabold text-[#D97706] mt-0.5">
              {doctor.waitingPatients} <span className="text-[10px] font-normal text-[#64748B]">patients</span>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="text-[11px] text-[#64748B] font-medium">Today's Appts</div>
            <div className="text-sm font-extrabold text-[#0F766E] mt-0.5">
              {doctor.appointmentsToday} <span className="text-[10px] font-normal text-[#64748B]">booked</span>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] pt-0.5">
          <Clock className="h-3 w-3 text-[#94A3B8]" />
          <span>Shift: {doctor.workingHours}</span>
        </div>
      </div>

      {/* ── Card Action Buttons ── */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* View Queue */}
          <button
            type="button"
            onClick={() => navigate('/staff/queue')}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl border border-[#0F766E]/30 text-[#0F766E] bg-white hover:bg-[#CCFBF1]/40 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            title="Open OPD patient queue"
          >
            <ListOrdered className="h-3.5 w-3.5" />
            <span>View Queue</span>
          </button>

          {/* View Schedule */}
          <button
            type="button"
            onClick={() => navigate('/staff/appointments')}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl border border-slate-200 text-[#475569] bg-white hover:bg-slate-100 hover:text-[#0F172A] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            title="Open doctor appointment schedule"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Schedule</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Update Status */}
          <button
            type="button"
            onClick={() => onOpenUpdateStatus(doctor)}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] text-xs font-semibold border border-teal-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Update Status</span>
          </button>

          {/* View Details */}
          <button
            type="button"
            onClick={() => navigate(`/staff/doctors/${doctor.id}`)}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0F172A] text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <Eye className="h-3 w-3" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityCard;
