import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  RefreshCw,
  CalendarDays,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { mockAvailableDates, mockTimeSlots } from '../../data/mockAppointmentsData';

export const CancelConfirmModal = ({ isOpen, onClose, appointment, onConfirmCancel }) => {
  const [reason, setReason] = useState('Change of plans');

  if (!isOpen || !appointment) return null;

  const handleConfirm = () => {
    onConfirmCancel(appointment.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#0F172A]">
            Cancel Appointment {appointment.id}?
          </h3>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            Are you sure you want to cancel your consultation with <span className="font-semibold text-[#0F172A]">{appointment.doctor}</span> on <span className="font-semibold text-[#0F172A]">{appointment.date}</span> at <span className="font-semibold text-[#0F172A]">{appointment.time}</span>?
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0F172A]">
            Reason for cancellation:
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2 text-[#0F172A] focus:outline-none focus:border-[#0F766E]"
          >
            <option value="Change of personal plans">Change of personal plans</option>
            <option value="Symptoms resolved">Symptoms resolved / Feeling better</option>
            <option value="Scheduling conflict">Scheduling conflict with work</option>
            <option value="Preferred doctor unavailable">Need a different doctor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] rounded-xl transition-colors"
          >
            Keep Appointment
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
          >
            Yes, Cancel Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export const RescheduleModal = ({ isOpen, onClose, appointment, onConfirmReschedule }) => {
  const [selectedDate, setSelectedDate] = useState(mockAvailableDates[1]); // tomorrow
  const [selectedTime, setSelectedTime] = useState(mockTimeSlots[0]);

  if (!isOpen || !appointment) return null;

  const handleConfirm = () => {
    onConfirmReschedule(appointment.id, selectedDate.full, selectedTime.time);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">
                Reschedule Appointment
              </h3>
              <p className="text-xs text-[#64748B]">
                {appointment.id} · {appointment.doctor}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Schedule */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-[#64748B] flex items-center justify-between">
          <span>Current Schedule:</span>
          <span className="font-semibold text-[#0F172A]">
            {appointment.date} at {appointment.time}
          </span>
        </div>

        {/* Date Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A]">Select New Date</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {mockAvailableDates.map((d) => (
              <button
                key={d.full}
                type="button"
                disabled={!d.isAvailable}
                onClick={() => d.isAvailable && setSelectedDate(d)}
                className={`p-2 rounded-xl text-center border text-xs transition-all ${
                  !d.isAvailable
                    ? 'opacity-40 bg-slate-100 cursor-not-allowed'
                    : selectedDate?.full === d.full
                    ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-[10px]">{d.dayName}</div>
                <div className="font-bold">{d.short}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0F172A]">Select New Time</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {mockTimeSlots.slice(0, 8).map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={!s.available}
                onClick={() => s.available && setSelectedTime(s)}
                className={`py-2 px-1 rounded-xl text-center border text-xs transition-all ${
                  !s.available
                    ? 'opacity-40 bg-slate-100 cursor-not-allowed line-through'
                    : selectedTime?.time === s.time
                    ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#64748B] hover:text-[#0F172A] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-[#0F766E] hover:bg-[#115E59] text-white rounded-xl transition-colors shadow-xs"
          >
            Update Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
