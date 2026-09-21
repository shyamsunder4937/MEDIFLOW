import React from 'react';
import { User, FileText, Building2, Calendar, Clock, Stethoscope, Activity, MapPin } from 'lucide-react';

export const VisitDetailsCard = ({ visit }) => {
  const details = [
    { label: 'Patient', value: visit.patientName, icon: User },
    { label: 'Patient ID', value: visit.patientId, icon: FileText },
    { label: 'Department', value: visit.department, icon: Building2 },
    { label: 'Doctor', value: visit.doctor, icon: Stethoscope },
    { label: 'Appointment', value: visit.appointmentDate, icon: Calendar },
    { label: 'Time', value: visit.appointmentTime, icon: Clock },
    { label: 'Hospital', value: visit.hospital, icon: MapPin },
    { label: 'Visit Type', value: visit.visitType, icon: Activity },
    { label: 'Status', value: visit.status, isStatus: true },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#17221B] tracking-tight">
            Visit Details
          </h3>
          <p className="text-xs text-[#64748B]">
            Official outpatient encounter record
          </p>
        </div>

        <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-2.5 py-0.5 rounded-full">
          Encounter Active
        </span>
      </div>

      {/* ── 2-Column Information Grid ── */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-slate-50 p-2.5 rounded-lg border border-[#E2E8F0] flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase mb-0.5">
                {Icon && <Icon className="h-3 w-3 text-[#15803D]" />}
                <span>{item.label}</span>
              </div>

              {item.isStatus ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
                  <span className="text-xs font-bold text-[#15803D] uppercase tracking-wide">
                    {item.value}
                  </span>
                </div>
              ) : (
                <div className="text-xs font-bold text-[#17221B] truncate mt-0.5">
                  {item.value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
