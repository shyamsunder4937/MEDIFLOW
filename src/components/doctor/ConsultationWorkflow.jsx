import React from 'react';
import {
  Calendar,
  ClipboardCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  CheckCircle2,
  Activity,
} from 'lucide-react';

export const ConsultationWorkflow = ({ isCompleted = false }) => {
  const steps = [
    { id: 'appointment', label: 'Appointment', icon: Calendar, status: 'completed' },
    { id: 'registration', label: 'Registration', icon: ClipboardCheck, status: 'completed' },
    {
      id: 'consultation',
      label: 'Doctor Consultation',
      icon: Stethoscope,
      status: isCompleted ? 'completed' : 'current',
    },
    { id: 'lab', label: 'Lab Tests', icon: FlaskConical, status: isCompleted ? 'current' : 'upcoming' },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill, status: 'upcoming' },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, status: isCompleted ? 'upcoming' : 'upcoming' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#0F766E]" />
          <h2 className="text-sm font-bold text-[#0F172A] tracking-tight">
            Patient Workflow
          </h2>
        </div>
        <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
          {isCompleted ? 'Stage: Completed' : 'Stage: Consultation'}
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-[#CCFBF1]/40 border border-[#0F766E]/30 text-[#0F766E]'
                  : isDone
                  ? 'bg-emerald-50/50 border border-emerald-100 text-emerald-800'
                  : 'bg-slate-50/50 border border-slate-100 text-slate-400'
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-[#0F766E] text-white animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate">
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isDone ? 'Finished' : isCurrent ? 'Active Stage' : 'Pending'}
                </div>
              </div>

              {isCurrent && (
                <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-ping" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultationWorkflow;
