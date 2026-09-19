import React from 'react';
import {
  Activity,
  Clock,
  Stethoscope,
  CheckCircle2,
} from 'lucide-react';

export const WorkflowSummaryCards = ({ counts }) => {
  const cards = [
    {
      id: 'patients_in_workflow',
      label: 'Patients in Workflow',
      value: counts?.patientsInWorkflow ?? '128',
      supporting: 'Active registered visits today',
      icon: Activity,
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#CCFBF1]',
      borderColor: 'border-[#0F766E]/20',
    },
    {
      id: 'waiting_in_queue',
      label: 'Waiting in Queue',
      value: counts?.waitingInQueue ?? '24',
      supporting: 'Across OPD waiting zones',
      icon: Clock,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'in_consultation',
      label: 'In Consultation',
      value: counts?.inConsultation ?? '6',
      supporting: 'Active examinations in rooms',
      icon: Stethoscope,
      color: 'text-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
    {
      id: 'completed_today',
      label: 'Completed Today',
      value: counts?.completedToday ?? '38',
      supporting: 'Discharged & fulfilled visits',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
  ];

  return (
    <section aria-label="Workflow Summary Statistics" className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-4.5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-150 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                  {card.label}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bgColor} ${card.color} border ${card.borderColor} flex-shrink-0`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-none mb-1.5">
                  {card.value}
                </div>
                <div className="text-[11px] text-[#64748B] truncate">
                  {card.supporting}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkflowSummaryCards;
