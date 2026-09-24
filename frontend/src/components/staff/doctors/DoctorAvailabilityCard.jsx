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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs hover:border-[#15803D]/40 transition-all duration-150 flex flex-col justify-between group space-y-3.5">
      {/* ── Top Row: Avatar + Name + Specialty + Status ── */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] font-extrabold text-xs flex-shrink-0 border border-[#15803D]/20 group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <div className="min-w-0">
              <h3
                onClick={() => navigate(`/staff/doctors/${doctor.id}`)}
                className="font-bold text-sm sm:text-base text-[#17221B] group-hover:text-[#15803D] transition-colors cursor-pointer truncate"
              >
                {doctor.name}
              </h3>
              <div className="text-[11px] text-[#15803D] font-semibold flex items-center gap-1">
                <Building2 className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{doctor.department}</span>
              </div>
            </div>
          </div>

          <DoctorStatusBadge status={doctor.status} />
        </div>

        {/* Specialization & Qualifications */}
        <div className="text-xs text-[#64748B] space-y-0.5">
          <div className="font-medium text-[#17221B] truncate">
            {doctor.specialization}
          </div>
          <div className="text-[11px] text-[#94A3B8] font-mono">
            {doctor.qualifications || 'MBBS, MD'}
          </div>
        </div>

        {/* Room & Floor */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569]">
          <div className="flex items-center gap-1.5 font-bold text-[#17221B]">
            <DoorOpen className="h-3.5 w-3.5 text-[#15803D]" />
            <span>{doctor.room}</span>
          </div>
          <span className="text-[11px] text-[#64748B]">{doctor.floor || 'OPD Wing B'}</span>
        </div>

        {/* ── Metrics Grid: Current Patient, Waiting Queue, Appointments ── */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Current Patient */}
          <div className="col-span-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
              <User className="h-3 w-3 text-[#15803D]" />
              <span>Current Patient:</span>
            </div>
            <div className="font-bold text-xs text-[#17221B] truncate">
              {doctor.currentPatient || (
                <span className="text-[#94A3B8] font-normal italic">None (Waiting for intake)</span>
              )}
            </div>
          </div>

          {/* Waiting Queue */}
          <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-[11px] text-[#64748B] font-medium">Waiting Queue</div>
            <div className="text-sm font-extrabold text-amber-800 mt-0.5">
              {doctor.waitingPatients} <span className="text-[10px] font-normal text-[#64748B]">patients</span>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-[11px] text-[#64748B] font-medium">Today's Appts</div>
            <div className="text-sm font-extrabold text-[#15803D] mt-0.5">
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
      <div className="pt-2.5 border-t border-slate-100 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* View Queue */}
          <button
            type="button"
            onClick={() => navigate('/staff/queue')}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-[#15803D]/30 text-[#15803D] bg-white hover:bg-[#F0FDF4] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            title="Open OPD patient queue"
          >
            <ListOrdered className="h-3 w-3" />
            <span>View Queue</span>
          </button>

          {/* View Schedule */}
          <button
            type="button"
            onClick={() => navigate('/staff/appointments')}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-[#E2E8F0] text-[#475569] bg-white hover:bg-slate-50 hover:text-[#17221B] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            title="Open doctor appointment schedule"
          >
            <CalendarDays className="h-3 w-3" />
            <span>Schedule</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Update Status */}
          <button
            type="button"
            onClick={() => onOpenUpdateStatus(doctor)}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-xs font-semibold border border-[#15803D]/20 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Update Status</span>
          </button>

          {/* View Details */}
          <button
            type="button"
            onClick={() => navigate(`/staff/doctors/${doctor.id}`)}
            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#F8FAFC] hover:bg-slate-100 text-[#17221B] text-xs font-semibold border border-[#E2E8F0] transition-colors cursor-pointer"
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
