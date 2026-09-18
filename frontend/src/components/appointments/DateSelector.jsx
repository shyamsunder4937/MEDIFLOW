import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Info } from 'lucide-react';
import { mockAvailableDates } from '../../data/mockAppointmentsData';

export const DateSelector = ({ selectedDate, onSelectDate }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold text-[#0F172A]">Select Consultation Date</h4>
        <p className="text-xs text-[#64748B] mt-0.5">
          Select an available clinic date for your appointment.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {mockAvailableDates.map((item) => {
          const isSelected = selectedDate?.full === item.full;
          const isAvailable = item.isAvailable;

          return (
            <button
              key={item.full}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectDate(item)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center justify-between min-h-[108px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                !isAvailable
                  ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                  : isSelected
                  ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-md ring-2 ring-[#0F766E]/30 cursor-pointer'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50 text-[#0F172A] cursor-pointer'
              }`}
            >
              {/* Day Name */}
              <div
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isSelected ? 'text-teal-100' : 'text-[#64748B]'
                }`}
              >
                {item.dayName}
              </div>

              {/* Date Short */}
              <div
                className={`text-lg font-extrabold my-1 ${
                  isSelected ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                {item.short}
              </div>

              {/* Status or Badge */}
              <div className="text-[10px] font-semibold">
                {item.badge ? (
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#CCFBF1] text-[#0F766E]'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : !isAvailable ? (
                  <span className="text-slate-400">Closed</span>
                ) : (
                  <span className={isSelected ? 'text-teal-100' : 'text-emerald-600'}>
                    Available
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#64748B] bg-slate-50 p-3 rounded-xl border border-slate-200">
        <Info className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
        <span>
          OPD clinics operate Monday through Saturday. Sunday slots are reserved for emergency triage.
        </span>
      </div>
    </div>
  );
};
