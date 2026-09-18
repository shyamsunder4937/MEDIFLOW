import React from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
  Building2,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { defaultHospital } from '../../data/mockAppointmentsData';

export const AppointmentSummary = ({
  department,
  doctor,
  date,
  time,
  reason,
  onReasonChange,
  isSubmitting,
  onConfirm
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-bold text-[#0F172A]">Review Appointment Details</h4>
        <p className="text-xs text-[#64748B] mt-0.5">
          Please verify your consultation information before confirming your booking.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-slate-50 rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        {/* Top hospital banner */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A]">{defaultHospital}</div>
              <div className="text-[11px] text-[#64748B]">Central OPD Campus · Patient Portal Booking</div>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-teal-800 bg-[#CCFBF1] px-2.5 py-0.5 rounded-full">
            In-Person Consultation
          </span>
        </div>

        {/* Doctor & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              Department
            </span>
            <div className="text-sm font-bold text-[#0F172A]">
              {department?.name || 'General Medicine'}
            </div>
            <div className="text-xs text-[#64748B]">
              Clinical OPD Services
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              Consulting Doctor
            </span>
            <div className="text-sm font-bold text-[#0F766E] flex items-center gap-1.5">
              <Stethoscope className="h-4 w-4 text-[#0F766E]" />
              <span>{doctor?.name || 'Dr. Arun Kumar'}</span>
            </div>
            <div className="text-xs text-[#64748B]">
              {doctor?.specialization} · {doctor?.room}
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <CalendarDays className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-bold">Date</div>
              <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                {date?.full || '18 September 2026'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <Clock className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase font-bold">Time Slot</div>
              <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                {time?.time || '10:30 AM'}
              </div>
            </div>
          </div>
        </div>

        {/* Optional Patient Visit Reason */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-[#64748B]" />
            <span>Reason for Visit (Optional)</span>
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="e.g. Regular health checkup, fever, prescription renewal..."
            className="w-full text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]"
          />
        </div>
      </div>

      {/* Booking Notice */}
      <div className="flex items-start gap-2 text-xs text-[#64748B] bg-teal-50/70 p-3 rounded-xl border border-teal-200/60">
        <CheckCircle2 className="h-4 w-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#0F766E]">Instant Appointment Confirmation: </span>
          Your token number and digital registration will be generated immediately in your Patient Portal upon confirming.
        </div>
      </div>
    </div>
  );
};
