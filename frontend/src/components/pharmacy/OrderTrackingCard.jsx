import React from 'react';
import { Package, CheckCircle2, Circle } from 'lucide-react';

export const OrderTrackingCard = ({ tracking }) => {
  const t = tracking || {
    orderId: 'PH-2026-0042',
    currentStatus: 'Ready for Pickup',
    message: 'Your order is ready at the hospital pharmacy.',
    counter: 'Counter 02',
    stages: [
      { id: 'received',  label: 'Prescription Received', status: 'completed', time: '11:42 AM', note: 'Rx verified by pharmacist' },
      { id: 'prepared',  label: 'Order Prepared',         status: 'completed', time: '12:10 PM', note: 'Medicines picked from dispensary' },
      { id: 'qc',        label: 'Quality Check',          status: 'completed', time: '12:25 PM', note: 'Double-checked by senior pharmacist' },
      { id: 'ready',     label: 'Ready for Pickup',       status: 'current',   time: '12:30 PM', note: 'Waiting at Counter 02' },
      { id: 'collected', label: 'Collected',              status: 'upcoming',  time: null,        note: 'Please collect with hospital token' },
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs p-5 sm:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <Package className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17221B] tracking-tight">Order Tracking</h3>
            <p className="text-xs text-[#64748B]">Order ID: <span className="font-mono font-bold text-[#17221B]">{t.orderId}</span></p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
          {t.currentStatus}
        </span>
      </div>

      {/* ── Status Message Banner ── */}
      <div className="mb-4 p-3 rounded-lg bg-[#F0FDF4] border border-[#15803D]/25 flex items-center gap-2.5">
        <CheckCircle2 className="h-4.5 w-4.5 text-[#15803D] flex-shrink-0" />
        <p className="text-xs sm:text-sm font-semibold text-[#15803D]">{t.message}</p>
      </div>

      {/* ── Timeline ── */}
      <div className="space-y-0">
        {t.stages.map((stage, idx) => {
          const isDone    = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isLast    = idx === t.stages.length - 1;

          return (
            <div key={stage.id} className="flex gap-3">
              {/* Left column: dot + connector */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <div
                  className={`relative flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
                    isDone
                      ? 'bg-[#15803D] border-[#15803D] text-white'
                      : isCurrent
                      ? 'bg-[#15803D] border-[#15803D] text-white shadow-2xs ring-2 ring-[#F0FDF4]'
                      : 'bg-slate-100 border-[#E2E8F0] text-[#CBD5E1]'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  ) : (
                    <Circle className="h-3 w-3 text-[#94A3B8]" />
                  )}
                </div>

                {/* Vertical connector */}
                {!isLast && (
                  <div className={`flex-1 w-0.5 my-1 min-h-[22px] ${isDone ? 'bg-[#15803D]/30' : 'bg-[#E2E8F0]'}`} />
                )}
              </div>

              {/* Right column: content */}
              <div className={`pb-3.5 flex-1 min-w-0 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      className={`text-xs sm:text-sm font-bold leading-snug ${
                        isCurrent ? 'text-[#15803D]' : isDone ? 'text-[#17221B]' : 'text-[#64748B]'
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{stage.note}</p>
                  </div>
                  {stage.time && (
                    <span
                      className={`text-[10px] font-mono font-semibold flex-shrink-0 ${
                        isCurrent ? 'text-[#15803D]' : isDone ? 'text-[#64748B]' : 'text-[#94A3B8]'
                      }`}
                    >
                      {stage.time}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

