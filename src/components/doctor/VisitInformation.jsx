import React from 'react';
import { Calendar, Building2, Clock, ListOrdered, Activity, UserCheck } from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#0F766E]" />
          Visit Information
        </h2>
        <span className="text-[10px] font-semibold text-[#64748B] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
          Today's Encounter
        </span>
      </div>

      <div className="divide-y divide-slate-100 text-xs">
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
                  field.highlight ? 'text-[#0F766E] font-bold' : 'text-[#0F172A]'
                }`}
              >
                {field.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
