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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1]/60 text-[#0F766E]">
            <Package className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Order Tracking</h3>
            <p className="text-[11px] text-[#64748B]">Order ID: <span className="font-mono font-semibold text-[#0F172A]">{t.orderId}</span></p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
          <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
          {t.currentStatus}
        </span>
      </div>

      {/* Status Message */}
      <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-[#16A34A] flex-shrink-0" />
        <p className="text-sm font-semibold text-[#16A34A]">{t.message}</p>
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {t.stages.map((stage, idx) => {
          const isDone    = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isLast    = idx === t.stages.length - 1;

          return (
            <div key={stage.id} className="flex gap-4">
              {/* Left column: dot + connector */}
              <div className="flex flex-col items-center flex-shrink-0 w-10">
                <div className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 z-10 transition-all ${
                  isDone    ? 'bg-[#0F766E] border-[#0F766E] text-white' :
                  isCurrent ? 'bg-white border-[#0F766E] text-[#0F766E] shadow ring-4 ring-[#0F766E]/10' :
                              'bg-white border-[#E2E8F0] text-[#CBD5E1]'
                }`}>
                  {isDone
                    ? <CheckCircle2 className="h-4 w-4" />
                    : isCurrent
                    ? <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                    : <Circle className="h-4 w-4" />}

                  {isCurrent && (
                    <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#0F766E] border-2 border-white animate-ping opacity-75" />
                  )}
                </div>

                {/* Vertical connector */}
                {!isLast && (
                  <div className={`flex-1 w-0.5 my-1 min-h-[28px] ${isDone ? 'bg-[#0F766E]/40' : 'bg-[#E2E8F0]'}`} />
                )}
              </div>

              {/* Right column: content */}
              <div className={`pb-5 flex-1 min-w-0 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-semibold leading-snug ${
                      isCurrent ? 'text-[#0F766E]' : isDone ? 'text-[#0F172A]' : 'text-[#94A3B8]'
                    }`}>
                      {stage.label}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{stage.note}</p>
                  </div>
                  {stage.time && (
                    <span className={`text-[10px] font-mono font-semibold flex-shrink-0 ${
                      isCurrent ? 'text-[#0F766E]' : isDone ? 'text-[#64748B]' : 'text-[#CBD5E1]'
                    }`}>
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
