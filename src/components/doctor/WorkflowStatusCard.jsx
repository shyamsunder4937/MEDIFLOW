import React from 'react';
import { Clock, Activity, ListOrdered, Building2 } from 'lucide-react';
import { StatusBadge } from './QueuePatientRow';
import { PatientWorkflow } from './PatientWorkflow';

export const WorkflowStatusCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#0F766E]" />
            Current Workflow Status
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time patient progression in hospital coordination
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] font-medium">Current Stage:</span>
          <span className="text-xs font-bold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-lg">
            {patient.currentStage || 'Waiting for Consultation'}
          </span>
          <StatusBadge status={patient.status} />
        </div>
      </div>

      {/* Visual Stepper */}
      <div className="py-2 overflow-x-auto">
        <PatientWorkflow
          status={patient.status}
          currentStage={patient.currentStage}
        />
      </div>

      {/* Workflow Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase block">
            Queue Number
          </span>
          <span className="font-extrabold text-[#0F172A] text-sm mt-0.5 block">
            {patient.queueNo || `#${patient.queueNumber || patient.id}`}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase block">
            Appointment
          </span>
          <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">
            {patient.appointmentTime}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase block">
            Waiting Time
          </span>
          <span className="font-bold text-[#D97706] text-sm mt-0.5 block">
            {patient.waitingTime || patient.waitDuration || '18 min'}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase block">
            Department
          </span>
          <span className="font-bold text-[#0F172A] text-sm mt-0.5 block truncate">
            {patient.department || 'General Medicine'}
          </span>
        </div>
      </div>
    </div>
  );
};
