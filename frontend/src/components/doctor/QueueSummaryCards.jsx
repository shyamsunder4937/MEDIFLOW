import React from 'react';
import { Users, Clock, Stethoscope, CheckCircle2 } from 'lucide-react';

export const QueueSummaryCards = ({ queueData = [] }) => {
  const total = queueData.length;
  const waiting = queueData.filter((p) => p.status === 'Waiting').length;
  const inConsult = queueData.filter((p) => p.status === 'In Consultation').length;
  const completed = queueData.filter((p) => p.status === 'Completed').length;

  const metrics = [
    {
      id: 'total',
      label: "Today's Queue",
      value: total,
      description: 'Total patients in queue',
      icon: Users,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4]',
      tag: 'Scheduled',
    },
    {
      id: 'waiting',
      label: 'Waiting for Doctor',
      value: waiting,
      description: 'In consultation waiting room',
      icon: Clock,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      tag: 'In Queue',
    },
    {
      id: 'in-consult',
      label: 'In Consultation',
      value: inConsult,
      description: 'Currently in room 4B',
      icon: Stethoscope,
      iconColor: 'text-blue-700',
      iconBg: 'bg-blue-50',
      tag: 'Active Now',
    },
    {
      id: 'completed',
      label: 'Completed Today',
      value: completed,
      description: 'Consultations finished',
      icon: CheckCircle2,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4]',
      tag: 'Discharged',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                  {metric.label}
                </span>
                <span className="text-[10px] font-medium text-[#64748B] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                  {metric.tag}
                </span>
              </div>

              <div className="my-1">
                <div className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
                  {metric.value}
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-snug truncate mt-0.5">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
