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
    { id: 'doctor',   label: 'Doctor Consultation',   icon: 'Stethoscope',  status: 'completed', time: '11:00 AM' },
    { id: 'rx',       label: 'Prescription Created',  icon: 'FileText',     status: 'completed', time: '11:42 AM' },
    { id: 'received', label: 'Pharmacy Received',     icon: 'Inbox',        status: 'completed', time: '11:45 AM' },
    { id: 'prepared', label: 'Order Prepared',         icon: 'Package',      status: 'completed', time: '12:10 PM' },
    { id: 'ready',    label: 'Ready for Pickup',       icon: 'Bell',         status: 'current',   time: 'Now'      },
    { id: 'collected',label: 'Dispensed',              icon: 'CheckCircle2', status: 'upcoming',  time: null       },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E8F0] mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#17221B] tracking-tight">Prescription Pathway</h3>
          <p className="text-xs text-[#64748B]">Complete hospital workflow from doctor to counter dispensation</p>
        </div>
      </div>

      {/* ── Steps Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {list.map((stage) => {
          const Icon = ICON_MAP[stage.icon] || Circle;
          const isDone    = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <div
              key={stage.id}
              className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#F0FDF4] border-[#15803D]/40 shadow-2xs'
                  : isDone
                  ? 'bg-slate-50/70 border-[#E2E8F0]'
                  : 'bg-white border-[#E2E8F0]/70 opacity-60'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all mb-2 ${
                  isDone
                    ? 'bg-[#15803D] border-[#15803D] text-white'
                    : isCurrent
                    ? 'bg-[#15803D] border-[#15803D] text-white shadow-2xs ring-2 ring-[#F0FDF4]'
                    : 'bg-slate-100 border-[#E2E8F0] text-[#94A3B8]'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0 w-full">
                <p
                  className={`text-xs font-bold leading-snug truncate ${
                    isCurrent ? 'text-[#15803D]' : isDone ? 'text-[#17221B]' : 'text-[#64748B]'
                  }`}
                >
                  {stage.label}
                </p>
                <p
                  className={`text-[10px] mt-0.5 font-medium truncate ${
                    isCurrent ? 'text-[#15803D]' : 'text-[#64748B]'
                  }`}
                >
                  {isDone ? `✓ ${stage.time}` : isCurrent ? stage.time : stage.time || '—'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

