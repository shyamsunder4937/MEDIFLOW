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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
            Visit Details
          </h3>
          <p className="text-xs text-[#64748B]">
            Official outpatient encounter record
          </p>
        </div>

        <span className="text-xs font-semibold text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
          Encounter Active
        </span>
      </div>

      {/* 2-Column Information Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] mb-1">
                {Icon && <Icon className="h-3 w-3 text-[#0F766E]" />}
                <span>{item.label}</span>
              </div>

              {item.isStatus ? (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wide">
                    {item.value}
                  </span>
                </div>
              ) : (
                <div className="text-xs font-bold text-[#0F172A] truncate">
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
