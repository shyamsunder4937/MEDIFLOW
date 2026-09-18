import React from 'react';
import { Clock, CheckCircle, Ban } from 'lucide-react';
import { mockTimeSlots } from '../../data/mockAppointmentsData';

export const TimeSelector = ({ selectedTime, onSelectTime }) => {
  const morningSlots = mockTimeSlots.filter((s) => s.period === 'Morning');
  const afternoonSlots = mockTimeSlots.filter((s) => s.period === 'Afternoon');

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold text-[#0F172A]">Select Consultation Time Slot</h4>
        <p className="text-xs text-[#64748B] mt-0.5">
          Pick an open 30-minute consultation window with your physician.
        </p>
      </div>

      {/* Morning Section */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
          <span>Morning Slots (09:00 AM – 12:00 PM)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {morningSlots.map((slot) => {
            const isSelected = selectedTime?.time === slot.time;
            const isAvailable = slot.available;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectTime(slot)}
                className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all duration-150 flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  !isAvailable
                    ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                    : isSelected
                    ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-xs ring-1 ring-[#0F766E] cursor-pointer'
                    : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50 text-[#0F172A] cursor-pointer'
                }`}
              >
                <span>{slot.time}</span>
                <span className="text-[10px] font-normal">
                  {isAvailable ? (isSelected ? 'Selected' : 'Open') : 'Booked'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Afternoon Section */}
      <div className="space-y-2 pt-2">
        <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
          <span>Afternoon Slots (02:00 PM – 05:00 PM)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {afternoonSlots.map((slot) => {
            const isSelected = selectedTime?.time === slot.time;
            const isAvailable = slot.available;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelectTime(slot)}
                className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all duration-150 flex flex-col items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  !isAvailable
                    ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                    : isSelected
                    ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-xs ring-1 ring-[#0F766E] cursor-pointer'
                    : 'border-[#E2E8F0] bg-white hover:border-slate-300 hover:bg-slate-50 text-[#0F172A] cursor-pointer'
                }`}
              >
                <span>{slot.time}</span>
                <span className="text-[10px] font-normal">
                  {isAvailable ? (isSelected ? 'Selected' : 'Open') : 'Booked'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#64748B] pt-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 border border-slate-300" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 line-through" />
          <span>Booked / Disabled</span>
        </div>
      </div>
    </div>
  );
};
