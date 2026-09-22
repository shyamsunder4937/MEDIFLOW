import React from 'react';
import { Activity, CheckCircle2, Info } from 'lucide-react';

export const AvailabilityCard = ({ availability, onSetAvailability }) => {
  const options = [
    {
      id: 'Available',
      label: 'Available',
      description: 'Ready to receive patients from the queue',
      indicator: 'bg-[#15803D]',
    },
    {
      id: 'Busy',
      label: 'Busy',
      description: 'Currently in consultation or procedure',
      indicator: 'bg-amber-500',
    },
    {
      id: 'Unavailable',
      label: 'Unavailable',
      description: 'Break, rounds, or shift ended',
      indicator: 'bg-rose-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#15803D]" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#17221B] tracking-tight">
              Clinical Availability
            </h2>
            <p className="text-[11px] text-[#64748B]">
              Hospital workflow & patient routing status
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            availability === 'Available'
              ? 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]'
              : availability === 'Busy'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              availability === 'Available'
                ? 'bg-[#15803D] animate-pulse'
                : availability === 'Busy'
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
          />
          {availability}
        </span>
      </div>

      {/* Interactive Status Radio Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const isSelected = availability === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSetAvailability(opt.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                isSelected
                  ? 'bg-[#F0FDF4] border-[#15803D] text-[#17221B] shadow-2xs'
                  : 'bg-white border-[#E2E8F0] hover:bg-slate-50 hover:border-slate-300 text-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xs flex items-center gap-1.5 text-[#17221B]">
                  <span className={`h-2 w-2 rounded-full ${opt.indicator}`} />
                  {opt.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
                )}
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Informational Subtext */}
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-[#64748B] flex items-center gap-2">
        <Info className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
        <span>Your current availability regulates patient routing in hospital OPD.</span>
      </div>
    </div>
  );
};

export default AvailabilityCard;

