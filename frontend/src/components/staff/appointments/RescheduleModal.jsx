import React, { useState } from 'react';
import { X, CalendarClock } from 'lucide-react';

export const RescheduleModal = ({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}) => {
  const [newDate, setNewDate] = useState(appointment?.date || '2026-09-19');
  const [newTime, setNewTime] = useState(appointment?.time || '11:00 AM');
  const [newDoctor, setNewDoctor] = useState(appointment?.doctor || 'Dr. Sharma');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = new Date(newDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setTimeout(() => {
      onReschedule(appointment.id, {
        date: newDate,
        formattedDate,
        time: newTime,
        doctor: newDoctor,
        status: 'Rescheduled',
      });
      setIsSubmitting(false);
      onClose();
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-white border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17221B]">
                Reschedule Appointment
              </h2>
              <p className="text-xs text-[#64748B]">
                Updating slot for <strong className="text-[#17221B]">{appointment.patientName}</strong> ({appointment.id})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-slate-100 hover:text-[#17221B] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
            <div className="font-semibold text-[#17221B]">Current Booking:</div>
            <div>
              Date: <span className="font-medium text-[#17221B]">{appointment.formattedDate || appointment.date}</span> at <span className="font-medium text-[#17221B]">{appointment.time}</span>
            </div>
            <div>
              Doctor: <span className="font-medium text-[#17221B]">{appointment.doctor}</span> ({appointment.department})
            </div>
          </div>

          {/* New Date */}
          <div>
            <label className="block text-xs font-semibold text-[#17221B] mb-1">
              New Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs sm:text-sm text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>

          {/* New Time */}
          <div>
            <label className="block text-xs font-semibold text-[#17221B] mb-1">
              New Time Slot <span className="text-red-500">*</span>
            </label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="09:30 AM">09:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="02:30 PM">02:30 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-xs font-semibold text-[#17221B] mb-1">
              Doctor
            </label>
            <select
              value={newDoctor}
              onChange={(e) => setNewDoctor(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs sm:text-sm font-semibold text-[#17221B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
            >
              <option value="Dr. Sharma">Dr. Sharma (Cardiology)</option>
              <option value="Dr. Kumar">Dr. Kumar (General Medicine)</option>
              <option value="Dr. Priya">Dr. Priya (Pediatrics)</option>
              <option value="Dr. Ahmed">Dr. Ahmed (Orthopedics)</option>
              <option value="Dr. Iyer">Dr. Iyer (Dermatology)</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#17221B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-bold shadow-2xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <CalendarClock className="h-4 w-4" />
              <span>{isSubmitting ? 'Rescheduling…' : 'Reschedule'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;
