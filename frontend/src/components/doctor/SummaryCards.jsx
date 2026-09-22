import React from 'react';
import { Users, Clock, Stethoscope, CheckCircle2, Timer, FlaskConical } from 'lucide-react';
import { doctorDashboardData } from '../../data/doctorMockData';

export const SummaryCards = () => {
  const { summary } = doctorDashboardData;

  const metrics = [
    {
      id: 'todays-patients',
      label: "Today's Patients",
      value: summary.todaysPatients,
      description: 'Patients scheduled today',
      icon: Users,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4]',
      tag: 'Scheduled',
    },
    {
      id: 'waiting',
      label: 'Waiting',
      value: summary.waiting,
      description: 'Patients in waiting area',
      icon: Clock,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      tag: 'In Queue',
    },
    {
      id: 'in-consultation',
      label: 'In Consultation',
      value: summary.inConsultation,
      description: 'Currently in room 4B',
      icon: Stethoscope,
      iconColor: 'text-blue-700',
      iconBg: 'bg-blue-50',
      tag: 'Active Now',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: summary.completed,
      description: 'Consultations completed',
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

export const AdditionalStatisticsCards = () => {
  const { summary } = doctorDashboardData;

  const secondaryCards = [
    {
      id: 'avg-time',
      title: 'Average Consultation',
      value: `${summary.averageConsultation} min`,
      description: "Today's average",
      subtext: 'Target: 15–20 min / patient',
      icon: Timer,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#F0FDF4]',
    },
    {
      id: 'lab-reviews',
      title: 'Pending Lab Reviews',
      value: summary.pendingLabReviews,
      description: 'Results awaiting review',
      subtext: '2 marked high priority',
      icon: FlaskConical,
      iconColor: 'text-blue-700',
      iconBg: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {secondaryCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs transition-all hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-semibold text-[#64748B]">
                  {card.title}
                </span>
                <div className="text-xl sm:text-2xl font-bold text-[#17221B] tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs text-[#64748B]">
                  {card.description}
                </div>
              </div>

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor} flex-shrink-0`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
