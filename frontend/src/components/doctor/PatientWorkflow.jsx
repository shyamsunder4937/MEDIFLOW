import React from 'react';
import {
  Calendar,
  ClipboardCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  CheckCircle2,
} from 'lucide-react';

export const PatientWorkflow = ({ status = 'Waiting', currentStage = 'Waiting for Consultation' }) => {
  const steps = [
    { id: 'appointment', label: 'Appointment', icon: Calendar },
    { id: 'registration', label: 'Registration', icon: ClipboardCheck },
    { id: 'consultation', label: 'Doctor Consultation', icon: Stethoscope },
    { id: 'lab', label: 'Lab', icon: FlaskConical },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  ];

  // Determine active step index:
  // Waiting or In Consultation -> Consultation (index 2)
  // Completed -> Completed (index 5)
  const activeIndex = status === 'Completed' ? 5 : 2;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Continuous background progress line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0 hidden sm:block" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const isUpcoming = idx > activeIndex;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center flex-1 text-center group"
            >
              {/* Icon Circle */}
              <div
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border-2 transition-all ${
                  isDone
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#15803D] border-[#15803D] text-white ring-4 ring-[#DCFCE7] shadow-xs'
                    : 'bg-white border-slate-200 text-[#94A3B8]'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] font-semibold mt-1.5 leading-tight px-1 ${
                  isCurrent
                    ? 'text-[#15803D] font-bold'
                    : isDone
                    ? 'text-emerald-700'
                    : 'text-[#94A3B8]'
                }`}
              >
                {step.label}
              </span>

              {isCurrent && (
                <span className="hidden sm:inline-block text-[9px] font-bold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-1.5 py-0.2 rounded mt-0.5">
                  Active
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
