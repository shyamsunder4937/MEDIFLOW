import React from 'react';
import { X, AlertTriangle, CalendarX } from 'lucide-react';

export const CancelAppointmentModal = ({
  isOpen,
  onClose,
  appointment,
  onConfirmCancel,
}) => {
  if (!isOpen || !appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-rose-50/80 border-b border-rose-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold text-[#0F172A]">Cancel Appointment?</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-200/60 hover:text-[#0F172A] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Are you sure you want to cancel this appointment? The appointment slot will be freed up for OPD walk-ins.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-[#64748B] space-y-1">
            <div className="flex justify-between">
              <span className="font-medium text-[#64748B]">Appointment ID:</span>
              <span className="font-mono font-bold text-[#0F172A]">{appointment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#64748B]">Patient:</span>
              <span className="font-bold text-[#0F172A]">{appointment.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#64748B]">Physician:</span>
              <span className="font-medium text-[#0F172A]">{appointment.doctor} ({appointment.department})</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#64748B]">Time Slot:</span>
              <span className="font-medium text-[#0F172A]">{appointment.time} ({appointment.formattedDate || appointment.date})</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
            >
              Keep Appointment
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmCancel(appointment.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DC2626] hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <CalendarX className="h-4 w-4" />
              <span>Cancel Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
