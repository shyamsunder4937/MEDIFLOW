import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ArrowRight, Clock, Stethoscope } from 'lucide-react';
import { staffTodayAppointments } from '../../data/staffMockData';

export const AppointmentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Confirmed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          Confirmed
        </span>
      );
    case 'Checked In':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Checked In
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Waiting
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-[#64748B] border border-slate-200">
          {status}
        </span>
      );
  }
};

export const StaffAppointmentsPreview = ({ appointments = staffTodayAppointments }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      {/* ── Section Header ── */}
      <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">Today's Appointments</h2>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#475569] text-[10px] font-bold border border-[#E2E8F0]">
                {appointments.length} Scheduled
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Scheduled outpatient department visits for today
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/staff/appointments')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] hover:underline transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>View All Appointments</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#17221B] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>{apt.time}</span>
                  </div>
                </td>

                <td className="py-3 px-4 font-bold text-[#17221B]">
                  <div>{apt.patient}</div>
                  <div className="text-[11px] text-[#64748B] font-mono font-normal">{apt.patientId}</div>
                </td>

                <td className="py-3 px-4 text-[#475569] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="h-3.5 w-3.5 text-[#64748B]" />
                    <span>{apt.doctor}</span>
                  </div>
                </td>

                <td className="py-3 px-4 text-[#64748B]">
                  {apt.department}
                </td>

                <td className="py-3 px-4 text-right">
                  <AppointmentStatusBadge status={apt.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile View ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {appointments.map((apt) => (
          <div key={apt.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#17221B] flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#15803D]" />
                {apt.time}
              </span>
              <AppointmentStatusBadge status={apt.status} />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#17221B]">{apt.patient}</div>
                <div className="text-[11px] text-[#64748B]">{apt.department} • {apt.doctor}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffAppointmentsPreview;

