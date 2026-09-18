import React from 'react';
import { Pill, CheckCircle2, ShoppingBag } from 'lucide-react';

export const PharmacySummaryCards = ({ summary }) => {
  const { activePrescriptions = 2, readyForPickup = 1, completedOrders = 4 } = summary || {};

  const cards = [
    {
      id: 'active',
      label: 'Active Prescriptions',
      value: activePrescriptions,
      description: 'Prescriptions currently in progress',
      icon: Pill,
      iconBg: 'bg-[#CCFBF1]/60 text-[#0F766E]',
      badge: 'In Progress',
      badgeClass: 'bg-[#CCFBF1]/70 text-[#0F766E] border-teal-200/70',
      dot: 'bg-[#0F766E]',
      dotPulse: false,
    },
    {
      id: 'ready',
      label: 'Ready for Pickup',
      value: readyForPickup,
      description: 'Available at hospital pharmacy counter',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 text-[#16A34A]',
      badge: 'Collect Now',
      badgeClass: 'bg-emerald-50 text-[#16A34A] border-emerald-200/70',
      dot: 'bg-[#16A34A] animate-pulse',
      dotPulse: true,
    },
    {
      id: 'completed',
      label: 'Completed Orders',
      value: completedOrders,
      description: 'Medicines successfully collected',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-[#16A34A]',
      badge: 'All Done',
      badgeClass: 'bg-emerald-50 text-[#16A34A] border-emerald-200/70',
      dot: 'bg-[#16A34A]',
      dotPulse: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    {card.label}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${card.dot}`} />
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {card.id === 'active' ? 'Current Visit' : card.id === 'ready' ? 'Awaiting Pickup' : 'Past Orders'}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${card.badgeClass} flex-shrink-0`}>
                {card.badge}
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
