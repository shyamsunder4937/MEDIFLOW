import React from 'react';
import { Activity, CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

export const AvailabilityCard = ({ availability, onSetAvailability }) => {
  const options = [
    {
      id: 'Available',
      label: 'Available',
      description: 'Ready to receive patients from the queue',
      color: 'text-emerald-700',
      activeBg: 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs',
      indicator: 'bg-emerald-500',
    },
    {
      id: 'Busy',
      label: 'Busy',
      description: 'Currently in consultation or procedure',
      color: 'text-amber-700',
      activeBg: 'bg-amber-50 border-amber-500 text-amber-800 shadow-2xs',
      indicator: 'bg-amber-500',
    },
    {
      id: 'Unavailable',
      label: 'Unavailable',
      description: 'Break, rounds, or shift ended',
      color: 'text-rose-700',
      activeBg: 'bg-rose-50 border-rose-500 text-rose-800 shadow-2xs',
      indicator: 'bg-rose-500',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Activity className="h-4.5 w-4.5 text-[#0F766E]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Clinical Availability
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Hospital workflow & patient routing status
            </p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
          availability === 'Available'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : availability === 'Busy'
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          <span className={`h-2 w-2 rounded-full ${
            availability === 'Available'
              ? 'bg-emerald-500 animate-pulse'
              : availability === 'Busy'
              ? 'bg-amber-500'
              : 'bg-rose-500'
          }`} />
          {availability}
        </span>
      </div>

      {/* Interactive Status Radio Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = availability === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSetAvailability(opt.id)}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                isSelected
                  ? opt.activeBg
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xs flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${opt.indicator}`} />
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-[#0F766E]" />
                )}
              </div>
              <p className="text-[10px] text-[#64748B] leading-tight">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Informational Subtext */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#64748B] flex items-center gap-2">
        <Info className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
        <span>Your current availability is shown to the hospital workflow interface.</span>
      </div>
    </div>
  );
};

export default AvailabilityCard;
