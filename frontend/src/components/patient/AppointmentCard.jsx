import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Stethoscope, ArrowRight, UserCheck, Calendar } from 'lucide-react';
import { mockUpcomingAppointment, mockCurrentVisit, mockQueue } from '../../data/mockPatientData';

export const AppointmentCard = () => {
  const { department, doctor, specialization, date, time, hospital, type } = mockUpcomingAppointment;
  const { room, status: visitStatus } = mockCurrentVisit;
  const { queueNumber, patientsAhead, estimatedWaitMinutes } = mockQueue;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-[#E2E8F0] gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            <CalendarDays className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#17221B] leading-tight">
              Upcoming Appointment
            </h2>
            <p className="text-xs text-[#64748B]">Next scheduled hospital consultation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
            {type} Consultation
          </span>
        </div>
      </div>

      {/* Main Appointment Body */}
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Doctor & Department */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
              Consulting Doctor
            </span>
            <div className="text-base font-bold text-[#17221B] flex items-center gap-1.5">
              <Stethoscope className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <span>{doctor}</span>
            </div>
            <p className="text-xs text-[#64748B]">{specialization} · {department}</p>
          </div>

          {/* Date & Time */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
              Schedule & Timing
            </span>
            <div className="text-base font-bold text-[#17221B] flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <span>{date}</span>
            </div>
            <p className="text-xs text-[#64748B] flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#94A3B8]" />
              <span>{time} (Reporting time: 10:15 AM)</span>
            </p>
          </div>

          {/* Location / Facility */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block">
              Facility & Location
            </span>
            <div className="text-sm font-bold text-[#17221B] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <span>{hospital}</span>
            </div>
            <p className="text-xs text-[#64748B]">{room}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
            <Link
              to="/patient/appointments"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors text-center cursor-pointer shadow-xs"
            >
              <span>View Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/patient/appointments"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-[#E2E8F0] text-[#17221B] text-xs font-semibold transition-colors text-center cursor-pointer"
            >
              Reschedule
            </Link>
          </div>
        </div>

        {/* Live Queue Context Highlight for Today's Active Visit */}
        {visitStatus && (
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F8FAFC] rounded-lg p-3.5 border">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#15803D] animate-pulse flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#17221B]">
                  Live OPD Visit in Progress: <span className="text-[#15803D]">Token #{queueNumber}</span>
                </span>
                <p className="text-[11px] text-[#64748B]">
                  {patientsAhead} patients ahead in queue · Estimated wait ~{estimatedWaitMinutes} minutes
                </p>
              </div>
            </div>
            <Link
              to="/patient/queue"
              className="text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline inline-flex items-center gap-1 self-end sm:self-auto"
            >
              <span>Track Live Queue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
