import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Activity,
  Calendar,
} from 'lucide-react';
import { todayAppointmentsList } from '../../../data/adminMockData';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </span>
      );
    case 'In Consultation':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20">
          <Activity className="h-3 w-3 animate-pulse" />
          In Consultation
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="h-3 w-3" />
          Waiting
        </span>
      );
    case 'Scheduled':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-[#475569] border border-slate-200">
          <Calendar className="h-3 w-3" />
          Scheduled
        </span>
      );
  }
};

export const TodayAppointmentsCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
              <CalendarDays className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                Today's Appointments
              </h3>
              <p className="text-xs text-[#64748B]">
                Live consultation schedule & status tracking
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-full border border-[#0F766E]/20">
            {todayAppointmentsList.length} Active
          </span>
        </div>

        {/* Appointments Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                <th className="pb-2.5 pl-1">Time</th>
                <th className="pb-2.5">Patient</th>
                <th className="pb-2.5">Doctor</th>
                <th className="pb-2.5">Department</th>
                <th className="pb-2.5 text-right pr-1">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {todayAppointmentsList.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-slate-50/80 transition-colors duration-100"
                >
                  <td className="py-3 pl-1 font-semibold text-[#0F172A] whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-mono text-[11px]">
                      <Clock className="h-3 w-3 text-[#64748B]" />
                      {apt.time}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-[#0F172A] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-[#CCFBF1] text-[#0F766E] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {apt.patient.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#0F172A]">{apt.patient}</span>
                    </div>
                  </td>
                  <td className="py-3 text-[#475569] whitespace-nowrap">
                    <span className="font-medium text-slate-700">{apt.doctor}</span>
                  </td>
                  <td className="py-3 text-[#64748B] whitespace-nowrap">
                    <span className="text-slate-600">{apt.department}</span>
                  </td>
                  <td className="py-3 text-right pr-1 whitespace-nowrap">
                    {getStatusBadge(apt.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-xs text-[#64748B]">
          Showing 6 of 42 scheduled appointments
        </span>
        <Link
          to="/admin/workflow"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:underline"
        >
          View All Appointments
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default TodayAppointmentsCard;
