import React from 'react';
import { CalendarDays, Clock, MapPin, Stethoscope } from 'lucide-react';
import { mockUpcomingAppointment } from '../../data/mockPatientData';

export const AppointmentCard = () => {
  const { department, doctor, specialization, date, time, hospital, type } = mockUpcomingAppointment;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <CalendarDays className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Upcoming Appointment</h2>
        </div>
        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
          {type}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Department + Doctor */}
        <div className="space-y-1">
          <div className="text-base font-bold text-[#0F172A]">{department}</div>
          <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
            <Stethoscope className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="font-medium text-[#0F172A]">{doctor}</span>
            <span className="text-[#94A3B8]">·</span>
            <span className="text-xs">{specialization}</span>
          </div>
        </div>

        {/* Date / Time / Hospital */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-[#94A3B8] flex-shrink-0" />
            <span className="font-semibold text-[#0F172A]">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-[#94A3B8] flex-shrink-0" />
            <span className="text-[#0F172A]">{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-[#94A3B8] flex-shrink-0" />
            <span className="text-[#64748B] text-xs">{hospital}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-2.5 pt-1">
          <button className="flex-1 rounded-xl bg-[#0F766E] py-2 text-xs font-semibold text-white hover:bg-[#115E59] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2">
            View Details
          </button>
          <button className="flex-1 rounded-xl border border-[#E2E8F0] py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};
