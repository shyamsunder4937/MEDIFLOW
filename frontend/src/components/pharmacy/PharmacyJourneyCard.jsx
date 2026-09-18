import React from 'react';
import {
  Stethoscope,
  FileText,
  Inbox,
  Package,
  Bell,
  CheckCircle2,
  Circle,
} from 'lucide-react';

const ICON_MAP = {
  Stethoscope,
  FileText,
  Inbox,
  Package,
  Bell,
  CheckCircle2,
};

export const PharmacyJourneyCard = ({ stages }) => {
  const list = stages || [
    { id: 'doctor',   label: 'Doctor',               icon: 'Stethoscope',  status: 'completed', time: '11:00 AM' },
    { id: 'rx',       label: 'Prescription Created',  icon: 'FileText',     status: 'completed', time: '11:42 AM' },
    { id: 'received', label: 'Pharmacy Received',     icon: 'Inbox',        status: 'completed', time: '11:45 AM' },
    { id: 'prepared', label: 'Order Prepared',         icon: 'Package',      status: 'completed', time: '12:10 PM' },
    { id: 'ready',    label: 'Ready for Pickup',       icon: 'Bell',         status: 'current',   time: 'Now'      },
    { id: 'collected',label: 'Collected',              icon: 'CheckCircle2', status: 'upcoming',  time: null       },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E8F0] mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1]/60 text-[#0F766E]">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Prescription Journey</h3>
          <p className="text-[11px] text-[#64748B]">Full workflow from doctor to dispensation</p>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {list.map((stage, idx) => {
          const Icon = ICON_MAP[stage.icon] || Circle;
          const isDone    = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isUpcoming = stage.status === 'upcoming';

          return (
            <div key={stage.id} className="flex flex-col items-center text-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                isDone    ? 'bg-[#0F766E] border-[#0F766E] text-white' :
                isCurrent ? 'bg-white border-[#0F766E] text-[#0F766E] shadow ring-4 ring-[#0F766E]/15' :
                            'bg-[#F8FAFC] border-[#E2E8F0] text-[#CBD5E1]'
              }`}>
                {isDone
                  ? <CheckCircle2 className="h-4.5 w-4.5" />
                  : <Icon className="h-4 w-4" />}
              </div>

              <div>
                <p className={`text-[11px] font-semibold leading-tight ${
                  isDone ? 'text-[#0F766E]' : isCurrent ? 'text-[#0F172A] font-bold' : 'text-[#94A3B8]'
                }`}>
                  {stage.label}
                </p>
                <p className={`text-[10px] mt-0.5 ${
                  isCurrent ? 'text-[#D97706] font-medium' : 'text-[#CBD5E1]'
                }`}>
                  {stage.time || '—'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
