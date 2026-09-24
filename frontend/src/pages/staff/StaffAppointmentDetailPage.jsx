import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StaffLayout } from '../../layouts/StaffLayout';
import { initialStaffAppointmentsData } from '../../data/staffMockData';
import { AppointmentStatusBadge } from '../../components/staff/appointments/AppointmentStatusBadge';
import { RescheduleModal } from '../../components/staff/appointments/RescheduleModal';
import { CancelAppointmentModal } from '../../components/staff/appointments/CancelAppointmentModal';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Building2,
  Stethoscope,
  DoorOpen,
  FileText,
  UserCheck,
  ListOrdered,
  CalendarClock,
  CalendarX,
  CheckCircle2,
  CalendarX2,
  Tag,
  Hash,
} from 'lucide-react';

export const StaffAppointmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve appointment from mock dataset
  const [appointment, setAppointment] = useState(() => {
    return initialStaffAppointmentsData.find(
      (a) => String(a.id).toLowerCase() === String(id).toLowerCase()
    );
  });

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!appointment) {
    return (
      <StaffLayout
        title="Appointment Details"
        subtitle="Review scheduled outpatient consultation details."
      >
        <div className="p-4 sm:p-6 max-w-2xl mx-auto py-16">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center space-y-4 shadow-2xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mx-auto">
              <CalendarX2 className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#17221B]">Appointment Not Found</h1>
              <p className="text-xs text-[#64748B]">
                The requested appointment booking ({id}) was not found in the current schedule records.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/staff/appointments')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-all shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Appointments</span>
              </button>
            </div>
          </div>
        </div>
      </StaffLayout>
    );
  }

  // Handle local state updates
  const handleCheckIn = () => {
    setAppointment((prev) => ({ ...prev, status: 'Checked In' }));
    showToast(`Patient ${appointment.patientName} checked in successfully.`);
  };

  const handleReschedule = (apptId, updateData) => {
    setAppointment((prev) => ({ ...prev, ...updateData }));
    showToast('Appointment rescheduled successfully.');
  };

  const handleCancel = () => {
    setAppointment((prev) => ({ ...prev, status: 'Cancelled' }));
    showToast('Appointment cancelled.', 'info');
  };

  const isConfirmed = appointment.status === 'Confirmed';
  const isInQueue =
    appointment.status === 'Checked In' || appointment.status === 'Waiting';

  return (
    <StaffLayout
      title="Appointment Details"
      subtitle={`Booking record for ${appointment.id}`}
    >
      <div className="p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto space-y-5">
        {/* ── Toast Alert ── */}
        {toastMessage && (
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#15803D]/20 bg-[#F0FDF4] text-[#15803D] shadow-2xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#15803D]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ── Top Action Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <button
            type="button"
            onClick={() => navigate('/staff/appointments')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-bold text-[#17221B] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Back to Appointments</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* Check In Action */}
            {isConfirmed && (
              <button
                type="button"
                onClick={handleCheckIn}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Check In Patient</span>
              </button>
            )}

            {/* View Patient Details */}
            <button
              type="button"
              onClick={() => navigate(`/staff/patients/${appointment.patientId || 'P-1001'}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#15803D]/30 bg-[#F0FDF4] text-[#15803D] hover:bg-[#DCFCE7] text-xs font-bold transition-all cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>View Patient</span>
            </button>

            {/* View in Queue if Checked In / Waiting */}
            {isInQueue && (
              <button
                type="button"
                onClick={() => navigate('/staff/queue')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
              >
                <ListOrdered className="h-3.5 w-3.5" />
                <span>View in Queue</span>
              </button>
            )}

            {/* Reschedule Button */}
            <button
              type="button"
              onClick={() => setIsRescheduleOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all cursor-pointer"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              <span>Reschedule</span>
            </button>

            {/* Cancel Button */}
            {appointment.status !== 'Cancelled' && (
              <button
                type="button"
                onClick={() => setIsCancelOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer"
              >
                <CalendarX className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* ── 1. Hero Appointment Banner ── */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3.5">
              <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 shadow-2xs flex-shrink-0">
                <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-md border border-[#15803D]/20">
                    {appointment.id}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-[#475569] border border-slate-200">
                    {appointment.type}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-[#17221B] tracking-tight mt-1">
                  {appointment.patientName}
                </h1>
                <p className="text-xs text-[#64748B] font-mono">
                  Patient ID: {appointment.patientId} • Phone: {appointment.phone}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                Current Status
              </span>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Scheduled Time</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#17221B]">
                {appointment.time}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Calendar className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Appointment Date</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#17221B]">
                {appointment.formattedDate || appointment.date}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <DoorOpen className="h-3.5 w-3.5 text-[#15803D]" />
                <span>Room / Suite</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-[#17221B]">
                {appointment.room || 'Room 204'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Hash className="h-3.5 w-3.5 text-[#15803D]" />
                <span>OPD Token</span>
              </div>
              <div className="font-mono font-bold text-xs sm:text-sm text-[#15803D]">
                {appointment.token || 'A-021'}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Two Column Grid: Doctor/Department + Clinical Reason ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card A: Physician & Department */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
              <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#17221B]">
                  Physician & Clinic Allocation
                </h2>
                <p className="text-[11px] text-[#64748B]">Assigned hospital consultant and clinic suite</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#64748B]">Consulting Doctor</span>
                <span className="font-bold text-[#15803D]">{appointment.doctor}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#64748B]">Medical Department</span>
                <span className="font-bold text-[#17221B]">{appointment.department}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#64748B]">Consultation Suite</span>
                <span className="font-mono font-semibold text-[#17221B]">{appointment.room || 'Room 102'}</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#64748B]">Visit Classification</span>
                <span className="font-semibold text-[#17221B]">{appointment.type}</span>
              </div>
            </div>
          </div>

          {/* Card B: Reason for Visit & Intake Notes */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
              <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#17221B]">
                  Reason for Visit & Notes
                </h2>
                <p className="text-[11px] text-[#64748B]">Patient chief complaint and intake remarks</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-xs text-[#64748B] flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-[#15803D]" />
                  Chief Complaint / Reason:
                </span>
                <p className="text-xs font-semibold text-[#17221B] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0] leading-relaxed">
                  {appointment.reason || 'General health consultation and routine examination.'}
                </p>
              </div>

              <div className="space-y-1 pt-0.5">
                <span className="text-xs text-[#64748B] flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-[#15803D]" />
                  OPD Counter Protocols:
                </span>
                <p className="text-[11px] text-[#64748B] bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  Patient requested to report 15 minutes prior to scheduled slot for basic vitals measurement at Counter 03.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reschedule & Cancel Modals ── */}
      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        appointment={appointment}
        onReschedule={handleReschedule}
      />

      <CancelAppointmentModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        appointment={appointment}
        onConfirmCancel={handleCancel}
      />
    </StaffLayout>
  );
};

export default StaffAppointmentDetailPage;
