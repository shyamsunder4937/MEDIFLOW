import React from 'react';
import { Users, User, Stethoscope, Building2 } from 'lucide-react';

export const UserSummaryCards = ({ counts }) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Users',
      value: counts?.totalUsers || '1,428',
      supporting: 'All system accounts',
      icon: Users,
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#CCFBF1]',
      borderColor: 'border-[#0F766E]/20',
    },
    {
      id: 'patients',
      label: 'Patients',
      value: counts?.patients || '1,248',
      supporting: 'Registered patient portal users',
      icon: User,
      color: 'text-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
    {
      id: 'doctors',
      label: 'Doctors',
      value: counts?.doctors || '96',
      supporting: 'Physicians & consultants',
      icon: Stethoscope,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'staff',
      label: 'Staff',
      value: counts?.staff || '84',
      supporting: 'Hospital, Lab & Pharmacy staff',
      icon: Building2,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
  ];

  return (
    <section aria-label="User Statistics Summary" className="mb-6">
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

export default UserSummaryCards;
