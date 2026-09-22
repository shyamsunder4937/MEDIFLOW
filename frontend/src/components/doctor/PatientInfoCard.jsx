import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ChevronRight } from 'lucide-react';
import { StatusBadge } from './QueuePatientRow';

export const PatientInfoCard = ({ patient }) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'PT';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
        {/* Patient Identity & Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] font-bold text-xl sm:text-2xl shadow-xs flex-shrink-0">
            {getInitials(patient.name || patient.patientName)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#17221B] tracking-tight">
                {patient.name || patient.patientName}
              </h1>
              <StatusBadge status={patient.status} />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
              <span className="font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2 py-0.5 rounded-md">
                {patient.patientId || `PAT-10${patient.id}`}
              </span>
              <span>•</span>
              <span>{patient.age} yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span className="text-[#17221B] font-medium">{patient.department}</span>
            </div>
          </div>
        </div>

        {/* Start Consultation CTA Button */}
        <div className="w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate(`/doctor/consultation/${patient.id}`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] cursor-pointer"
          >
            <Stethoscope className="h-4 w-4" />
            <span>Start Consultation</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Patient Key Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Queue Number
          </span>
          <span className="text-sm font-bold text-[#15803D] mt-0.5 block">
            {patient.queueNo || `#${patient.queueNumber || patient.id}`}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Appointment Time
          </span>
          <span className="text-sm font-bold text-[#17221B] mt-0.5 block">
            {patient.appointmentTime}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Arrival Time
          </span>
          <span className="text-sm font-bold text-[#17221B] mt-0.5 block">
            {patient.arrivalTime || '—'}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
            Visit Type
          </span>
          <span className="text-sm font-bold text-[#17221B] mt-0.5 block">
            {patient.visitType || 'Follow-up'}
          </span>
        </div>
      </div>
    </div>
  );
};
