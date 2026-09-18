import React from 'react';
import { Users, Clock, Stethoscope, CheckCircle2, Timer, FlaskConical } from 'lucide-react';
import { doctorDashboardData } from '../../data/doctorMockData';

export const SummaryCards = () => {
  const { summary } = doctorDashboardData;

  const mainCards = [
    {
      id: 'todays-patients',
      title: "Today's Patients",
      value: summary.todaysPatients,
      description: 'Patients scheduled today',
      icon: Users,
      iconColor: 'text-[#0F766E]',
      iconBg: 'bg-[#CCFBF1]',
      borderColor: 'hover:border-[#0F766E]/40',
      tag: 'Scheduled',
    },
    {
      id: 'waiting',
      title: 'Waiting',
      value: summary.waiting,
      description: 'Patients waiting',
      icon: Clock,
      iconColor: 'text-[#D97706]',
      iconBg: 'bg-amber-100/70',
      borderColor: 'hover:border-amber-300',
      tag: 'In Queue',
    },
    {
      id: 'in-consultation',
      title: 'In Consultation',
      value: summary.inConsultation,
      description: 'Currently being consulted',
      icon: Stethoscope,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-blue-100/70',
      borderColor: 'hover:border-blue-300',
      tag: 'Active Now',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: summary.completed,
      description: 'Consultations completed',
      icon: CheckCircle2,
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-emerald-100/70',
      borderColor: 'hover:border-emerald-300',
      tag: 'Discharged',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mainCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs transition-all duration-150 ${card.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#64748B] tracking-tight">
                {card.title}
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
              <span className="text-[10px] font-semibold text-[#64748B] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                {card.tag}
              </span>
            </div>

            <p className="text-xs text-[#64748B] mt-1.5 leading-snug">
              {card.description}
            </p>
          </div>
        );
      })}
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
      iconColor: 'text-[#0F766E]',
      iconBg: 'bg-[#CCFBF1]/60',
    },
    {
      id: 'lab-reviews',
      title: 'Pending Lab Reviews',
      value: summary.pendingLabReviews,
      description: 'Results awaiting review',
      subtext: '2 marked high priority',
      icon: FlaskConical,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {secondaryCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#64748B]">
                  {card.title}
                </span>
                <div className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs text-[#64748B]">
                  {card.description}
                </div>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor} flex-shrink-0`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
