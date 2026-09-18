import React from 'react';
import { Users, Clock, Stethoscope, CheckCircle2 } from 'lucide-react';

export const QueueSummaryCards = ({ queueData = [] }) => {
  const total = queueData.length;
  const waiting = queueData.filter((p) => p.status === 'Waiting').length;
  const inConsult = queueData.filter((p) => p.status === 'In Consultation').length;
  const completed = queueData.filter((p) => p.status === 'Completed').length;

  const cards = [
    {
      id: 'total',
      title: "Today's Queue",
      value: total,
      label: 'Total Patients',
      icon: Users,
      iconColor: 'text-[#0F766E]',
      iconBg: 'bg-[#CCFBF1]',
      borderHover: 'hover:border-[#0F766E]/40',
    },
    {
      id: 'waiting',
      title: 'Waiting for Consultation',
      value: waiting,
      label: 'Waiting',
      icon: Clock,
      iconColor: 'text-[#D97706]',
      iconBg: 'bg-amber-100/70',
      borderHover: 'hover:border-amber-300',
    },
    {
      id: 'in-consult',
      title: 'Currently With Doctor',
      value: inConsult,
      label: 'In Consultation',
      icon: Stethoscope,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-blue-100/70',
      borderHover: 'hover:border-blue-300',
    },
    {
      id: 'completed',
      title: 'Completed Today',
      value: completed,
      label: 'Completed',
      icon: CheckCircle2,
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-emerald-100/70',
      borderHover: 'hover:border-emerald-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs transition-all duration-150 ${card.borderHover}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                {card.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                {card.value}
              </div>
            </div>

            <p className="text-xs text-[#64748B] mt-1 leading-snug">
              {card.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};
