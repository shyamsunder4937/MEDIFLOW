import React from 'react';
import { Calendar, Building2, Clock, ListOrdered, Activity, UserCheck, AlertCircle, HeartPulse } from 'lucide-react';

export const VisitInformation = ({ patient }) => {
  const fields = [
    {
      label: 'Appointment',
      value: patient.appointmentTime,
      icon: Calendar,
    },
    {
      label: 'Department',
      value: patient.department || 'General Medicine',
      icon: Building2,
    },
    {
      label: 'Queue Number',
      value: patient.queueNo || `#${patient.queueNumber || patient.id}`,
      icon: ListOrdered,
      highlight: true,
    },
    {
      label: 'Arrival Time',
      value: patient.arrivalTime || '—',
      icon: Clock,
    },
    {
      label: 'Current Stage',
      value: patient.currentStage || 'Waiting for Consultation',
      icon: Activity,
    },
    {
      label: 'Visit Type',
      value: patient.visitType || 'Follow-up',
      icon: UserCheck,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#15803D]" />
          Visit Information
        </h2>
        <span className="text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-0.5 rounded-full">
          Today's Encounter
        </span>
      </div>

      {/* Chief Complaint / Visit Reason */}
      {patient.reason && (
        <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#15803D] tracking-wider flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            Reason for Visit / Chief Complaint
          </span>
          <p className="text-xs font-semibold text-[#17221B] leading-relaxed">
            {patient.reason}
          </p>
        </div>
      )}

      {/* Structured Visit Attributes */}
      <div className="divide-y divide-[#F1F5F9] text-xs">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="py-2.5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 text-[#64748B]">
                <Icon className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span className="font-medium">{field.label}</span>
              </div>
              <span
                className={`font-semibold ${
                  field.highlight ? 'text-[#15803D] font-bold' : 'text-[#17221B]'
                }`}
              >
                {field.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Recorded Vitals (if available) */}
      {patient.vitals && (
        <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider flex items-center gap-1.5">
            <HeartPulse className="h-3.5 w-3.5 text-[#15803D]" />
            Recorded Triage Vitals
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-[#64748B] block">Blood Pressure</span>
              <span className="text-xs font-bold text-[#17221B]">{patient.vitals.bp || '—'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-[#64748B] block">Pulse</span>
              <span className="text-xs font-bold text-[#17221B]">{patient.vitals.pulse || '—'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-[#64748B] block">Temperature</span>
              <span className="text-xs font-bold text-[#17221B]">{patient.vitals.temp || '—'}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] text-[#64748B] block">SpO2</span>
              <span className="text-xs font-bold text-[#17221B]">{patient.vitals.spo2 || '—'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
