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
      iconBg: 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20',
      badge: 'In Progress',
      badgeClass: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
      dot: 'bg-[#15803D]',
    },
    {
      id: 'ready',
      label: 'Ready for Pickup',
      value: readyForPickup,
      description: 'Available at hospital pharmacy counter',
      icon: ShoppingBag,
      iconBg: 'bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20',
      badge: 'Collect Now',
      badgeClass: 'bg-[#F0FDF4] text-[#15803D] border-[#15803D]/20',
      dot: 'bg-[#15803D] animate-pulse',
    },
    {
      id: 'completed',
      label: 'Completed Orders',
      value: completedOrders,
      description: 'Medicines successfully collected',
      icon: CheckCircle2,
      iconBg: 'bg-slate-50 text-[#64748B] border border-slate-200',
      badge: 'All Done',
      badgeClass: 'bg-slate-100 text-[#475569] border-[#E2E8F0]',
      dot: 'bg-[#64748B]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
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
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${card.badgeClass} flex-shrink-0`}>
                {card.badge}
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#17221B] tracking-tight">
                {card.value}
              </div>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

