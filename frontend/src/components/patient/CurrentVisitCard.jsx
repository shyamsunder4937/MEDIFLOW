import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Clock, Users, CalendarClock, ArrowRight, Activity } from 'lucide-react';
import { mockCurrentVisit, mockQueue } from '../../data/mockPatientData';

export const CurrentVisitCard = () => {
  const { department, doctor, appointmentTime, status, room } = mockCurrentVisit;
  const { queueNumber, patientsAhead, estimatedWaitMinutes } = mockQueue;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
            <Activity className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A]">Today's Visit</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/25 px-2.5 py-1 text-[11px] font-bold text-[#16A34A] uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
          {status}
        </span>
      </div>

      <div className="p-5">
        {/* Visit meta */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Department</p>
            <p className="text-sm font-semibold text-[#0F172A]">{department}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Doctor</p>
            <p className="text-sm font-semibold text-[#0F172A]">{doctor}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Appointment</p>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
              <CalendarClock className="h-3.5 w-3.5 text-[#64748B]" />
              {appointmentTime}
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Location</p>
            <p className="text-xs font-medium text-[#64748B]">{room}</p>
          </div>
        </div>

        {/* Queue + Wait highlights */}
        <div className="grid grid-cols-3 gap-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5">
          {/* Queue number */}
          <div className="text-center space-y-1">
            <div className="text-[28px] font-extrabold text-[#0F766E] leading-none">
              #{queueNumber}
            </div>
            <div className="text-[10px] text-[#64748B] font-medium">Queue No.</div>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center justify-center gap-2 border-x border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-center">
              <Users className="h-3.5 w-3.5 text-[#94A3B8]" />
              <div>
                <div className="text-base font-bold text-[#0F172A] leading-none">{patientsAhead}</div>
                <div className="text-[10px] text-[#64748B] font-medium mt-0.5">Ahead</div>
              </div>
            </div>
          </div>

          {/* Wait time */}
          <div className="text-center space-y-1">
            <div className="flex items-end justify-center gap-0.5 leading-none">
              <span className="text-[28px] font-extrabold text-[#D97706] leading-none">{estimatedWaitMinutes}</span>
              <span className="text-xs text-[#64748B] font-medium mb-1">min</span>
            </div>
            <div className="text-[10px] text-[#64748B] font-medium">Est. Wait</div>
          </div>
        </div>

        {/* Doctor row */}
        <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B]">
          <Stethoscope className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>Consulting with <span className="font-semibold text-[#0F172A]">{doctor}</span></span>
          <span className="ml-auto flex items-center gap-1 text-[#64748B]">
            <Clock className="h-3 w-3" /> ~{estimatedWaitMinutes} min
          </span>
        </div>

        {/* CTA */}
        <Link
          to="/patient/journey"
          className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-[#0F766E] py-2.5 text-sm font-semibold text-white hover:bg-[#115E59] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2"
        >
          View My Journey
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
