import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import {
  UserCheck,
  Eye,
  CalendarClock,
  CalendarX,
  SearchX,
  Clock,
  Stethoscope,
  MoreVertical,
  Building2,
  Tag,
} from 'lucide-react';

export const AppointmentTable = ({
  appointments = [],
  onCheckIn,
  onOpenReschedule,
  onOpenCancel,
  onClearFilters,
  isFiltered = false,
}) => {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
      {/* ── Table Header ── */}
      <div className="p-3.5 sm:p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-bold text-[#17221B]">Scheduled Appointments</h2>
          <span className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
            {appointments.length} appointments
          </span>
        </div>
        <p className="text-xs text-[#64748B] hidden sm:block">
          Manage outpatient department check-ins, scheduled consultations, and doctor bookings.
        </p>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 font-mono">Appt ID</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Patient Name</th>
              <th className="py-3 px-4">Doctor & Room</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs">
            {appointments.length > 0 ? (
              appointments.map((appt) => {
                const isConfirmed = appt.status === 'Confirmed';

                return (
                  <tr
                    key={appt.id}
                    onClick={() => navigate(`/staff/appointments/${appt.id}`)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    {/* 1. Appointment ID */}
                    <td className="py-3 px-4 font-mono font-bold text-[#15803D]">
                      {appt.id}
                    </td>

                    {/* 2. Time */}
                    <td className="py-3 px-4 text-[#17221B] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#64748B]" />
                        <span>{appt.time}</span>
                      </div>
                    </td>

                    {/* 3. Patient */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-sm text-[#17221B] group-hover:text-[#15803D] transition-colors">
                        {appt.patientName}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-mono">
                        {appt.patientId} • {appt.phone}
                      </div>
                    </td>

                    {/* 4. Doctor */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#17221B] flex items-center gap-1.5">
                        <Stethoscope className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                        <span>{appt.doctor}</span>
                      </div>
                      <div className="text-[11px] text-[#64748B]">{appt.room}</div>
                    </td>

                    {/* 5. Department */}
                    <td className="py-3 px-4 text-[#475569] font-medium">
                      {appt.department}
                    </td>

                    {/* 6. Type */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-[#475569] text-[11px] font-medium border border-slate-200">
                        {appt.type}
                      </span>
                    </td>

                    {/* 7. Status */}
                    <td className="py-3 px-4">
                      <AppointmentStatusBadge status={appt.status} />
                    </td>

                    {/* 8. Actions */}
                    <td className="py-3 px-4 text-right">
                      <div
                        className="inline-flex items-center justify-end gap-1.5 relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Check In button for Confirmed */}
                        {isConfirmed && (
                          <button
                            type="button"
                            onClick={() => onCheckIn(appt)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#15803D] text-white hover:bg-[#166534] font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                            title="Check in patient for OPD"
                          >
                            <UserCheck className="h-3 w-3" />
                            <span>Check In</span>
                          </button>
                        )}

                        {/* View Button */}
                        <button
                          type="button"
                          onClick={() => navigate(`/staff/appointments/${appt.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-white text-xs font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors shadow-2xs cursor-pointer"
                          title="View appointment details"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>

                        {/* Overflow dropdown trigger */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => toggleMenu(appt.id, e)}
                            className="p-1 rounded-md text-[#64748B] hover:bg-slate-100 hover:text-[#17221B] transition-colors cursor-pointer"
                            aria-label="More actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {activeMenuId === appt.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-1 z-30 animate-in fade-in-50 zoom-in-95">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onOpenReschedule(appt);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#475569] hover:bg-purple-50 hover:text-purple-700 text-left transition-colors cursor-pointer"
                              >
                                <CalendarClock className="h-3.5 w-3.5 text-purple-600" />
                                <span>Reschedule</span>
                              </button>

                              {appt.status !== 'Cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onOpenCancel(appt);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left transition-colors cursor-pointer"
                                >
                                  <CalendarX className="h-3.5 w-3.5" />
                                  <span>Cancel Booking</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2.5 max-w-sm mx-auto">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#94A3B8]">
                      <SearchX className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-[#17221B]">No appointments found</p>
                      <p className="text-xs text-[#64748B]">
                        Try adjusting your search query or reset active filters.
                      </p>
                    </div>
                    {isFiltered && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <span>Clear All Filters</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="md:hidden divide-y divide-[#E2E8F0]">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              onClick={() => navigate(`/staff/appointments/${appt.id}`)}
              className="p-3.5 space-y-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#15803D]">{appt.id}</span>
                    <span className="text-xs font-semibold text-[#17221B]">• {appt.time}</span>
                  </div>
                  <div className="font-bold text-sm text-[#17221B] mt-0.5">{appt.patientName}</div>
                  <div className="text-[11px] text-[#64748B] font-mono">{appt.phone}</div>
                </div>
                <AppointmentStatusBadge status={appt.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#64748B] pt-0.5">
                <div className="flex items-center gap-1">
                  <Stethoscope className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                  <span className="truncate">{appt.doctor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-[#15803D] flex-shrink-0" />
                  <span className="truncate">{appt.department}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748B] bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3 text-[#94A3B8]" />
                  <span>{appt.type}</span>
                </div>
                <span>{appt.formattedDate || appt.date}</span>
              </div>

              {/* Mobile Action Buttons */}
              <div
                className="flex items-center gap-2 pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {appt.status === 'Confirmed' && (
                  <button
                    type="button"
                    onClick={() => onCheckIn(appt)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-[#15803D] text-white hover:bg-[#166534] transition-colors"
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Check In</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate(`/staff/appointments/${appt.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg text-xs font-semibold border border-[#E2E8F0] text-[#15803D] bg-white hover:bg-[#F0FDF4] transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenReschedule(appt)}
                  className="p-1.5 rounded-lg border border-[#E2E8F0] text-purple-700 bg-white hover:bg-purple-50 transition-colors"
                  title="Reschedule"
                >
                  <CalendarClock className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 px-4 text-center space-y-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#94A3B8] mx-auto">
              <SearchX className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[#17221B]">No appointments found</p>
              <p className="text-xs text-[#64748B]">
                Try adjusting your search query or reset active filters.
              </p>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                <span>Clear All Filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Table Footer ── */}
      <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
        <span>Showing {appointments.length} appointments</span>
        <span className="text-[11px] font-medium text-[#94A3B8]">MediFlow OPD Central Desk</span>
      </div>
    </div>
  );
};

export default AppointmentTable;
